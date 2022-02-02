import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import { weiConversion } from "../utils";

const LottaryPools = ({ contract }) => {
  const { register, handleSubmit } = useForm();
  const BN = Web3.utils.BN;
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [poolData, setPoolData] = useState(null);
  const [show, setShow] = useState(false);

  const [poolId, setPoolId] = useState("");
  const [isActive, setActive] = useState(false);
  const [isExists, setExists] = useState(false);
  const [slotsAvailable, setAvailability] = useState(0);
  const [joiningFee, setJoiningFee] = useState(0);
  const [poolAmount, setPoolAmount] = useState(0);
  const [poolName, setPoolName] = useState("");

  const onSubmit = async (data) => {
    const { poolId } = data;
    setLoading(true);
    const poolData = await contract.lotteryPools(poolId);
    setLoading(false);
    setFetched(true);
    setPoolData(poolData);
    setPoolId(poolId);
    setPoolAmount(weiConversion(poolData.poolAmount._hex.toString(), "ether"));
    setPoolName(poolData.poolName);
    setJoiningFee(weiConversion(poolData.joiningFee._hex.toString(), "ether"));
    setAvailability(Number(poolData.availableSlots._hex.toString()));
    setActive(poolData[7]);
    setExists(poolData[8]);
    console.log({ poolId, poolData });
  };

  return (
    <div>
      <div className="row">
        <Container className="px-4">
          <Row>
            <h2 className="font-weight-bold text-left">CREATED POOL</h2>
          </Row>

          <Container className="boxclr my-4 container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <div className="wholebox col-md-4">
                  <div className="form-group text-left1 mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="text-left1"
                    >
                      Lottary ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Lottary ID"
                      {...register("poolId", { required: true })}
                    />
                  </div>

                  <div className="d-flex justify-content-start align-items-start">
                    <Button
                      varaint="primary"
                      className="creatButn"
                      type="submit"
                    >
                      SHOW DETAILS
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
                </div>
                {fetched ? (
                  <div>
                    <Container className="card w-100 my-3 p-3">
                      <Row>
                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Pool Name: </span>
                              <span className="rightcls">{poolName}</span>
                            </h6>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Pool ID: </span>
                              <span className="rightcls">{poolId}</span>
                            </h6>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls">
                                {" "}
                                Available Slots:{" "}
                              </span>
                              <span className="rightcls">{slotsAvailable}</span>
                            </h6>
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Joining Fee:</span>
                              <span className="rightcls">
                                {joiningFee} ethers
                              </span>
                            </h6>
                          </div>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Pool Amount: </span>
                              <span className="rightcls">
                                {poolAmount} ethers
                              </span>
                            </h6>
                          </div>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Owner Address: </span>
                              <span className="rightcls">
                                Hyderabad, TS, India
                              </span>
                            </h6>
                          </div>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Winner Address: </span>
                              <span className="rightcls">
                                Hyderabad, TS, India
                              </span>
                            </h6>
                          </div>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls">
                                Active Or In-active:{" "}
                              </span>
                              <span className="rightcls">
                                {isActive ? "Active" : "In-active"}
                              </span>
                            </h6>
                          </div>
                        </Col>

                        <Col xs={12} sm={12} md={3}>
                          <div className="div1">
                            <h6>
                              <span className="leftcls"> Exits: </span>
                              <span className="rightcls">
                                {isExists ? "Yes" : "No"}
                              </span>
                            </h6>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ) : null}
              </Row>
            </form>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default LottaryPools;
