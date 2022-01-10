import express from "express";

import {
  cancelReservation,
  getReservation,
  makeReservation,
  changeReservation,
} from "../Services/reservation.js";

const router = express.Router();

router.post("/", getReservation);

router.post("/create", makeReservation);

router.delete("/remove", cancelReservation);

router.post("/change", changeReservation);

export default router;
