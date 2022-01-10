import { Flight } from '../actions/ActionTypes';

const defaultState = {

}

export default function FlightReducer(state = defaultState, action) {
  switch (action.type) {
    case Flight.SEARCH_FLIGHT:
      return Object.assign({}, state, { flights: action.payload });
    case Flight.BOOK_FLIGHT_SUCCESS:
      return Object.assign({}, state, { reservation: action.payload });
    case Flight.CREATE_FLIGHT_SUCCESS:
      return Object.assign({}, state, { newFlight: action.payload });
    default:
      return state;
  }
}