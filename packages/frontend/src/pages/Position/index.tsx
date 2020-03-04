import React from "react";
import OpenPosition from "../../components/OpenPosition";
import { Props as PositionOverviewProps } from "../../components/OpenPosition";

const Position = () => {
  const item: PositionOverviewProps = {
    header: {
      position: "Short",
      transactionId: "0xf7ee9325c523893091a59c50d560"
    },
    body: {
      position: "Short",
      positionYield: 712030030,
      lockedBalance: 23042230123,
      interestRateFixed: 1000,
      interestRateCurrent: 1200,
      startDate: 1583253080,
      endDate: 1583953080
    }
  };
  return (
    <>
      <OpenPosition {...item} />
      <br /> {/* temporary for now */}
      {/* <OpenPosition {...item} /> */}
    </>
  );
};

export default Position;
