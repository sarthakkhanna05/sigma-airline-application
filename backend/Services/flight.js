import Flight from "../Models/flight.js";

export const createFlight = async (req, res) => {
  try {
    const newFlight = createNewFlight(req);
    const flight = await newFlight.save();
    res.status(200).json({
      message: "flight successfully created",
      flight,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const searchFlight = async (req, res) => {
  try {
    const arrival = req.body.arrival;
    const departure = req.body.departure;

    const { departureDate, postDepartureDate } = getDates(req);

    const flights = await Flight.find({
      departure,
      arrival,
      departureTime: {
        $gte: departureDate,
        $lt: postDepartureDate,
      },
    });

    if (flights === undefined || flights.length == 0) {
      res.status(404).json({ message: "No flights" });
      return;
    }
    res.status(200).json({
      message: flights.length + " flight(s) found",
      flights,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

const getDates = (req) => {
  const departureDate = new Date(req.body.departureDate);
  const postDepartureDate = new Date(req.body.departureDate);
  postDepartureDate.setDate(postDepartureDate.getDate() + 1);
  return {
    departureDate,
    postDepartureDate,
  };
};

export const addPassengerToFlight = async (
  res,
  seat,
  passengerId,
  flightId
) => {
  try {
    const flight = await Flight.findById(flightId);
    const seats = flight.seats;
    seats[seat] = passengerId;
    const seatsLeft = flight.seatsLeft - 1;
    await Flight.findByIdAndUpdate(flightId, { seats, seatsLeft });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export const deletePassengerFromFlight = async (
  res,
  seat,
  passengerId,
  flightId
) => {
  try {
    const flight = await Flight.findById(flightId);
    const seats = flight.seats;
    seats[seat] = null;
    const seatsLeft = flight.seatsLeft + 1;
    await Flight.findByIdAndUpdate(flightId, { seats, seatsLeft });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export const createEmptyAirplane = (numberOfseatsInARow, noOfRows) => {
  const seats = {};
  for (let i = 1; i <= noOfRows; i++) {
    for (let j = 65; j <= 65 + numberOfseatsInARow; j++) {
      seats[i + String.fromCharCode(j)] = null;
    }
  }
  return seats;
};

const createNewFlight = (req) => {
  const flightNumber = req.body.flightNumber;
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const departureTime = new Date(req.body.departureTime).toString();
  const arrivalTime = new Date(req.body.arrivalTime).toString();

  console.log(departureTime, arrivalTime);
  // const arrivalTime = req.body.arrivalTime;
  const seats = createEmptyAirplane(9, 25);
  const airplane = req.body.airplane;
  const airline = req.body.airline;
  const gate = req.body.gate;
  const price = req.body.price;
  const priceMiles = req.body.priceMiles;
  const seatsLeft = req.body.seatsLeft;
  const miles = req.body.miles;

  const newFlight = new Flight({
    flightNumber,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    airplane,
    airline,
    gate,
    price,
    priceMiles,
    seatsLeft,
    miles,
  });

  return newFlight;
};
