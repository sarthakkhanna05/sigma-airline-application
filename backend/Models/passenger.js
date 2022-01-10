import mongoose from "mongoose";
import { hashPassword, validatePassword } from "../Utilities/hashing.js";
import Reservation from "./reservation.js";
const Schema = mongoose.Schema;

const passengerSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  mileagePoints: Number,
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
  isAdmin: Boolean,
});

passengerSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

passengerSchema.methods.isValidPassword = validatePassword;

const Passenger = mongoose.model("Passenger", passengerSchema);

export default Passenger;
