import { User } from '../actions/ActionTypes';

const defaultState = {
  loggedIn: false,
  userData: {}
}

export default function UserReducer(state = defaultState, action) {
  switch (action.type) {
    case User.LOGIN_SUCCESSFUl:
      return Object.assign({}, state, {});
    case User.SIGNUP_SUCCESSFUl:
      return Object.assign({}, state, {...action.payload});
    case User.LOGOUT:
      return Object.assign({}, state, {...action.payload, loggedIn: false, userData: {}});
    case User.FETCH_USER:
      return Object.assign({}, state, { userData: action.payload, loggedIn: true });
    case User.UPDATE_USER:
      return Object.assign({}, state, { userData: action.payload });
    case User.GET_RESERVATIONS:
      return Object.assign({}, state, { userData: { ...state.userData, trips: action.payload } });
    default:
      return state;
  }
}