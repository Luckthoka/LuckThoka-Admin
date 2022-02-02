import React, { useState, useEffect } from "react";
import { Container, Row, Button, Alert, Spinner } from "react-bootstrap";

import MessageBox from "./MessageBox";

const CreatedPool = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [poolIDs, setPoolIDs] = useState([""]);

  const [isError, setError] = useState(false);
  const [message, setMessage] = useState("");

  // const onSubmit = async (data) => {
  //   const { pools } = data;
  //   setLoading(true);
  //   const poolData = await contract.createdPools(pools);
  //   setLoading(false);
  //   setFetched(true);
  //   setPoolId(Number(poolData._hex.toString()));

  // };

  useEffect(() => {
    if (contract) {
      getAllPools();
    }
  }, [contract]);

  const getAllPools = () => {
    setLoading(true);
    contract
      .getAllcreatedPools()
      .then((data) => {
        setLoading(false);
        setFetched(true);
        setPoolIDs(data);
      })
      .catch((err) => {
        setError(true);
        setMessage(
          err.data && err.data.message ? err.data.message : err.message
        );
      });
  };

  return (
    <div>
      <Container className="px-4">
        <Row>
          <h2 className="font-weight-bold text-left">CREATED POOL</h2>
        </Row>

        <Container className="boxclr my-4 container">
          <Row>
            <form>
              {!loading && (
                <div className="wholebox col-md-4">
                  <div className="d-flex justify-content-start align-items-start">
                    <Button
                      varaint="primary"
                      className="creatButn"
                      onClick={getAllPools}
                    >
                      {!loading ? "Show Details" : "Loading"} &nbsp;
                      {loading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                    </Button>
                  </div>

                  <div>
                    {fetched ? (
                      <div>
                        <div className="card w-100 my-3 p-4">
                          <h4>
                            Latest Lottery Pool ID:{" "}
                            <span>
                              {poolIDs.length > 0 &&
                                poolIDs[poolIDs.length - 1].toString()}
                            </span>
                          </h4>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {fetched ? (
                    <div className="card w-100 my-3 p-1">
                      <p>Lottery Pools</p>
                      {poolIDs.length > 0 &&
                        poolIDs.map((id, ind) => (
                          <div key={ind}>
                            <p>
                              <span>{id.toString()}</span>
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            </form>
          </Row>
        </Container>
        {message && <MessageBox isError={isError}>{message}</MessageBox>}
        {/* {fetched && <Alert variant="success">poolID: ${poolId}</Alert>} */}
      </Container>
    </div>
  );
};

export default CreatedPool;
