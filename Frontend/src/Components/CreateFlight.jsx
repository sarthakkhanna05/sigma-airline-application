import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

const CreateFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [airplane, setAirplane] = useState("");
  const [airline, setAirline] = useState("");
  const [gate, setGate] = useState("");
  const [price, setPrice] = useState("");
  const [priceMiles, setPriceMiles] = useState("");
  const [seatsLeft, setSeatsLeft] = useState("");
  const [miles, setMiles] = useState("");
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        return;
      }
      console.log("here")
      setValidated(true);
      if (departureTime >= arrivalTime) {
        alert("Departure needs to happen before you arrive.");
        return;
      }

      const data = {
        flightNumber,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        airplane,
        airline,
        gate,
        price,
        priceMiles,
        seatsLeft,
        miles,
      };
      console.log(data);
      const result = await axios.post(`${SERVER_URL}flight/create`, data);
      console.log(result);
      if (result.data) {
        console.log("flightcreated", result.data);
        alert("Flight created successfully");
        history.push("/dashboard");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ marginTop: 30, marginBottom: 20 }}>
      <Form validate={validated}>
        <Form.Group className="mb-3" controlId="flightNumber">
          <Row>
            <Col>
              <Form.Label>Flight Number:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter flight number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="departure">
          <Row>
            <Col>
              <Form.Label>Departure Location:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter departure location"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="arrival">
          <Row>
            <Col>
              <Form.Label>Arrival Location:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={arrival}
                placeholder="Enter arrival location"
                onChange={(e) => setArrival(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="departuretime">
          <Row>
            <Col>
              <Form.Label>Departure date and time:</Form.Label>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  variant="standard"
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={departureTime}
                  onChange={(newValue) => {
                    setDepartureTime(newValue);
                  }}
                  required
                />
              </LocalizationProvider>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="arrivaltime">
          <Row>
            <Col>
              <Form.Label>Arrival date and time:</Form.Label>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={arrivalTime}
                  onChange={(newValue) => {
                    setArrivalTime(newValue);
                  }}
                  required
                />
              </LocalizationProvider>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="airplane">
          <Row>
            <Col>
              <Form.Label>Make of the Airplane:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Make of the Airplane"
                value={airplane}
                onChange={(e) => setAirplane(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="airline">
          <Row>
            <Col>
              <Form.Label>Name of the Airline:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name of the Airline"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="gate">
          <Row>
            <Col>
              <Form.Label>Gate Number:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Gate Number"
                value={gate}
                onChange={(e) => setGate(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Row>
            <Col>
              <Form.Label>Price of the ticket</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Price of the ticket"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="priceMiles">
          <Row>
            <Col>
              <Form.Label>Price of ticket in miles:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Price of ticket in miles"
                value={priceMiles}
                onChange={(e) => setPriceMiles(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seatsLeft">
          <Row>
            <Col>
              <Form.Label>No of seats on the airplane:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="No of seats on the airplane"
                value={seatsLeft}
                onChange={(e) => setSeatsLeft(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="miles">
          <Row>
            <Col>
              <Form.Label>Miles earned by booking this flight:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Miles earned by booking this flight"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary" onClick={handleCreate}>
          Create Flight
        </Button>
      </Form>
    </Container>
  );
};

export default CreateFlight;
