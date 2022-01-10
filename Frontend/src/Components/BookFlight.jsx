import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import Flight from "./Flight";

const BookFlight = ({ passenger }) => {
  const [departureDate, setDepartureDate] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [message, setMessage] = useState("Please Search for flights");
  const [flights, setFlights] = useState([]);
  const [mileagePoints, setMileagePoints] = useState(0);

  const history = useHistory();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const data = {
        departureDate,
        departure,
        arrival,
      };
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (new Date(departureDate) < currentDate) {
        alert("Please slect a date that is after the current time");
        return;
      }
      const result = await axios.post(`${SERVER_URL}flight/search`, data);
      if (result.data) {
        setMessage(result.data.message);
        setFlights(result.data.flights);
        console.log(result.data.flights);
      }
      console.log(result);
      console.log(localStorage.getItem("passengerId"));
    } catch (error) {
      console.log(error);
      alert("No such flight found");
    }
  };

  const makeReservation = async (reservation) => {
    console.log(reservation);
    try {
      if (reservation) {
        const result = await axios.post(
          `${SERVER_URL}reservation/create`,
          reservation
        );
        if (result.data) {
          setMessage("Please Search for flights");
          setFlights([]);
          setDeparture("");
          setArrival("");
          setDepartureDate("");
          alert("flight booked successfully");
          console.log(result.data.flights);
          history.push("/dashboard");
          window.location.reload(false);
        }
        console.log(result);
        console.log(localStorage.getItem("passengerId"));
      }
    } catch (error) {
      console.log(error);
      alert("Some error occurred");
    }
  };

  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group as={Col} controlId="departureDate">
              <Form.Label>Date of Departure</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of departure"
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Form.Group as={Col} controlId="departure">
            <Form.Label>Departure</Form.Label>
            <Form.Control
              type="text"
              placeholder="Departure Location"
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </Form.Group>
          <Col>
            <Form.Group as={Col} controlId="arrival">
              <Form.Label>Arrival</Form.Label>
              <Form.Control
                type="text"
                placeholder="Arrival Location"
                onChange={(e) => setArrival(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col class="d-flex align-items-center">
            <Button
              variant="primary"
              onClick={handleSearch}
              style={{ marginTop: 30 }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <hr />
      <div class="d-flex justify-content-center">{message}</div>
      <br />

      <Container>
        <Col>
          {flights.map((flight) => (
            <Row style={{ marginBottom: 10 }}>
              <Flight
                key={flight._id}
                flight={flight}
                handleReservation={makeReservation}
                passenger={passenger}
              />
            </Row>
          ))}
        </Col>
      </Container>
    </div>
  );
};

export default BookFlight;
