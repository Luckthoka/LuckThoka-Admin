import React from "react";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function header() {
  return (
    <div>
      <div className="wrapper">
        <div className="bg-red">
          <div className="navigationBar">
            <Navbar expand="lg" className="p-0">
              <Container>
                <Navbar.Brand href="#">
                  <img src={Logo} width={100} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  ></Nav>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2 searchcls"
                      aria-label="Search"
                    />
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default header;
