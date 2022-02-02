import Web3 from "web3";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { abi } from "./artifacts/contracts/lottery.sol/lottery.json";
export const initWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (typeof provider !== "undefined") {
        // provider
        //   .request({ method: "eth_requestAccounts" })
        //   .then((accounts) => {
        //     console.log(accounts);
        //   })
        //   .catch((err) => console.log(err));
        //   console.log(provider);

        // const accounts = await provider.request({
        //   method: "eth_requestAccounts",
        // });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        const contract = new Contract("", abi, signer);

        resolve({ contract, provider });
      }
    } else {
      reject("Please install Metamask chrome plugin while accessing the app");
    }
  });
};
