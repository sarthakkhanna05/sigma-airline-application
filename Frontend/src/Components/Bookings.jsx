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
import Reservation from "./Reservation";

const Bookings = ({ passenger }) => {
  const [trips, setTrips] = useState([]);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [message, setMessage] = useState("You have no reservations");
  const [flights, setFlights] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState([]);
  const [mileagePoints, setMileagePoints] = useState([]);

  const history = useHistory();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("passengerId");
      const result = await axios.post(`${SERVER_URL}passenger/`, { userId });
      console.log(result.data);
      if (result.data) {
        const user = result.data;
        setTrips(user.trips);
        if (user.trips.length !== 0) {
          setMessage("You have " + user.trips.length + " reservation(s)");
        }
      } else console.log("did not recieve user data from backend");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [passenger]);

  const changeReservation = async (data) => {
    console.log(data);
    try {
      if (data) {
        const result = await axios.post(
          `${SERVER_URL}reservation/change`,
          data
        );
        if (result.data) {
          alert("reservation successfully Updated");
          history.push("/dashboard");
          window.location.reload(false);
        } else {
          alert("Some error occurred");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Some error occurred");
    }
  };

  const cancelReservation = async (data) => {
    console.log(data);
    try {
      if (data) {
        const result = await axios.delete(`${SERVER_URL}reservation/remove`, {
          data,
        });
        if (result.data) {
          alert("reservation successfully cancelled");
          history.push("/dashboard");
          window.location.reload(false);
        } else {
          alert("Some error occurred");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Some error occurred");
    }
  };

  return (
    <div>
      {message}
      <br />
      <hr />
      <br />
      <Container>
        <Col>
          {trips.map((reservation) => (
            <Row style={{ marginBottom: 10 }}>
              <Reservation
                key={reservation._id}
                reservation={reservation}
                flight={reservation.flight}
                handleChangeReservation={changeReservation}
                handleCancelReservation={cancelReservation}
                seatNumber={reservation.seatNumber}
              />
            </Row>
          ))}
        </Col>
      </Container>
    </div>
  );
};

export default Bookings;
