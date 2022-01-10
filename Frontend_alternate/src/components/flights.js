import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDown from "../helpers/DropDown";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function Flight({ flight, arrivalDate, departDate }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  useEffect(() => {
    let allSeats = Object.keys(flight.seats)
      .filter((val) => flight.seats[val] == null)
      .map((val) => {
        return { label: val.toUpperCase(), value: val };
      });

    allSeats.unshift({ label: "Select Seat", value: null });
    setSeats(allSeats);
  }, [flight]);

  const handler = (name, value) => {
    setSelectedSeat(value);
  };
  return (
    <div className="single-flight">
      <h4 className="flight_header">
        <span>
          Flight - <span className="flight-number">{flight.flightNumber}</span>
        </span>{" "}
        <div className="price">{flight.price} Rs.</div>
      </h4>
      <div className="flight-details">
        <h4 className="detail_header">
          <span className="detail-key">Departure</span>: {flight.departure}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Arrival</span>: {flight.arrival}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Departure Time</span>: {departDate}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Arrival Time</span>: {arrivalDate}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Seat Left</span>: {flight.seatsLeft}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Airplane</span>: {flight.airplane}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Airline</span>: {flight.airline}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Gate</span>: {flight.gate}
        </h4>
        <h4 className="detail_header">
          <span className="detail-key">Miles</span>: {flight.miles}
        </h4>
      </div>
      <DropDown
        style={{ maxHeight: "100px" }}
        label={"Select Seats"}
        fieldName={"seats"}
        items={seats}
        handler={handler}
      />
      <Button
        style={{ float: "right", margin: "10px 16px" }}
        variant="outlined"
        startIcon={<FlightTakeoffIcon />}
      >
        Book
      </Button>
    </div>
  );
}

export default Flight;
