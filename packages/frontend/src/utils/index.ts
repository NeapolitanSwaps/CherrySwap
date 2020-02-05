export const formatInterestRate = (interestRate: number): string =>
  `${interestRate / 100}\%`;

export const formatTimestamp = (timestamp: number) => {
  var a = new Date(timestamp * 1000);
  var currentMonth = new Date().getMonth();
  return `${a.getMonth() - currentMonth ?? 0} Month`;
};

export const formatCurrency = (liquidity: number, symbol?: string): string =>
  `${numberWithCommas(liquidity)} ${symbol ?? ``}`;

const numberWithCommas = (val: number): string =>
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
