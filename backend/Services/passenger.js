import { validatePassword, hashPassword } from "../Utilities/hashing.js";

import Passeneger from "../Models/passenger.js";
import Passenger from "../Models/passenger.js";

//Gets all users. Groups are populated
export const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passeneger.find();
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export const getPassenger = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.body.userId)
      .populate({
        path: "trips",
        model: "Reservation",
        populate: [{ path: "flight", model: "Flight" }],
      })
      .exec();
    res.status(200).json(passenger);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

//Registers a new Passenger.
export const addPassenger = async (req, res) => {
  try {
    if (await checkIfUserExists(req.body.email)) {
      res.status(409).json({ message: "Passenger email already exists" });
      return;
    }
    const passenger = await createNewPassenger(req).save();
    res.status(200).json({
      message: "Signup successful",
      passenger,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export const updatePassenger = async (req, res) => {
  try {
    const passenger = await Passeneger.findById(req.body.userId);
    if (passenger.email != req.body.email) {
      if (await checkIfUserExists(req.body.email)) {
        res.status(409).json({ message: "Passenger email already exists" });
        return;
      }
    }
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = new Date(req.body.dateOfBirth);
    dateOfBirth.setDate(dateOfBirth.getDate() + 1)
    let updatedPassenger = null;
    if (req.body.password == "" || !req.body.password) {
      updatedPassenger = await Passeneger.findByIdAndUpdate(req.body.userId, {
        email,
        phoneNumber,
        dateOfBirth,
      });
    } else {
      const password = await hashPassword(req.body.password);

      updatedPassenger = await Passeneger.findByIdAndUpdate(req.body.userId, {
        email,
        password,
        phoneNumber,
        dateOfBirth,
      });
    }

    res.status(200).json({
      message: "Update successful",
      updatedPassenger,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export const loginPassenger = async (req, res) => {
  try {
    if (await checkIfUserExists(req.body.email)) {
      const passenger = await Passenger.findOne({ email: req.body.email });
      if (await validatePassword(req.body.password, passenger.password)) {
        res.status(200).json({
          message: "Login Successful",
          passenger,
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }
    } else {
      res.status(404).json({ message: "Email does not exist" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

const createNewPassenger = (req) => {
  const passenger = new Passenger();
  passenger.firstName = req.body.firstName;
  passenger.lastName = req.body.lastName;
  passenger.email = req.body.email;
  passenger.password = req.body.password;
  passenger.phoneNumber = "";
  passenger.dateOfBirth = null;
  passenger.mileagePoints = 0;
  passenger.pastTrips = [{}];
  passenger.upcomingTrips = [{}];
  passenger.isAdmin = req.body.isAdmin;

  return passenger;
};

export const checkIfUserExists = async (email) => {
  const passenger = await Passenger.findOne({
    email,
  });
  if (passenger) return true;
  else return false;
};
