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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import { Spinner } from "react-bootstrap";
import MessageBox from "./MessageBox";

const Home = ({ contract }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [lotteryPoolData, setLotteryPoolData] = useState(null);
  const [radioValue, setRadioValue] = useState("1");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const radios = [
    { name: "Pool", value: "1" },
    { name: "Mini Pool", value: "2" },
  ];

  const handleAddEvent = (poolOwner, poolId, poolName, joiningFee) => {
    console.log({
      poolOwner,
      poolId,
      poolName,
      joiningFee,
    });
    setCreated(true);
    setLoading(false);
    setMessage(`Pool ${poolId.toString()} - ${poolName} created`);
    setIsError(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { poolName, poolSlot, entryFee } = data;
    try {
      if (radioValue === "1") {
        const poolData = await contract.createLotteryPool(
          poolName,
          poolSlot,
          entryFee
        );

        contract.on("LogLotteryPoolCreated", handleAddEvent);
      } else {
        const poolData = await contract.createMiniLotteryPool(
          poolName,
          poolSlot,
          entryFee
        );
        contract.on("LogLotteryPoolCreated", handleAddEvent);
      }
    } catch (e) {
      setIsError(true);
      setMessage(e.error.message.split(": ")[1]);
    }
  };

  return (
    <>
      <div>
        <Container>
          <Row>
            <h2 className="font-weight-bold text-left">1000 POOL</h2>
          </Row>
          {/* <Button varaint="primary" className="creatButn">
            CREATE
          </Button> */}

          <Container className="boxclr my-4">
            {!created && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <div className="wholebox col-md-4">
                    <div className="form-group text-left1 mb-3">
                      <ButtonGroup>
                        {radios.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={
                              idx % 2 ? "outline-success" : "outline-danger"
                            }
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) =>
                              setRadioValue(e.currentTarget.value)
                            }
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>
                    <div className="form-group text-left1 mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="text-left1"
                      >
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

                    <div className="form-group text-left1  mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="text-left1"
                      >
                        Available Slots
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Slot"
                        id="poolSlot"
                        {...register("poolSlot", { required: true })}
                      />
                    </div>

                    <div className="form-group text-left1 mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="text-left1"
                      >
                        Entry Fee
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Entry Fee"
                        id="entryFee"
                        {...register("entryFee", { required: true })}
                      />
                    </div>
                    <div className="d-flex justify-content-start align-items-start">
                      <Button
                        varaint="primary"
                        className="creatButn"
                        type="submit"
                        disabled={loading}
                      >
                        {!loading ? "SUBMIT" : "CREATING"} &nbsp;
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
            )}
            {message && (
              <div className="mt-3">
                <MessageBox isError={isError}>{message}</MessageBox>
              </div>
            )}
          </Container>
        </Container>
      </div>
    </>
  );
};

export default Home;
