import moment from "moment";
export const formatInterestRate = (interestRate: number): string => `${interestRate / 100}%`;

export const formatTimestamp = (timestamp: number) => {
  const a = new Date(timestamp * 1000);
  const currentMonth = new Date().getMonth();
  return `${a.getMonth() - currentMonth ?? 0} Month`;
};

export const formatTimestampToDate = (timestamp: number) => moment(timestamp * 1000).format("DD/MM/YY");

export const formatCDAI = (amount: number): string => `${amount / 10 ** 8} ${"CDAI" ?? ``}`;

export const formatCurrency = (liquidity: number, symbol?: string): string =>
  `${numberWithCommas(liquidity)} ${symbol ?? ``}`;

const numberWithCommas = (val: number): string => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const determineProfitLoss = (amount: number, initialRate: number): boolean => {
  // how do we calculate this ?
  // we'd need to calc. the (interest rate * initial amount) with the changing interest over time.
  // do we have these values in sc?
  return false;
};

export const buildEtherscanURL = (id: string) => `https://etherscan.io/tx/${id}`;
