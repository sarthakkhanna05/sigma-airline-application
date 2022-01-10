import express from "express";
// import { signUp } from "../Passport/config.js";
import {
  addPassenger,
  getAllPassengers,
  getPassenger,
  loginPassenger,
  updatePassenger,
} from "../Services/passenger.js";

const router = express.Router();

router.post("/", getPassenger);

router.post("/all", getAllPassengers);

router.post("/signup", addPassenger);

router.post("/login", loginPassenger);

router.patch("/update", updatePassenger);

export default router;
