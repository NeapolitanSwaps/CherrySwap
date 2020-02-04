export const formatInterestRate = (interestRate: number): string =>
  `${interestRate / 100}\%`;

export const formatCurrency = (liquidity: number, symbol?: string): string =>
  `${numberWithCommas(liquidity)} ${symbol ?? ``}`;

const numberWithCommas = (val: number): string =>
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
