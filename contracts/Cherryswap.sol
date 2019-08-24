pragma solidity ^0.4.24;

import "./interface/IERC20.sol";
import "./interface/ICERC20.sol";

contract Cherryswap {

  /******************
  INTERNAL ACCOUNTING
  ******************/
  uint256 constant blockPerYear = 2102400;
  uint256 public swapsCounter;

  IERC20 public token; // underlying asset = DAI
  ICERC20 public cherryToken; // cToken

  /***************
  EVENTS
  ***************/
  event Transfer(address indexed to, uint256 value);

  enum Status {
    Open,
    Running,
    Closed
  }

  enum Bet {
    Long,
    Short
  }

  struct Swap {
    uint256 swapId;
    uint256 openingTime;
    uint256 startingTime;
    uint256 endingTime;
    uint256 startingRate;
    uint256 endingRate;
    uint256 depositedValue;
    Status status;
  }

  struct SwapInfo {
    address[] participants;
    uint256[] depositedValues;
    uint256 longPoolSupply;
    uint256 shortPoolSupply;
    uint256 participantsCounter;
    Bet[] bets;
  }

  Swap[] public swaps;
  mapping (uint256 => SwapInfo) public swapById;

  constructor(
    address _token,
    address _cherryToken
  ) public {
    require(_token != address(0), "Cherryswap::contructor - token cannot be 0");
    require(_cherryToken != address(0), "Cherryswap::constructor - cherryToken cannot be 0");

    token = IERC20(_token);
    cherryToken = ICERC20(_cherryToken);
    swapsCounter = 0;
  }

  modifier hasEnded(uint256 swapId) {
    if(swapId > 0) {
      Swap memory swap = swaps[swapId];
      require(now >= swap.endingTime, "Cherryswap::hasEnded - swap not ended yet");
    }
    _;
  }

  modifier isOpen(uint256 swapId) {
    Swap memory swap = swaps[swapId];
    require(now < swap.startingTime, "Cherryswap::isOpen - swap is running or closed");
    _;
  }

  modifier isRunning(uint256 swapId) {
    Swap memory swap = swaps[swapId];
    require((now > swap.startingTime) && (now < swap.endingTime), "Cherryswap::isOpen - swap is open or closed");
    _;
  }

  function createSwap(
    uint256 _startingTime,
    uint256 _endingTime
  ) public {
    // create new swap
    Swap memory swap = Swap({
      swapId: swapsCounter,
      openingTime: now,
      startingTime: _startingTime,
      endingTime: _endingTime,
      startingRate: 0,
      endingRate: 0,
      depositedValue: 0,
      status: Status.Open
    });
    swaps.push(swap);

    // increment swaps counter
    swapsCounter++;
  }

  function startSwap() public isOpen(swapsCounter) {
    require(now == swaps[swapsCounter].startingTime, "Cherryswap::startSwap - mmmmmm it is not starting time yet!");

    // approve the transfer
    token.approve(address(cherryToken), swaps[swapsCounter].depositedValue);
    // mint the cTokens and assert there is no error
    assert(cherryToken.mint(swaps[swapsCounter].depositedValue) == 0);

    swaps[swapsCounter].status = Status.Running;


    // get starting rate
    swaps[swapsCounter].startingRate = (cherryToken.supplyRatePerBlock() * blockPerYear) / 10**18;
  }

  function closeSwap() public hasEnded(swapsCounter) {
    swaps[swapsCounter].status = Status.Closed;

    // get starting rate
    swaps[swapsCounter].endingRate = (cherryToken.supplyRatePerBlock() * blockPerYear) / 10**18;

    // get exchange rate
    //uint256 exchangeRate = cherryToken.exchangeRateCurrent();
    uint256 cBalance = cherryToken.balanceOf(address(this));
    //uint256 balance = cBalance * exchangeRate;

    // Redeem cDai to Dai
    require(cherryToken.redeem(cBalance) == 0, "Cherryswap::redeem - something went wrong");

    // send funds to participants
    transfer(0, 0);
  }

  function deposit(
    address _participant,
    uint256 _depositedValue,
    uint8 _uintBet
  ) public isOpen(swapsCounter) {
    require(_participant != address(0), "Invalid participant address");

    // collect proposal deposit from proposer and store it in the Moloch until the proposal is processed
    require(token.transferFrom(_participant, address(this), _depositedValue), "Cherryswap::deposit - deposit token transfer failed");

    SwapInfo memory swapInfo;
    swapInfo.participants[swapsCounter] = _participant;
    swapInfo.depositedValues[swapsCounter] = _depositedValue;
    swapInfo.bets[swapsCounter] = Bet(_uintBet);
    if(_uintBet == 1) {
      swapInfo.longPoolSupply += _depositedValue;
    }
    else {
      swapInfo.shortPoolSupply += _depositedValue;
    }

    swapById[swapsCounter] = swapInfo;
  }

  function transfer(int256 rLong, int256 rShort) internal hasEnded(swapsCounter) {
    int256 pl;
    int256 payout;

    // contract DAI balance
    uint256 pt = token.balanceOf(address(this));

    SwapInfo memory endedSwap = swapById[swapsCounter];
    for(uint256 i = 0; i < endedSwap.participantsCounter; i++) {
      if(endedSwap.bets[i] == Bet.Long) {
        pl = int256(endedSwap.depositedValues[i]) * rLong;
        payout = int256(pt) * int256(endedSwap.depositedValues[i] / endedSwap.longPoolSupply) + (rLong * int256(endedSwap.depositedValues[i]));
      }
      else {
        pl = int256(endedSwap.depositedValues[i]) * rShort;
        payout = int256(pt) * int256(endedSwap.depositedValues[i] / endedSwap.shortPoolSupply) + (rShort * int256(endedSwap.depositedValues[i]));
      }
      // transfer DAI to participant
      token.transfer(endedSwap.participants[i], uint256(payout));
      emit Transfer(endedSwap.participants[i], uint256(payout));
    }
  }

}


