import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
function owner() {
  return (
    <Container className="px-4">
      <Row>
        <h2 className="font-weight-bold text-left">Owner</h2>
      </Row>
      {/* <Button varaint="primary" className="creatButn">
      CREATE
    </Button> */}

      <Container className="boxclr my-4 container">
        <Row>
          <div className="wholebox col-md-4">
            <div className="form-group text-left1 mb-3">
              <label htmlFor="formGroupExampleInput" className="text-left1">
                Pool ID
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Pool ID"
              />
            </div>

            <div className="d-flex justify-content-start align-items-start">
              <Button varaint="primary" className="creatButn">
                SUBMIT
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </Container>
  );
}

export default owner;
