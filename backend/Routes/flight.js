import express from "express";
// import { signUp } from "../Passport/config.js";
import { createFlight, searchFlight } from "../Services/flight.js";

const router = express.Router();

router.post("/search", searchFlight);

router.post("/create", createFlight);

export default router;
