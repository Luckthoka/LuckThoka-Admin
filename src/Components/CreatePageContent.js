import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { Spinner } from "react-bootstrap";
import { postRequest } from "../axiosClient";
import { updateContent } from "../api";

const CreatePageContent = ({ contract }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updatePageContent = (data) => {
    console.log(data);

    postRequest(updateContent, data)
      .then((dat) => {
        enqueueSnackbar("Updated page content", { variant: "success" });
        reset();
      })
      .catch((err) => {
        console.log(err);
        //enqueueSnackbar("");
        enqueueSnackbar("error", { variant: "error" });
        reset();
      });
  };

  return (
    <>
      <div>
        <Container className="boxclr my-4">
          <form onSubmit={handleSubmit(updatePageContent)}>
            <Row>
              <div className="wholebox col-md-4">
                <div className="form-group text-left1 mb-3">
                  <label htmlFor="title" className="text-left1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter Title"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="form-group text-left1  mb-3">
                  <label htmlFor="description" className="text-left1">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Description"
                    id="description"
                    cols="40"
                    rows="5"
                    {...register("description", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="videoLink1" className="text-left1">
                    Video Link 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Video Link"
                    id="videoLink1"
                    {...register("videoLink1", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="videoLink2" className="text-left1">
                    Video Link 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Video Link"
                    id="videoLink2"
                    {...register("videoLink2", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="videoLink3" className="text-left1">
                    Video Link 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Video Link"
                    id="videoLink3"
                    {...register("videoLink3", { required: true })}
                  />
                </div>

                <div className="form-group text-left1 mb-3">
                  <label htmlFor="videoLink4" className="text-left1">
                    Video Link 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Video Link"
                    id="videoLink4"
                    {...register("videoLink4", { required: true })}
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
        </Container>
      </div>
    </>
  );
};

export default CreatePageContent;
