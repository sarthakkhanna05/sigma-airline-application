import mongoose from "mongoose";
import { hashPassword, validatePassword } from "../Utilities/hashing.js";
import Passenger from "./passenger.js";
const Schema = mongoose.Schema;

const flightSchema = Schema({
  flightNumber: {
    type: String,
  },
  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  departureTime: {
    type: Date,
  },
  arrivalTime: {
    type: Date,
  },
  seats: Schema.Types.Mixed,
  seatsLeft: Number,
  airplane: {
    type: String,
  },
  airline: {
    type: String,
  },
  gate: {
    type: String,
  },
  price: {
    type: Number,
  },
  priceMiles: {
    type: Number,
  },
  miles: {
    type: Number,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
