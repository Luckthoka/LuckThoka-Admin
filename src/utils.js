import Web3 from "web3";

export const weiConversion = (value, conversionType) => {
  return Web3.utils.fromWei(value, conversionType);
};

// export const hexConversion = (value) => {
//   return Web3.utils.
// }
