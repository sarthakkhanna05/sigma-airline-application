
import FlightClient from '../client/flight-client';
import { Flight, Loader } from './ActionTypes';
import { trackLoader, openModal } from './Loader';

export const flightSearch = (payload) => {
    return async (dispatch) => {
        try {
            const flightClient = new FlightClient();
            dispatch(trackLoader(Flight.SEARCH_FLIGHT, true));
            const result = await flightClient.flightSearch(payload);
            dispatch({ type: Flight.SEARCH_FLIGHT, payload: result.data.flights });
            dispatch(trackLoader(Flight.SEARCH_FLIGHT, false));
        } catch (error) {
            dispatch(trackLoader(Flight.SEARCH_FLIGHT, false));
            // console.log('error', error)
            if(error.message === 'No flights')
                dispatch({ type: Loader.OPEN_MODAL, payload: { header: 'Search Flights', body: 'No Flights Found', open: true } });
            throw error;
        }
    }
}

export const flightBook = (payload) => {
    return async (dispatch) => {
        try {
            const flightClient = new FlightClient();
            dispatch(trackLoader(Flight.BOOK_FLIGHT_SUCCESS, true));
            const result = await flightClient.flightBook(payload);
            dispatch({ type: Flight.BOOK_FLIGHT_SUCCESS, payload: result.data.newReservation });
            dispatch(trackLoader(Flight.BOOK_FLIGHT_SUCCESS, false));
            dispatch({ type: Loader.OPEN_MODAL, payload: { header: 'Book Flight', body: 'Flight Booked Successfully', open: true } });
        } catch (error) {
            dispatch(trackLoader(Flight.BOOK_FLIGHT_SUCCESS, false));
            throw error;
        }
    }
}

export const flightCreate = (payload) => {
    return async (dispatch) => {
        try {
            const flightClient = new FlightClient();
            dispatch(trackLoader(Flight.CREATE_FLIGHT_SUCCESS, true));
            const result = await flightClient.flightCreate(payload);
            dispatch({ type: Flight.CREATE_FLIGHT_SUCCESS, payload: result.data.flight });
            dispatch(trackLoader(Flight.CREATE_FLIGHT_SUCCESS, false));
            dispatch({ type: Loader.OPEN_MODAL, payload: { header: 'Create Flight', body: 'Flight Created Successfully', open: true } });
        } catch (error) {
            dispatch(trackLoader(Flight.CREATE_FLIGHT_SUCCESS, false));
            throw error;
        }
    }
}
