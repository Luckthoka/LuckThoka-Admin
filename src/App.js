import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateLottary from "./Components/CreateLottary";
import DrawWinner from "./Components/DrawWinner";
import CreatedPool from "./Components/CreatedPool";
import LottaryPools from "./Components/LottaryPools";
import Sidebar from "./Components/Sidebar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/header";
import { Row } from "react-bootstrap";
import "./App.css";
import GetLotteryById from "./Components/GetLotteryById";
import GetMemberByID from "./Components/MemberPoolID";
import Owner from "./Components/owner";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { abi } from "./artifacts/contracts/lottery.sol/lottery.json";

import { Alert } from "react-bootstrap";
import CreatePoolContent from "./Components/CreatePoolContent";
import CreatePageContent from "./Components/CreatePageContent";

const initWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (typeof provider !== "undefined") {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        const contract = new Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          abi,
          signer
        );

        resolve({ contract, provider });
      }
    } else {
      reject("Please install Metamask chrome plugin while accessing the app");
    }
  });
};

const App = () => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initWeb3()
      .then(async ({ contract, provider }) => {
        console.log({ contract });
        setContract(contract);
        setProvider(provider);
        provider
          .getSigner()
          .getAddress()
          .then((acc) => {
            console.log({ acc });
            setAccount(acc);
          });
      })
      .catch((data) => setErrorMessage(data));
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Router>
            <Row className="p-0 m-0">
              <Header />
            </Row>

            <div className="col-md-2 my-3">
              <Sidebar />
            </div>

            <div className="col-md-10 my-3">
              {!errorMessage ? (
                <div className="card">
                  <Routes>
                    {/* <Route
                        exact
                        path="/"
                        element={<CreateLottary contract={contract} />}
                      /> */}
                    <Route
                      exact
                      path="/"
                      element={<CreatePoolContent contract={contract} />}
                    />
                    <Route
                      exact
                      path="/DrawWinner"
                      element={<DrawWinner contract={contract} />}
                    />
                    <Route
                      exact
                      path="/CreatedPool"
                      element={<CreatedPool contract={contract} />}
                    />
                    <Route
                      exact
                      path="/LottaryPools"
                      element={<LottaryPools contract={contract} />}
                    />
                    <Route
                      exact
                      path="/GetLottaryById"
                      element={<GetLotteryById contract={contract} />}
                    />
                    <Route
                      exact
                      path="/GetMemberByID"
                      element={<GetMemberByID contract={contract} />}
                    />
                    <Route exact path="/Owner" element={<Owner />} />
                    <Route
                      exact
                      path="/CreatePool"
                      element={<CreatePoolContent contract={contract} />}
                    />
                    <Route
                      exact
                      path="/CreatePageContent"
                      element={<CreatePageContent />}
                    />
                  </Routes>
                </div>
              ) : (
                <Alert variant="danger">{errorMessage}</Alert>
              )}
            </div>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
