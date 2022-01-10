import mongoose from "mongoose";
import { hashPassword, validatePassword } from "../Utilities/hashing.js";
import Flight from "./flight.js";
import Passenger from "./passenger.js";

const Schema = mongoose.Schema;

const reservationSchema = Schema({
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "Passenger",
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  seatNumber: {
    type: String,
  },
  milesEarned: {
    type: String,
  },
  price: {
    type: Number,
  },
  priceMiles: {
    type: Number,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
