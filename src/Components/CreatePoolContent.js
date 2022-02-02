import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Button,
  Alert,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import { Spinner } from "react-bootstrap";
import { postRequest } from "../axiosClient";
import { addMiniPool, addPool } from "../api";
import MessageBox from "./MessageBox";

const CreatePoolContent = ({ contract }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [radioValue, setRadioValue] = useState("1");

  const watchSlots = watch("poolSlots");
  const watchEntryFee = (watch("entryFee") * 80 * watchSlots) / 100;

  const radios = [
    { name: "Pool", value: "1" },
    { name: "Mini Pool", value: "2" },
  ];

  const createPool = async (data) => {
    setLoading(true);
    const { poolName, poolSlots, entryFeeContract } = data;
    const handleJoinEvent = (poolOwner, poolId, poolName, joiningFee) => {
      const _poolId = poolId.toString();
      if (radioValue === "1") {
        postRequest(addPool, { ...data, poolId: _poolId })
          .then((dat) => {
            enqueueSnackbar(`Added Pool ${_poolId}`, { variant: "success" });
            setLoading(false);
            setCreated(true);
            setMessage(`Added Pool ${_poolId}`);
            reset();
          })
          .catch((err) => {
            enqueueSnackbar(`${err.error}`, { variant: "error" });
            setLoading(false);
            setError(true);
            setMessage(`${err.error}`);
            reset();
          });
      } else {
        postRequest(addMiniPool, { ...data, poolId: _poolId })
          .then((dat) => {
            enqueueSnackbar(`Added Mini Pool ${_poolId}`, {
              variant: "success",
            });
            setLoading(false);
            setCreated(true);
            setMessage(`Added Mini Pool ${_poolId}`);
            reset();
          })
          .catch((err) => {
            enqueueSnackbar(`${err.error}`, { variant: "error" });
            setLoading(false);
            setError(true);
            setMessage(`${err.error}`);
            reset();
          });
      }
    };

    try {
      if (radioValue === "1") {
        await contract.createLotteryPool(poolName, poolSlots, entryFeeContract);
      } else {
        await contract.createMiniLotteryPool(
          poolName,
          poolSlots,
          entryFeeContract
        );
      }
      contract.on("LogLotteryPoolCreated", handleJoinEvent);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
      setMessage(err.data && err.data.message ? err.data.message : err.message);
    }
  };

  return (
    <>
      <div>
        <Container className="boxclr my-4">
          <form onSubmit={handleSubmit(createPool)}>
            <Row>
              <div className="wholebox col-md-4">
                <div className="form-group text-left1 mb-3">
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? "outline-success" : "outline-danger"}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                {/* <div className="form-group text-left1 mb-3">
                  <label htmlFor="poolID" className="text-left1">
                    Pool ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="poolId"
                    placeholder="Enter Pool Id"
                    {...register("poolId", { required: true })}
                  />
                </div> */}
                <div className="form-group text-left1 mb-3">
                  <label htmlFor="poolName" className="text-left1">
                    Pool Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="poolName"
                    placeholder="Enter Pool Name"
                    {...register("poolName", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="poolSlots" className="text-left1">
                    Pool Entries
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="poolSlots"
                    placeholder="Enter Pool Slots"
                    {...register("poolSlots", {
                      required: true,
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "only numbers are accepted",
                      },
                    })}
                  />
                </div>

                <div className="form-group text-left1  mb-3">
                  <label htmlFor="winner" className="text-left1">
                    Winner
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="How many winners in pool ?"
                    id="winner"
                    {...register("winner", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="entryFee" className="text-left1">
                    Entry Fee in Contract
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entry Fee Contract"
                    id="entryFeeContract"
                    {...register("entryFeeContract", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="entryFee" className="text-left1">
                    Entry Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entry Fee INR"
                    id="entryFee"
                    {...register("entryFee", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="conversionAmount" className="text-left1">
                    Conversion Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Conversion Amount"
                    id="conversionAmount"
                    {...register("conversionAmount", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="prizeAmount" className="text-left1">
                    Price Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prize Amount"
                    id="prizeAmount"
                    {...register("prizeAmount", { required: true })}
                  />
                  Estimated Price Amount: {watchEntryFee}
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="prizeConversionAmount" className="text-left1">
                    Price Conversion Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prize Conversion Amount"
                    id="prizeConversionAmount"
                    {...register("prizeConversionAmount", { required: true })}
                  />
                </div>

                <div className="d-flex justify-content-start align-items-start">
                  <Button
                    varaint="primary"
                    className="creatButn"
                    type="submit"
                    disabled={loading}
                  >
                    {!loading ? "SUBMIT" : "Loading..."} &nbsp;
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
          {/* {created && <Alert variant="success">{message}</Alert>} */}
          {message && <MessageBox isError={isError}>{message}</MessageBox>}
        </Container>
      </div>
    </>
  );
};

export default CreatePoolContent;
