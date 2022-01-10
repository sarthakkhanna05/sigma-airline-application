import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Flight = ({ flight, handleReservation, passenger }) => {
  const [flightNumber, setFlightNumber] = useState(flight.flightNumber);
  const [departure, setDeparture] = useState(flight.departure);
  const [arrival, setArrival] = useState(flight.arrival);
  const [departureTime, setDepartureTime] = useState(
    new Date(flight.departureTime).toLocaleString("en-US")
  );
  const [arrivalTime, setArrivalTime] = useState(
    new Date(flight.arrivalTime).toLocaleString("en-US")
  );
  const [seats, setSeats] = useState(flight.seats);
  const [seatsLeft, setSeatsLeft] = useState(flight.seatsLeft);
  const [airplane, setAirplane] = useState(flight.airplane);
  const [airline, setAirline] = useState(flight.airline);
  const [gate, setGate] = useState(flight.gate);
  const [price, setPrice] = useState(flight.price);
  const [priceMiles, setPriceMiles] = useState(flight.priceMiles);
  const [miles, setMiles] = useState(flight.miles);

  const [open, setOpen] = React.useState(false);
  const [selectedSeat, setSelectedSeat] = useState("");

  const handleChange = (event) => {
    setSelectedSeat(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleBookPrice = (e) => {
    e.preventDefault();
    try {
      if (selectedSeat === "") {
        alert("Seat cannot be emty");
        return;
      }
      const reservation = {
        flightId: flight._id,
        passengerId: localStorage.getItem("passengerId"),
        seatNumber: selectedSeat,
        paidByMiles: false,
      };
      handleReservation(reservation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookMiles = (e) => {
    e.preventDefault();
    try {
      if (selectedSeat === "") {
        alert("Seat cannot be emty");
        return;
      }
      if (passenger.mileagePoints < flight.priceMiles) {
        alert("you do not have sufficient miles to book this flight");
        return;
      }
      const reservation = {
        flightId: flight._id,
        passengerId: localStorage.getItem("passengerId"),
        seatNumber: selectedSeat,
        paidByMiles: true,
      };
      handleReservation(reservation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card style={{}}>
        <Card.Body>
          {/* <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle> */}
          <Row>
            <Col>
              <Row>
                <Col>
                  <Row>
                    <Card.Title>Departure</Card.Title>
                  </Row>
                  <Row>
                    <Card.Subtitle className="mb-2 text-muted">
                      {departure}
                    </Card.Subtitle>
                  </Row>
                  <Row>
                    <Card.Subtitle className="mb-2 text-muted">
                      {departureTime}
                    </Card.Subtitle>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Card.Title>Arrival</Card.Title>
                  </Row>
                  <Row>
                    <Card.Subtitle className="mb-2 text-muted">
                      {arrival}
                    </Card.Subtitle>
                  </Row>
                  <Row>
                    <Card.Subtitle className="mb-2 text-muted">
                      {arrivalTime}
                    </Card.Subtitle>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card.Title>Airplane Details</Card.Title>
              </Row>
              <Row>
                <Card.Subtitle className="mb-2 text-muted">
                  {airline}
                </Card.Subtitle>
              </Row>
              <Row>
                <Card.Subtitle className="mb-2 text-muted">
                  {flightNumber}
                </Card.Subtitle>
              </Row>
              <Row>
                <Card.Subtitle className="mb-2 text-muted">
                  {airplane}
                </Card.Subtitle>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card.Title>Price</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${price} / {priceMiles} miles
                </Card.Subtitle>
              </Row>
              <Row>
                <Card.Title>Miles Earned</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {miles} miles
                </Card.Subtitle>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card.Title>Seat Selection</Card.Title>
              </Row>

              <Row class="d-flex justify-content-center">
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Seat Number
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selectedSeat}
                    label="Seat Number"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {Object.keys(seats).map(
                      (seatNumber) =>
                        seats[seatNumber] == null && (
                          <MenuItem value={seatNumber}>{seatNumber}</MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Row>
            </Col>
            <Col>
              <Row>
                <Button variant="primary" onClick={handleBookPrice}>
                  Book using money
                </Button>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Button variant="primary" onClick={handleBookMiles}>
                  Book using miles
                </Button>
              </Row>
            </Col>
          </Row>

          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Flight;
