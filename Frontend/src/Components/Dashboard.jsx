import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import MileageProfile from "./MileageProfile";
import BookFlight from "./BookFlight";
import Bookings from "./Bookings";
import CreateFlight from "./CreateFlight";
import { Container, Button } from "react-bootstrap";
import { browserHistory } from "react-router";

const Dashboard = () => {
  const [key, setKey] = useState("bookFlight");
  const [showTab, setShowTab] = useState(false);
  const [passenger, setPassenger] = useState({});
  const history = useHistory();

  const show = () => {
    let createFlight;
    if (showTab)
      createFlight = (
        <Tab eventKey="createFlight" title="Create a flight">
          <CreateFlight props={{ name: "hanish" }} />
        </Tab>
      );
    else createFlight = null;
    return createFlight;
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("passengerId");
      const result = await axios.post(`${SERVER_URL}passenger/`, { userId });
      console.log(result.data);
      if (result.data) {
        setShowTab(result.data.isAdmin);
        setPassenger(result.data);
      } else console.log("did not recieve user data from backend");
    } catch (error) {
      alert("some error occured");
      console.log(error);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("passengerId", "");
    localStorage.setItem("auth", false);

    history.replace("/login", "urlhistory");
    // history.push("/login");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container fluid="xl">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand>Airline Reservation System</Navbar.Brand>
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="mileageProfile" title="Mileage Profile">
          <MileageProfile passenger={passenger} />
        </Tab>
        <Tab eventKey="bookFlight" title="Book a flight">
          <BookFlight passenger={passenger} />
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
          <Bookings passenger={passenger} />
        </Tab>
        {show()}
      </Tabs>
    </Container>
  );
};

export default Dashboard;
