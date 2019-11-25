pragma solidity ^0.5.12;

// Library & interfaces
import "./interface/ICERC20.sol";
import "./interface/ISwapMath.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "./Cherrypool.sol";
import "./Cherrymath.sol";

/**
 * @title Cherryswap Contract
 * @dev This contract handle all swaping operations
 */
contract Cherryswap is Initializable, Cherrypool {
    enum Bet {Short, Long}

    uint256 oneMonthDuration = 60 * 60 * 24 * 30;
    uint256 maxInterestRatePaidPerBlock = uint256(
        (25 * 1e16) / (4 * 60 * 24 * 365)
    ); //25% APR is the max the pool will pay

    uint256 ALPHA = 150; //scaled by 100 so 150 = 1.5
    uint256 BETA = 0;

    uint256 RAGE_QUITE_PENALTY = 20; //scaled by 100 so 20 = 0.2

    struct Swap {
        address owner;
        uint256 swapId;
        uint256 startingTime;
        uint256 endingTime;
        uint256 fixedRateOffer;
        uint256 amount;
        uint256 startingcTokenExchangeRate;
        Bet bet;
    }

    Swap[] public swaps;

    Cherrymath cherryMath;

    ERC20 token;
    ICERC20 cToken;

    /**
     * @dev Initialize contract states
     */
    function initialize(address _token, address _cToken, address _cherryMath)
        public
        initializer
    {
        require(
            (_token != address(0)) && (_cToken != address(0)),
            "Cherryswap::invalid tokens addresses"
        );

        Cherrypool.initialize(_token, _cToken);
        cherryMath = Cherrymath(_cherryMath);

        token = ERC20(_token);
        cToken = ICERC20(_cToken);

        cToken.approve(_token, 100000000000e18);
    }

    /**
     * @dev function called by trader to enter into long swap position.
     * @notice requires long pool utlization < 100% and enough liquidity in the long pool to cover trader
     */
    function createLongPosition(uint256 _amount, uint8 _bet) public {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create long position transfer from failed"
        );

        require(
            cToken.mint(_amount) == 0,
            "CherrySwap::create long position compound deposit failed"
        );

        uint256 futureValue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futureValue - _amount;

        reserveLongPool(reserveAmount);

        uint256 fixedRateOffer = getFixedRateOffer(_bet);

        swaps.push(
            Swap(
                msg.sender,
                numSwaps(),
                now,
                now + oneMonthDuration,
                fixedRateOffer,
                _amount,
                getcTokenExchangeRate(),
                Bet(_bet)
            )
        );
    }

    /**
     * @dev function called by trader to enter into short swap position.
     * @notice requires short pool utlization < 100% and enough liquidity in the short pool to cover trader
     */
    function createShortPosition(uint256 _amount, uint8 _bet) public {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create short position transfer from failed"
        );

        require(
            cToken.mint(_amount) == 0,
            "CherrySwap::create short position compound deposit failed"
        );

        uint256 futureValue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futureValue - _amount;

        reserveShortPool(reserveAmount);

        uint256 fixedRateOffer = getFixedRateOffer(_bet);

        swaps.push(
            Swap(
                msg.sender,
                numSwaps(),
                now,
                now + oneMonthDuration,
                fixedRateOffer,
                _amount,
                getcTokenExchangeRate(),
                Bet(_bet)
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
        uint256 cTokensToWithDraw = (tokensToSend * 1e28) / getcTokenExchangeRate();
        cToken.redeem(cTokensToWithDraw);
        // TODO: add a require here to check that the contract balance change is the what is expected after the redeem.
        token.transfer(swap.owner,tokensToSend);
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

    function reserveLongPool(uint256 _amount)
        internal
        isLongUtilized
        canReserveLong(_amount)
    {
        _reserveLongPool(_amount);
    }

    function reserveShortPool(uint256 _amount)
        internal
        isShortUtilized
        canReserveShort(_amount)
    {
        _reserveLongPool(_amount);
    }

    function numSwaps() public view returns (uint256) {
        return swaps.length;
    }

    function getcTokenExchangeRate() public returns (uint256) {
        return
            (cToken.getCash() +
                cToken.totalBorrowsCurrent() -
                cToken.totalReserves()) /
            cToken.totalSupply();
    }

    /**
    @dev calculate the offered fixed rate for swaps taken against the liquidity pool
    * in future this will be updated to consider the size of the positon. for now it's kept simple.
    */
    function getFixedRateOffer(uint8 _bet) public returns (uint256) {
        Bet bet = Bet(_bet);
        if (bet == Bet.Long) {
            return
                (cToken.supplyRatePerBlock() *
                    (1e18 -
                        calcLongPoolUtilization(longPoolReserved) /
                        ALPHA -
                        BETA)) /
                1e18;
        }

        if (bet == Bet.Long) {
            return
                (cToken.supplyRatePerBlock() *
                    (1e18 +
                        calcShortPoolUtilization(shortPoolReserved) /
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
