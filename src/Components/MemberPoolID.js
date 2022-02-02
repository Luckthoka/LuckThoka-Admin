import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Web3 from "web3";

function MemberPoolID({ contract }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [poolData, setPoolData] = useState(null);
  const [show, setShow] = useState(false);
  const [poolId, setPoolId] = useState("");

  const onSubmit = async (data) => {
    const { poolId } = data;
    setLoading(true);
    const poolData = await contract.getLotteryPoolMemeberById(
      poolId.toString()
    );
    setLoading(false);
    setFetched(true);
    console.log({ poolId, poolData });
  };

  return (
    <Container className="px-4">
      <Row>
        <h2 className="font-weight-bold text-left">
          Get Lottary Member Pool by ID
        </h2>
      </Row>
      {/* <Button varaint="primary" className="creatButn">
          CREATE
        </Button> */}

      <Container className="boxclr my-4 container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <div className="wholebox col-md-4">
              <div className="form-group text-left1 mb-3">
                <label htmlFor="formGroupExampleInput" className="text-left1">
                  Lottary Member Pool ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="poolId"
                  placeholder="Pool ID"
                  {...register("poolId", { required: true })}
                />
              </div>

              <div className="d-flex justify-content-start align-items-start">
                <Button varaint="primary" className="creatButn" type="submit">
                  SUBMIT{" "}
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
          </Row>
        </form>
      </Container>
    </Container>
  );
}

export default MemberPoolID;
