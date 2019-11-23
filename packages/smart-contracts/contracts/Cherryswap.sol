pragma solidity ^0.5.12;

// Library & interfaces
import "./interface/ICERC20.sol";
import "./interface/ISwapMath.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "./Cherrypool.sol";
import "./CherryMath.sol";
import "interfaces/IERC20.sol";

/**
 * @title Cherryswap Contract
 * @dev This contract handle all swaping operations
 */
contract Cherryswap is Initializable, Cherrypool {
    enum Bet {Short, Long}

    uint256 oneMonthDuration = 60 * 60 * 24 * 30;
    uint256 maxInterestRatePaidPerBlock = (25 * 1e16) / (4 * 60 * 24 * 365);

    uint256 ALPHA = 150; //scaled by 100 so 150 = 1.5
    uint256 BETA = 0;

    struct Swap {
        address owner;
        uint256 swapId;
        uint256 openingTime;
        uint256 endingTime;
        uint256 fixedRateOffer;
        uint256 depositedValue;
        Bet bet;
    }

    Swap[] public swaps;

    CherryMath cherryMath;

    ERC20 token;
    IERC20 cToken;

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
        cherryMath = CherryMath(_cherryMath);

        token = ERC20(_token);
        cToken = IERC20(_cToken);
    }

    /**
     * @dev function called by trader to enter into long swap position.
     * @notice requires long pool utlization < 100% and enough liquidity in the long pool to cover trader
     */
    function createLongPosition(uint256 _amount, uint8 _bet) public {
        require(token.transferFrom(msg.sender, address(this), _amount), "CherrySwap::create long position transfer from failed");
        require(cToken.mint(_amount) == 0,"CherrySwap::create long position compound deposit failed");
        
        uint256 futurevalue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futurevalue - _amount;

        reserveLongPool(reserveAmount);

        uint256 fixedRateOffer = (cToken.supplyRatePerBlock() *
            (1e18 - cherryPool.LongPoolUtilization() / ALPHA - BETA)) /
            1e18;

        swaps.push(
            Swap(
                msg.sender,
                numSwaps,
                now,
                oneMonthDuration,
                fixedRateOffer,
                _amount,
                _bet
            )
        );
    }

    /**
     * @dev function called by trader to enter into short swap position.
     * @notice requires short pool utlization < 100% and enough liquidity in the short pool to cover trader
     */
    function createShortPosition(uint256 _amount) public {
        require(token.transferFrom(msg.sender, address(this), _amount), "CherrySwap::create short position transfer from failed");
        require(cToken.mint(_amount) == 0,"CherrySwap::create short position compound deposit failed");

        uint256 futureValue = cherryMath.futureValue(
            _amount,
            maxInterestRatePaidPerBlock,
            0,
            oneMonthDuration
        );

        uint256 reserveAmount = futureValue - _amount;

        reserveShortPool(reserveAmount);

        uint256 fixedRateOffer = (cToken.supplyRatePerBlock() *
                (1e18 + cherryPool.ShortPoolUtilization() / ALPHA + BETA)) /
            1e18;

        swaps.push(
            Swap(
                msg.sender,
                numSwaps,
                now,
                oneMonthDuration,
                fixedRateOffer,
                _amount,
                _bet
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
        return 0;
    }

    function reserveLongPool(uint256 _amount) internal isLongUtilized canReserveLong(_amount) {
        _reserveLongPool(_amount);
    }

    function reserveShortPool(uint256 _amount) internal isShortUtilized canReserveShort(_amount) {
        _reserveLongPool(_amount);
    }

    function numSwaps() public view returns (uint256) {
        return swaps.length();
    }
}
