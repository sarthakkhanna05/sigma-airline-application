import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Flight from "../components/Flight";
import "../css/Home.css";

export default function Home() {
  const { departure, arrival, departureDate } = useParams();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (departure && arrival && departureDate) {
      axios
        .post("http://localhost:5000/api/flight/search", {
          departure,
          arrival,
          departureDate,
        })
        .then((response) => {
          console.log("result", response);
          setFlights(response.data.flights);
        });
    }
  }, [departure, arrival, departureDate]);
  return (
    <div className="all-flights_container">
      <h4 className="total-flights">Total Flights: {flights.length}</h4>
      <div className="all-flights">
        {flights.map((flight) => {
          let departDate =
            new Date(flight.departureTime).getFullYear() +
            "-" +
            (new Date(flight.departureTime).getMonth() + 1) +
            "-" +
            new Date(flight.departureTime).getDate();
          let arrivalDate =
            new Date(flight.arrivalTime).getFullYear() +
            "-" +
            (new Date(flight.arrivalTime).getMonth() + 1) +
            "-" +
            new Date(flight.arrivalTime).getDate();
          return (
            <>
              <Flight
                flight={flight}
                departDate={departDate}
                arrivalDate={arrivalDate}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
