pragma solidity ^0.5.12;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./CherryPool.sol";


/**
 * @title CherrySwap Contract
 * @notice Create, manage and store all interest rate swaps within the Cherryswap platform.
 * Offers one side of a swap with the other taken by a liquidity pool. The offered rate is
 * a function of the pool demand (utilization) and the current floating rates.
 */
contract CherrySwap is Initializable, CherryPool {
    // 25% APR is the max the pool will pay. This is 25%, compounding per block,
    // scaled by 10^18. calculate by: (0.25 * 1e18) / (4 * 60 * 24 * 365)
    uint256 constant MAX_INTEREST_PAID_PER_BLOCK = 118911719939;

    // Swap curve hyper parameters
    uint256 constant ALPHA = 150; //scaled by 100 so 150 = 1.5
    uint256 constant BETA = 0;

    // Other constants
    uint256 constant RAGE_QUITE_PENALTY = 20; //scaled by 100 so 20 = 0.2
    uint256 constant ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;

    // Swap Data structures
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

    event CreateLongPosition(
        address indexed trader,
        uint256 indexed swapId,
        uint256 startingTime,
        uint256 endingTime,
        uint256 daiAmount,
        uint256 cDaiAmount,
        uint256 fixedRate,
        uint256 amountReserved,
        uint256 startingcDaiExchRate
    );

    event CreateShortPosition(
        address indexed trader,
        uint256 indexed swapId,
        uint256 startingTime,
        uint256 endingTime,
        uint256 daiAmount,
        uint256 cDaiAmount,
        uint256 fixedRate,
        uint256 amountReserved,
        uint256 startingcDaiExchRate
    );

    event ClosePosition(
        uint256 indexed swapId,
        address indexed trader,
        uint256 cDaiRedeemed,
        uint256 daiTransfered
    );

    event FixedRateOffer(uint256 rate);

    /**
     * @notice Initialize contract states
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
     * @notice function called by trader to enter into long swap position.
     * In a long position the trader will pay a fixed rate and receive a floating rate.
     * Because the amount is unbounded for that paid to the long side (they receive a floating rate) an upper
     * bound is placed on the maximum amount that they can receive.
     * @dev requires long pool utilization < 100% and enough liquidity in the long pool to cover trader.
     * @param _amount the number of Dai that the buyer will pay for their long position
     */
    function createLongPosition(uint256 _amount) external isLongUtilized {
        // Find the upper bound of how much could be paid as a function of the max interest rate the pool will pay
        // This defines how much needs to be "reserved" for long positions.
        uint256 maxFutureValue = cherryMath.futureValue(_amount, MAX_INTEREST_PAID_PER_BLOCK, 0, ONE_MONTH_SECONDS);

        // The amount reserved is the profit that the pool could need to pay in worst case.
        uint256 reserveAmount = maxFutureValue - _amount;

        // Reserve liquidity. checks the amount spesified is a valid reservation are done in function.
        _reserveLongPool(reserveAmount);

        // This transfer will fail if the caller has not approved.
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create long position transfer from failed"
        );

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));

        require(cToken.mint(_amount) == 0, "CherrySwap::create long position compound deposit failed");

        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));
        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;
        uint256 fixedRateOffer = getFixedRateOffer(Bet.Long);
        uint256 cDaiExchangeRate = getcTokenExchangeRate();

        swaps.push(
            Swap(
                msg.sender, // owner
                numSwaps(), // identifer
                now, // start time
                now + ONE_MONTH_SECONDS, // end time
                fixedRateOffer, // rate paid
                _amount, // amount of dai committed to the swap
                cTokensMinted, // number of cDai tokens added
                reserveAmount, // dai reserved from the pool's long side offering
                cDaiExchangeRate, // starting cDai exchange rate. used to compute change in floating side
                Bet.Long // bet direction (long)
            )
        );

        emit CreateLongPosition(
            msg.sender,
            numSwaps(),
            now,
            now + ONE_MONTH_SECONDS,
            _amount,
            cTokensMinted,
            fixedRateOffer,
            reserveAmount,
            cDaiExchangeRate
        );
    }

    /**
     * @notice function called by trader to enter into short swap position.
     * @dev requires short pool utlization < 100% and enough liquidity in the short pool to cover trader
     * @param _amount the number of Dai that the buyer will pay for their short position
     */
    function createShortPosition(uint256 _amount) external isShortUtilized {
        uint256 futureValue = cherryMath.futureValue(_amount, MAX_INTEREST_PAID_PER_BLOCK, 0, ONE_MONTH_SECONDS);

        uint256 reserveAmount = futureValue - _amount;

        // should first check if pool have enough liquidity to cover swap position
        _reserveShortPool(reserveAmount);

        // This transfer will fail if the caller has not approved.
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "CherrySwap::create short position transfer from failed"
        );

        uint256 cherrySwapBalanceBefore = cToken.balanceOf(address(this));

        require(cToken.mint(_amount) == 0, "CherrySwap::create short position compound deposit failed");

        uint256 cherrySwapBalanceAfter = cToken.balanceOf(address(this));
        uint256 cTokensMinted = cherrySwapBalanceAfter - cherrySwapBalanceBefore;
        uint256 fixedRateOffer = getFixedRateOffer(Bet.Short);
        uint256 cDaiExchangeRate = getcTokenExchangeRate();

        swaps.push(
            Swap(
                msg.sender,
                numSwaps(),
                now,
                now + ONE_MONTH_SECONDS,
                fixedRateOffer,
                _amount,
                cTokensMinted,
                reserveAmount,
                cDaiExchangeRate,
                Bet.Short
            )
        );

        emit CreateShortPosition(
            msg.sender,
            numSwaps(),
            now,
            now + ONE_MONTH_SECONDS,
            _amount,
            cTokensMinted,
            fixedRateOffer,
            reserveAmount,
            cDaiExchangeRate
        );
    }

    /**
     * @notice traded withdraw from their position.
     * @dev if the time is after the end of the swap then they will receive the swap rate for
     * the duration of the swap and then the floating market rate between the end of the
     * swap and the current time.
     * @param _swapId swap number
     */
    function closePosition(uint256 _swapId) external returns (uint256) {
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

        emit ClosePosition(_swapId, swap.owner, cTokensToWithdraw, tokensToSend);
    }

    /**
    * @notice calculate how much needs to be paid to the trader at end of swap
    * @dev long offer swap where the liquidity pool is short: receiving a fixed rate and paying a floating rate
    * @dev short offer swap the liquidity pool is long: receiving floating rate, paying fixed rate
    */
    function tokensToPayTrader(Swap memory _swap) internal returns (uint256) {
        //if the trader is long then they will pay fixed, receive float.
        if (_swap.bet == Bet.Long) {
            return
                _swap.amount + // swap nominal
                getFloatingValue(_swap.startingcTokenExchangeRate, getcTokenExchangeRate(), _swap.amount) - // floating leg, paid to long side
                cherryMath.futureValue(_swap.amount, _swap.fixedRateOffer, _swap.startingTime, _swap.endingTime); // fixed leg(paid by long side
        }
        //if the trader is short then they will receive fixed, pay float.
        if (_swap.bet == Bet.Short) {
            return
                _swap.amount + // swap nominal
                cherryMath.futureValue(_swap.amount, _swap.fixedRateOffer, _swap.startingTime, _swap.endingTime) - // fixed leg, paid to short side
                getFloatingValue(_swap.startingcTokenExchangeRate, getcTokenExchangeRate(), _swap.amount); // floating leg, paid by the short side
        }
    }

    /**
    * @notice at any point a trader in a swap can rage quite.
    * @dev This will eject them from the position, free up liquidity and they walk away with some dai
    * however there is a heavy penalty in doing this!
     */
    function rageQuitSwap(uint256 _swapId) external returns (uint256) {
        return 0;
    }

    function numSwaps() public view returns (uint256) {
        return swaps.length;
    }

    /**
    * @notice calculate the offered fixed rate for swaps taken against the liquidity pool
    * in future this will be updated to consider the size of the positon. for now it's kept simple.
    * @param bet position bet (long or short)
    * @return _fixedRateOffer offered fixed rate
    */
    function getFixedRateOffer(Bet bet) public returns (uint256 _fixedRateOffer) {
        if (bet == Bet.Long) {
            _fixedRateOffer = (cToken.supplyRatePerBlock().mul(
                uint256(1e18).sub(calcLongPoolUtil(longPoolReserved)).div(ALPHA.sub(BETA))
            )).div(1e18);
        }

        if (bet == Bet.Long) {
            _fixedRateOffer = (cToken.supplyRatePerBlock().mul(
                uint256(1e18).add(calcShortPoolUtil(shortPoolReserved)).div(ALPHA.add(BETA))
            )).div(1e18);
        }

        emit FixedRateOffer(_fixedRateOffer);

        return _fixedRateOffer;
    }

    /**
    * @notice given the starting and end exchange rate of a cToken calculate the final valuation of the position
    * @dev this acts to scale the amount by the change in exchange rate seen by the cToken.
    * If the starting cToken exchange rate is stored and the end rate is known then this function returns
    * the value that _amount has grown by.
    * @param _startingExchangeRate starting cToken exchange rate
    * @param _endingExchangeRate ending cToken exchange rate
    * @param _amount token amount
    * @return swap position valuation
    */
    function getFloatingValue(uint256 _startingExchangeRate, uint256 _endingExchangeRate, uint256 _amount)
        public
        view
        returns (uint256)
    {
        return (_amount * _endingExchangeRate) / _startingExchangeRate;
    }
}
