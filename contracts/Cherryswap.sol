pragma solidity ^0.4.24;

import "./interface/IERC20.sol";
import "./interface/ICERC20.sol";
import "./ISwapMath.sol";

contract Cherryswap {

  /******************
  INTERNAL ACCOUNTING
  ******************/
  uint256 constant blockPerYear = 2102400;
  uint256 public swapsCounter;

  IERC20 public token; // underlying asset = DAI
  ICERC20 public cherryToken; // cToken
  ISwapMath public swapMath;

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
    address _cherryToken,
    address _swapMath
  ) public {
    require(_token != address(0), "Cherryswap::contructor - token cannot be 0");
    require(_cherryToken != address(0), "Cherryswap::constructor - cherryToken cannot be 0");

    token = IERC20(_token);
    cherryToken = ICERC20(_cherryToken);
    swapMath = ISwapMath(_swapMath);

    swapsCounter = 0;
  }

  function createSwap(
    uint256 _startingTime,
    uint256 _endingTime
  ) public {
    if(swapsCounter > 0) {
      Swap memory previousSwap = swaps[swapsCounter-1];
      require(now > previousSwap.endingTime, "Cherryswap::hasEnded - swap not ended yet");
    }

    // increment swaps counter
    swapsCounter += 1;

    // create new swap
    Swap memory swap = Swap({
      swapId: swapsCounter-1,
      openingTime: now,
      startingTime: _startingTime,
      endingTime: _endingTime,
      startingRate: 0,
      endingRate: 0,
      depositedValue: 0,
      status: Status.Open
    });
    swaps.push(swap);

    // create swap info
    address[] memory _participants;
    uint256[] memory _depositedValues;
    Bet[] memory _bets;
    SwapInfo memory swapInfo = SwapInfo(
      _participants,
      _depositedValues,
      0,
      0,
      0,
      _bets
    );
    swapById[swapsCounter-1] = swapInfo;
  }

  function startSwap() public {
    require(swapsCounter > 0, "Cherryswap::startSwap - no swap");
    Swap memory previousSwap = swaps[swapsCounter-1];
    require(now <= previousSwap.startingTime, "Cherryswap::startSwap - swap is running or closed");

    // approve the transfer
    token.approve(address(cherryToken), swaps[swapsCounter-1].depositedValue);
    // mint the cTokens and assert there is no error
    assert(cherryToken.mint(swaps[swapsCounter-1].depositedValue) == 0);

    swaps[swapsCounter-1].status = Status.Running;

    // get starting rate
    swaps[swapsCounter-1].startingRate = (cherryToken.supplyRatePerBlock() * blockPerYear) / 10**18;
  }

  function closeSwap() public {
    require(swapsCounter > 0, "Cherryswap::closeSwap - no swap");
    Swap memory previousSwap = swaps[swapsCounter-1];
    require(now >= previousSwap.endingTime, "Cherryswap::closeSwap - swap not ended yet");

    swaps[swapsCounter-1].status = Status.Closed;

    // get starting rate
    swaps[swapsCounter-1].endingRate = (cherryToken.supplyRatePerBlock() * blockPerYear) / 10**18;

    // get exchange rate
    //uint256 exchangeRate = cherryToken.exchangeRateCurrent();
    uint256 cBalance = cherryToken.balanceOf(address(this));
    //uint256 balance = cBalance * exchangeRate;

    // Redeem cDai to Dai
    require(cherryToken.redeem(cBalance) == 0, "Cherryswap::redeem - something went wrong");

    SwapInfo memory closedSwap = swapById[swapsCounter-1];
    (int128 rLong, int128 rShort) = swapMath.computeRatios(
      closedSwap.longPoolSupply,
      closedSwap.shortPoolSupply,
      cherryToken.supplyRatePerBlock(),
      swaps[swapsCounter-1].startingTime,
      swaps[swapsCounter-1].endingTime,
      swaps[swapsCounter-1].depositedValue
    );

    // send funds to participants
    transfer(rLong, rShort);
  }

  function deposit(
    address _participant,
    uint256 _depositedValue,
    uint8 _uintBet
  ) public {
    require(swapsCounter > 0, "Cherryswap::deposit - no swap");
    Swap storage currentSwap = swaps[swapsCounter-1];
    require(now < currentSwap.startingTime, "Cherryswap::deposit - swap is running or closed");
    require(_participant != address(0), "Invalid participant address");

    // collect proposal deposit from proposer and store it in the Moloch until the proposal is processed
    require(token.transferFrom(_participant, address(this), _depositedValue), "Cherryswap::deposit - deposit token transfer failed");
    
    SwapInfo storage swapInfo = swapById[swapsCounter-1];
    swapInfo.participants.push(_participant);
    swapInfo.depositedValues.push(_depositedValue);
    swapInfo.bets.push(Bet(_uintBet));
    if(_uintBet == 1) {
      swapInfo.longPoolSupply += _depositedValue;
    }
    else {
      swapInfo.shortPoolSupply += _depositedValue;
    }
    swapInfo.participantsCounter++;
    //swapById[swapsCounter] = swapInfo;

    currentSwap.depositedValue += _depositedValue;
  }

  function transfer(int256 rLong, int256 rShort) internal {
    require(swapsCounter > 0, "Cherryswap::transfer - no swap");
    Swap memory previousSwap = swaps[swapsCounter-1];
    require(now >= previousSwap.endingTime, "Cherryswap::transfer - swap not ended yet");
    
    int256 pl;
    int256 payout;

    // contract DAI balance
    uint256 pt = token.balanceOf(address(this));

    SwapInfo memory endedSwap = swapById[swapsCounter-1];
    for(uint256 i = 0; i < endedSwap.participantsCounter; i++) {
      if(endedSwap.bets[i] == Bet.Long) {
        pl = int256(endedSwap.depositedValues[i]) * rLong;
        payout = (int256(pt) * int256(endedSwap.depositedValues[i] * 10 ** 18 / endedSwap.longPoolSupply) + (rLong * int256(endedSwap.depositedValues[i]))) / 10 ** 18;
      }
      else {
        pl = int256(endedSwap.depositedValues[i]) * rShort;
        payout = (int256(pt) * int256(endedSwap.depositedValues[i] * 10 ** 18 / endedSwap.shortPoolSupply) + (rShort * int256(endedSwap.depositedValues[i]))) / 10 ** 18;
      }
      // transfer DAI to participant
      token.transfer(endedSwap.participants[i], uint256(payout));
      emit Transfer(endedSwap.participants[i], uint256(payout));
    }
  }

}


