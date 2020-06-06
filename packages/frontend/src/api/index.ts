const COMPOUND_API = 'https://api.compound.finance/api/v2/ctoken';

export const fetchCDAIInterestRate = async () => {
  try {
    const response = await (await fetch(COMPOUND_API)).json();
    return response.cToken.find((token: any) => token.symbol === "cDAI")?.supply_rate.value;
  } catch {
    return undefined;
  }
};