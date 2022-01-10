import Passenger from "../Models/passenger.js";
import Reservation from "../Models/reservation.js";
import Flight from "../Models/flight.js";
import { addPassengerToFlight, deletePassengerFromFlight } from "./flight.js";

export const getReservation = async (req, res) => {
  try {
    const reservationId = req.body.reservationId;
    const passengerId = req.body.passengerId;
    const reservation = await Reservation.findById(reservationId)
      .populate("passenger")
      .populate("flight")
      .exec();

    res.status(200).json({
      reservation,
      // message: "passenger has booked these reservations",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const makeReservation = async (req, res) => {
  try {
    console.log(req.body);
    const flightId = req.body.flightId;
    const passengerId = req.body.passengerId;
    const seat = req.body.seatNumber;
    const paidByMiles = req.body.paidByMiles;

    const flight = await Flight.findById(req.body.flightId);
    const priceMiles = flight.priceMiles;
    const milesEarned = flight.miles;
    const price = flight.price;

    const passenger = await Passenger.findById(passengerId);

    const reservation = new Reservation({
      passenger: passengerId,
      flight: flightId,
      seatNumber: seat,
      milesEarned,
      price: null,
      priceMiles: null,
    });

    if (paidByMiles) {
      if (!useMiles(passenger, priceMiles)) {
        res.status(400).json({
          message: "MileagePoints are not sufficient to book this flight",
        });
        return;
      }
      reservation.priceMiles = priceMiles;
    } else reservation.price = price;

    const newReservation = await reservation.save();
    await addPassengerToFlight(res, seat, passengerId, flightId);
    await addReservationToTrips(res, flightId, passengerId, newReservation);

    res.status(200).json({
      newReservation,
      message: "flights successfully booked",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const useMiles = async (passenger, priceMiles) => {
  try {
    const mileagePoints = passenger.mileagePoints;
    console.log(priceMiles, mileagePoints);

    if (mileagePoints < priceMiles) return false;
    await Passenger.findByIdAndUpdate(passenger._id, {
      mileagePoints: mileagePoints - priceMiles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
    return false;
  }
  return true;
};

export const cancelReservation = async (req, res) => {
  try {
    console.log(req.body);
    const reservation = await Reservation.findById(req.body.reservationId);
    console.log(reservation);
    const flightId = reservation.flight;
    const passengerId = reservation.passenger;
    const seat = reservation.seatNumber;
    await deletePassengerFromFlight(res, seat, passengerId, flightId);
    await deleteReservationFromTrips(res, flightId, passengerId, reservation);
    await Reservation.findByIdAndDelete(req.body.reservationId);

    res.status(200).json({
      message: "flights successfully cancelled",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const addReservationToTrips = async (
  res,
  flightId,
  passengerId,
  reservation
) => {
  try {
    const passenger = await Passenger.findById(passengerId);
    const flight = await Flight.findById(flightId);
    const trips = passenger.trips;
    const mileagePoints = passenger.mileagePoints + flight.miles;
    trips.push(reservation._id);
    await Passenger.findByIdAndUpdate(passengerId, { trips, mileagePoints });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const deleteReservationFromTrips = async (
  res,
  flightId,
  passengerId,
  reservation
) => {
  try {
    const passenger = await Passenger.findById(passengerId);
    const flight = await Flight.findById(flightId);
    const trips = passenger.trips;
    trips.remove(reservation._id);
    const mileagePoints =
      passenger.mileagePoints + flight.priceMiles - flight.miles;
    await Passenger.findByIdAndUpdate(passengerId, { trips, mileagePoints });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const getMileagePoints = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.body.passengerId);
    const mileagePoints = passenger.mileagePoints;

    res.status(200).json({
      mileagePoints,
      message: "Mileage points",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};


export const changeReservation = async (req, res) => {
  try {
    const reservationId = req.body.reservationId;
    console.log(reservationId)
    const curReservation = await Reservation.findById(reservationId);
    const curSeat = curReservation.seatNumber;
    const changeSeat = req.body.seatNumber;

    const flightId = curReservation.flight;

    const passengerId = curReservation.passenger;

    await deletePassengerFromFlight(res, curSeat, passengerId, flightId);
    await addPassengerToFlight(res, changeSeat, passengerId, flightId);
    await Reservation.findByIdAndUpdate(reservationId, { seatNumber: changeSeat });
    res.status(200).json({
      message: "Flight changed successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }

}

