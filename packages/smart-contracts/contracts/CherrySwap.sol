pragma solidity ^0.5.12;

// Library & interfaces
import "./interface/ICERC20.sol";
import "./interface/ISwapMath.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "./CherryPool.sol";

/**
 * @title CherrySwap Contract
 * @dev This contract handle all swaping operations
 */
contract CherrySwap is Initializable, CherryPool {
    enum Bet {Short, Long}

    uint256 constant oneMonthDuration = 60 * 60 * 24 * 30;
    //25% APR is the max the pool will pay. This is 25%, compounding per block,
    // scaled by 10^18. calculate by: (0.25 * 1e18) / (4 * 60 * 24 * 365)
    uint256 constant maxInterestRatePaidPerBlock = 118911719939; 

    uint256 constant ALPHA = 150; //scaled by 100 so 150 = 1.5
    uint256 constant BETA = 0;

    uint256 constant RAGE_QUITE_PENALTY = 20; //scaled by 100 so 20 = 0.2

    struct Swap {
        address owner;
        uint256 swapId;
        uint256 startingTime;
        uint256 endingTime;
        uint256 fixedRateOffer;
        uint256 amount;
        uint256 cTokenAmount;
        uint256 reserveAmount;
        uint256 startingcTokenExchangeRate;
        Bet bet;
    }

    Swap[] public swaps;

    /**
     * @dev Initialize contract states
     */
    function initialize(address _token, address _cToken, address _cherryMath)
        public
        initializer
    {
        require(
            (_token != address(0)) && (_cToken != address(0) && (_cherryMath != address(0))),
            "CherrySwap::invalid tokens addresses"
        );

        CherryPool.initialize(_token, _cToken, _cherryMath);

        cToken.approve(_token, 100000000000e18);
    }

    /**
     * @dev function called by trader to enter into long swap position.
     * @notice requires long pool utlization < 100% and enough liquidity in the long pool to cover trader
     */
    function createLongPosition(uint256 _amount) public isLongUtilized {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create long position transfer from failed"
        );

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));

        require(
            cToken.mint(_amount) == 0,
            "CherrySwap::create long position compound deposit failed"
        );

        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));

        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;

        uint256 futureValue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futureValue - _amount;

        _reserveLongPool(reserveAmount);

        uint256 fixedRateOffer = getFixedRateOffer(Bet.Long);

        swaps.push(
            Swap(
                msg.sender,
                numSwaps(),
                now,
                now + oneMonthDuration,
                fixedRateOffer,
                _amount,
                cTokensMinted,
                reserveAmount,
                getcTokenExchangeRate(),
                Bet.Long
            )
        );
    }

    /**
     * @dev function called by trader to enter into short swap position.
     * @notice requires short pool utlization < 100% and enough liquidity in the short pool to cover trader
     */
    function createShortPosition(uint256 _amount) public isShortUtilized {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create short position transfer from failed"
        );

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));

        require(
            cToken.mint(_amount) == 0,
            "CherrySwap::create short position compound deposit failed"
        );

        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));

        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;

        uint256 futureValue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futureValue - _amount;

        _reserveShortPool(reserveAmount);

        uint256 fixedRateOffer = getFixedRateOffer(Bet.Short);

        swaps.push(
            Swap(
                msg.sender,
                numSwaps(),
                now,
                now + oneMonthDuration,
                fixedRateOffer,
                _amount,
                cTokensMinted,
                reserveAmount,
                getcTokenExchangeRate(),
                Bet.Short
            )
        );
    }

    /**
     * @dev traded withdraw from their position.
     * @notice if the time is after the end of the swap then they will receive the swap rate for
     * the duration of the swap and then the floating market rate between the end of the
     * swap and the current time.
     */
    function closePosition(uint256 _swapId) public returns (uint256) {
        Swap memory swap = swaps[_swapId];
        uint256 tokensToSend = tokensToPayTrader(swap);
        uint256 cTokensToWithDraw = (tokensToSend * 1e28) /
            getcTokenExchangeRate();
        cToken.redeemUnderlying(cTokensToWithDraw);
        // TODO: add a require here to check that the contract balance change is the what is expected after the redeem.
        token.transfer(swap.owner, tokensToSend);

        int256 poolcTokenProfitChange = int256(swap.cTokenAmount) - int256(cTokensToWithDraw);
        _addcTokenPoolProfit(poolcTokenProfitChange);
        
        if (swap.bet == Bet.Long) {
            _freeLongPool(swap.reserveAmount);
        }

        if (swap.bet == Bet.Short) {
            _freeShortPool(swap.reserveAmount);
        }
    }

    /**
    * @dev calculate how much needs to be paid to the trader at end of swap
    * @notice long offer swap where the lequidity pool is short: reciving a fixed rate and paying a floating rate
    * @notice short offer swap the lequidity pool is long: reciving floating rate, paying fixed rate
    */
    function tokensToPayTrader(Swap memory _swap) internal returns (uint256) {
        //if the trader is long then they will pay fixed, recive float.
        if (_swap.bet == Bet.Long) {
            return
                _swap.amount +
                getFloatingValue(
                    _swap.startingcTokenExchangeRate,
                    getcTokenExchangeRate(),
                    _swap.amount
                ) -
                cherryMath.futureValue(
                    _swap.amount,
                    _swap.fixedRateOffer,
                    _swap.startingTime,
                    _swap.endingTime
                );
        }
        //if the trader is short then they will recive fixed, pay float.
        if (_swap.bet == Bet.Short) {
            return
                _swap.amount +
                cherryMath.futureValue(
                    _swap.amount,
                    _swap.fixedRateOffer,
                    _swap.startingTime,
                    _swap.endingTime
                ) -
                getFloatingValue(
                    _swap.startingcTokenExchangeRate,
                    getcTokenExchangeRate(),
                    _swap.amount
                );
        }
    }

    /**
    * @dev at any point a trader in a swap can rage quite. 
    * @notice This will eject them from the position, free up liquidity and they walk away with some dai
    * however there is a heavy penalty in doing this!
     */
    function rageQuitSwap(uint256 _swapId) public returns (uint256) {
        return 0;
    }

    function numSwaps() public view returns (uint256) {
        return swaps.length;
    }

    /**
    @dev calculate the offered fixed rate for swaps taken against the liquidity pool
    * in future this will be updated to consider the size of the positon. for now it's kept simple.
    */
    function getFixedRateOffer(Bet bet) public returns (uint256) {
        if (bet == Bet.Long) {
            return
                (cToken.supplyRatePerBlock() *
                    (1e18 -
                        calcLongPoolUtil(longPoolReserved) /
                        ALPHA -
                        BETA)) /
                1e18;
        }

        if (bet == Bet.Long) {
            return
                (cToken.supplyRatePerBlock() *
                    (1e18 +
                        calcShortPoolUtil(shortPoolReserved) /
                        ALPHA +
                        BETA)) /
                1e18;
        }
    }
    /**
    * @dev given the starting and end exchange rate of a cToken calculate the final valuation of the position
    * @notice this acts to scale the amount by the change in exchange rate seen by the cToken.
    * If the starting cToken exchange rate is stored and the end rate is known then this function returns
    * the value that _amount has grown by.
     */
    function getFloatingValue(
        uint256 _startingExchangeRate,
        uint256 _endingExchangeRate,
        uint256 _amount
    ) public view returns (uint256) {
        return (_amount * _endingExchangeRate) / _startingExchangeRate;
    }
}
