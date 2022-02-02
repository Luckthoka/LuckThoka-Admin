import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import MessageBox from "./MessageBox";
import { postRequest } from "../axiosClient";
import { updateWinner } from "../api";

const Menu1 = ({ contract }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrawEvent = (
    poolId,
    poolName,
    joiningFee,
    poolAmount,
    members,
    winner
  ) => {
    const _winner = winner.toString();
    const _poolId = poolId.toString();
    const _poolAmount = poolAmount.toString();
    const postData = {
      walletId: _winner,
      poolId: _poolId,
    };
    postRequest(updateWinner, postData)
      .then((res) => {
        setIsError(false);
        setMessage(
          `${_poolId} won by address ${_winner} of amount ${_poolAmount}`
        );

        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.error);
        setIsError(true);
        setLoading(false);
      });
  };

  const onDrawPool = async (data) => {
    setLoading(true);
    try {
      await contract.drawWinner(data.poolId);
      contract.on("LogLotteryPoolWinned", handleDrawEvent);
    } catch (err) {
      setIsError(true);
      setLoading(false);
      setMessage(err.data && err.data.message ? err.data.message : err.message);
    }
  };

  return (
    <div className="row">
      <Container className="px-4">
        <Row>
          <h2 className="font-weight-bold text-left">DRAW WINNER</h2>
        </Row>

        <Container className="boxclr my-4 container">
          <form onSubmit={handleSubmit(onDrawPool)}>
            <Row>
              <div className="wholebox col-md-4">
                <div className="form-group text-left1 mb-3">
                  <label htmlFor="poolId" className="text-left1">
                    Pool ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="poolId"
                    placeholder="Enter Pool Id"
                    {...register("poolId", { required: true })}
                  />
                </div>

                <div className="d-flex justify-content-start align-items-start">
                  <Button type="submit" varaint="primary" className="creatButn">
                    {!loading ? "SUBMIT" : "Drawing"} &nbsp;
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
                {message && (
                  <div className="mt-3">
                    <MessageBox isError={isError}>{message}</MessageBox>
                  </div>
                )}
              </div>
            </Row>
          </form>
        </Container>
      </Container>
    </div>
  );
};

export default Menu1;
