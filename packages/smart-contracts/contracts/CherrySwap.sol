pragma solidity ^0.5.12;

// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./CherryPool.sol";

/**
 * @title CherrySwap Contract
 * @dev Swapping operations in smart contracts
 */
contract CherrySwap is Initializable, CherryPool {
    uint256 constant oneMonthDuration = 60 * 60 * 24 * 30;
    //25% APR is the max the pool will pay. This is 25%, compounding per block,
    // scaled by 10^18. calculate by: (0.25 * 1e18) / (4 * 60 * 24 * 365)
    uint256 constant MAX_INTEREST_PAID_PER_BLOCK = 118911719939;

    uint256 constant ALPHA = 150; //scaled by 100 so 150 = 1.5
    uint256 constant BETA = 0;

    uint256 constant RAGE_QUITE_PENALTY = 20; //scaled by 100 so 20 = 0.2

    enum Bet { Short, Long }
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
    function initialize(address _token, address _cToken, address _cherryMath) public initializer {
        require(
            (_token != address(0)) && (_cToken != address(0) && (_cherryMath != address(0))),
            "CherrySwap::invalid tokens addresses"
        );

        CherryPool.initialize(_token, _cToken, _cherryMath);

        cToken.approve(_token, 100000000000e18);
    }

    /**
     * @dev function called by trader to enter into long swap position.
     * In a long position the trader will pay a fixed rate and receive a floating rate.
     * Because the amount is unbounded for that paid to the long side (they receive a floating rate) an upper
     * bound is placed on the maximum amount that they can recive.
     * @notice requires long pool utilization < 100% and enough liquidity in the long pool to cover trader.
     */
    function createLongPosition(uint256 _amount) public isLongUtilized {
        // Find the upper bound of how much could be paid as a function of the max interest rate the pool will pay
        // This defines how much needs to be "reserved" for long positions.
        uint256 maxFutureValue = cherryMath.futureValue(_amount, MAX_INTEREST_PAID_PER_BLOCK, 0, oneMonthDuration);

        uint256 reserveAmount = maxFutureValue - _amount;

        // should first check if pool have enough liquidity to cover swap position
        _reserveLongPool(reserveAmount);

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create long position transfer from failed"
        );

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));

        require(cToken.mint(_amount) == 0, "CherrySwap::create long position compound deposit failed");

        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));
        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;
        uint256 fixedRateOffer = getFixedRateOffer(Bet.Long);

        swaps.push(
            Swap(
                msg.sender, // owner
                numSwaps(), // identifer
                now, // start time
                now + oneMonthDuration, // end time
                fixedRateOffer, // rate paid
                _amount, // amount of dai committed to the swap
                cTokensMinted, // number of cDai tokens added
                reserveAmount, // dai reserved from the pool's long side offering
                getcTokenExchangeRate(), // starting cDai exchange rate. used to compute change in floating side
                Bet.Long // bet direction (long)
            )
        );
    }

    /**
     * @dev function called by trader to enter into short swap position.
     * @notice requires short pool utlization < 100% and enough liquidity in the short pool to cover trader
     */
    function createShortPosition(uint256 _amount) public isShortUtilized {
        uint256 futureValue = cherryMath.futureValue(_amount, MAX_INTEREST_PAID_PER_BLOCK, 0, oneMonthDuration);

        uint256 reserveAmount = futureValue - _amount;

        // should first check if pool have enough liquidity to cover swap position
        _reserveShortPool(reserveAmount);

        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create short position transfer from failed"
        );

        require(cToken.mint(_amount) == 0, "CherrySwap::create short position compound deposit failed");

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));
        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));
        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;
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
        //TODO: add check for caller address. is this needed?
        //TODO: add check for maturity of position. should only be able to close position after maturity.

        Swap memory swap = swaps[_swapId];
        // based on the changing interst rate over time, find the number of Dai tokens to pay to the trader.
        uint256 tokensToSend = tokensToPayTrader(swap);
        // Need to calculate the number of cTokens that will be withdrawn from the withdrawl
        uint256 cTokensToWithdraw = (tokensToSend * 1e18) / getcTokenExchangeRate();
        // Tokens need to be withdrawn from Compound. 
        //TODO: add a require here to check the number of Dai recived is correct.
        cToken.redeem(cTokensToWithdraw);
        
        token.transfer(swap.owner, tokensToSend);

        int256 poolcTokenProfitChange = int256(swap.cTokenAmount) - int256(cTokensToWithdraw);
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
                getFloatingValue(_swap.startingcTokenExchangeRate, getcTokenExchangeRate(), _swap.amount) -
                cherryMath.futureValue(_swap.amount, _swap.fixedRateOffer, _swap.startingTime, _swap.endingTime);
        }
        //if the trader is short then they will recive fixed, pay float.
        if (_swap.bet == Bet.Short) {
            return
                _swap.amount +
                cherryMath.futureValue(_swap.amount, _swap.fixedRateOffer, _swap.startingTime, _swap.endingTime) -
                getFloatingValue(_swap.startingcTokenExchangeRate, getcTokenExchangeRate(), _swap.amount);
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
            return (cToken.supplyRatePerBlock() * (1e18 - calcLongPoolUtil(longPoolReserved) / ALPHA - BETA)) / 1e18;
        }

        if (bet == Bet.Long) {
            return (cToken.supplyRatePerBlock() * (1e18 + calcShortPoolUtil(shortPoolReserved) / ALPHA + BETA)) / 1e18;
        }
    }

    /**
    * @dev given the starting and end exchange rate of a cToken calculate the final valuation of the position
    * @notice this acts to scale the amount by the change in exchange rate seen by the cToken.
    * If the starting cToken exchange rate is stored and the end rate is known then this function returns
    * the value that _amount has grown by.
     */
    function getFloatingValue(uint256 _startingExchangeRate, uint256 _endingExchangeRate, uint256 _amount)
        public
        view
        returns (uint256)
    {
        return (_amount * _endingExchangeRate) / _startingExchangeRate;
    }
}
