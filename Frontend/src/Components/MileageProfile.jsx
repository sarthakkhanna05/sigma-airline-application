import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";

const MileageProfile = ({ passenger }) => {
  const [firstName, setFirstName] = useState(
    passenger.firstName ? passenger.firstName : ""
  );
  const [lastName, setLastName] = useState(
    passenger.lastName ? passenger.lastName : ""
  );
  const [email, setEmail] = useState(passenger.email ? passenger.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    passenger.phoneNumber ? passenger.phoneNumber : ""
  );
  const [password, setPassword] = useState(
    passenger.password && passenger.password
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    passenger.dateOfBirth
      ? new Date(passenger.dateOfBirth).getFullYear() +
          "-" +
          ("0" + (new Date(passenger.dateOfBirth).getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date(passenger.dateOfBirth).getDate()).slice(-2)
      : ""
  );
  const [mileagePoints, setMileagePoints] = useState(
    passenger.mileagePoints ? passenger.mileagePoints : 0
  );

  const history = useHistory();

  //   const fetchUserData = async () => {
  //     try {
  //       const userId = localStorage.getItem("passengerId");
  //       const result = await axios.post(`${SERVER_URL}passenger/`, { userId });
  //       console.log(result.data);
  //       if (result.data) {
  //         const user = result.data;
  //         if (user.firstName) setFirstName(user.firstName);
  //         if (user.lastName) setLastName(user.lastName);
  //         if (user.email) setEmail(user.email);
  //         if (user.phoneNumber) setPhoneNumber(user.phoneNumber);
  //         // if (user.password) setPassword(user.password);
  //         let date =
  //           new Date(user.dateOfBirth).getFullYear() +
  //           "-" +
  //           ("0" + (new Date(user.dateOfBirth).getMonth() + 1)).slice(-2) +
  //           "-" +
  //           ("0" + new Date(user.dateOfBirth).getDate()).slice(-2);

  //         // let day = ("0" + date.getDate()).slice(-2);
  //         // let month = ("0" + (date.getMonth() + 1)).slice(-2);

  //         // let today = date.getFullYear() + "-" + month + "-" + day;

  //         if (user.dateOfBirth) setDateOfBirth(date);
  //         if (user.mileagePoints) setMileagePoints(user.mileagePoints);
  //       } else console.log("did not recieve user data from backend");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phoneNumber.length !== 10 && phoneNumber.length !== 0) {
      alert("please input valid phoneNumber");
      return;
    }
    try {
      const data = {
        userId: localStorage.getItem("passengerId"),
        phoneNumber,
        dateOfBirth,
        email,
        password,
      };
      const result = await axios.patch(`${SERVER_URL}passenger/update`, data);
      console.log(result);
      console.log(localStorage.getItem("passengerId"));
      alert("updated Successfully");
      history.push("/dashboard");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      alert("email already exists");
    }
  };

  useEffect(() => {
    if (passenger.firstName) setFirstName(passenger.firstName);
    if (passenger.lastName) setLastName(passenger.lastName);
    if (passenger.email) setEmail(passenger.email);
    if (passenger.phoneNumber) setPhoneNumber(passenger.phoneNumber);
    if (passenger.dateOfBirth)
      setDateOfBirth(
        new Date(passenger.dateOfBirth).getFullYear() +
          "-" +
          ("0" + (new Date(passenger.dateOfBirth).getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date(passenger.dateOfBirth).getDate()).slice(-2)
      );
    if (passenger.mileagePoints) setMileagePoints(passenger.mileagePoints);
  }, [passenger]);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Row>
              <Col>
                <Form.Label>Name:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={firstName + " " + lastName}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Row>
              <Col>
                <Form.Label>Email address:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Row>
              <Col>
                <Form.Label>Password:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  //   value={password}
                  placeholder="Change Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Row>
              <Col>
                <Form.Label>Phone Number:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Row>
              <Col>
                <Form.Label>Date Of Birth:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="Date"
                  placeholder="Date Of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="mileagePoints">
            <Row>
              <Col>
                <Form.Label>Mileage Points:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Mileage Points"
                  value={mileagePoints}
                  readOnly
                  //   onChange={(e) => setMileagePoints(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default MileageProfile;
