import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import Passenger from "./Models/passenger.js";
import Flight from "./Models/flight.js";

import passengerRoutes from "./Routes/passenger.js";
import flightRoutes from "./Routes/flight.js";
import reservationRoutes from "./Routes/reservation.js";

import { createEmptyAirplane } from "./Services/flight.js";

const dot = dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://18.223.252.200:3000",
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use("/api/passenger", passengerRoutes);
app.use("/api/flight", flightRoutes);
app.use("/api/reservation", reservationRoutes);

app.use(
  express.urlencoded({
    extended: true,
  })
);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log(`User Hanish connected to ${process.env.DB} DB`)
  );
}

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
