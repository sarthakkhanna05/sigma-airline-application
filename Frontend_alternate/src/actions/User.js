
import UserClient from '../client/user-client';
import { User, Loader } from './ActionTypes';
import { trackLoader } from './Loader';
import Cookies from 'js-cookie';

export const login = (payload) => {
  return async (dispatch) => {
    try {
      const userClient = new UserClient();
      dispatch(trackLoader(User.LOGIN_SUCCESSFUl, true));
      const result = await userClient.userLogin(payload);
      dispatch({ type: User.LOGIN_SUCCESSFUl, payload: result.data });
      const user = await userClient.getUser({ userId: result.data.passenger._id });
      Cookies.set('user_session', JSON.stringify(user.data));

      dispatch({ type: User.FETCH_USER, payload: user.data });
      dispatch(trackLoader(User.LOGIN_SUCCESSFUl, false));
    } catch (error) {
      dispatch(trackLoader(User.LOGIN_SUCCESSFUl, false));
      throw error;
    }
  }
}

export const userSignUp = (payload) => {
  return async (dispatch) => {
    try {
      const userClient = new UserClient();
      dispatch(trackLoader(User.SIGNUP_SUCCESSFUl, true));
      const result = await userClient.userSignUp(payload);
      dispatch({ type: User.SIGNUP_SUCCESSFUl, payload: result.data });

      dispatch(trackLoader(User.SIGNUP_SUCCESSFUl, false));
      dispatch({ type: Loader.OPEN_MODAL, payload: { header: 'Sign Up', body: 'User Signed Up Successfully', open: true } });
    } catch (error) {
      dispatch(trackLoader(User.SIGNUP_SUCCESSFUl, false));
      throw error;
    }
  }
}

export const setUserData = () => {
  return async (dispatch) => {
    try {
      const userClient = new UserClient();
      let userData = Cookies.get('user_session');
      userData = JSON.parse(userData) || {};
      const user = await userClient.getUser({ userId: userData._id });
      Cookies.set('user_session', JSON.stringify(user.data));
      // console.log('fetched user again- userData', userData);
      // console.log('fetched user again- user', user.data);
      dispatch({ type: User.FETCH_USER, payload: user.data });
    } catch (error) {
      throw error;
    }
  }
}

export const updateUserData = (userData) => {
  return (dispatch) => {
    try {
      Cookies.set('user_session', JSON.stringify(userData));
      dispatch({ type: User.UPDATE_USER, payload: userData });
    } catch (error) {
      throw error;
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    try {
      Cookies.remove('user_session');
      dispatch({ type: User.LOGOUT, payload: {} });
    } catch (error) {
      throw error;
    }
  }
}


export const getReservations = (ids) => {
  return async (dispatch) => {
    try {
      dispatch(trackLoader(User.GET_RESERVATIONS, true));
      const userClient = new UserClient();
      const data = [];
      for (let id of ids) {
        const result = await userClient.getReservation({ reservationId: id });
        if(result.data.reservation)
          data.push(result.data.reservation);
      }
      /*  */
      dispatch({ type: User.GET_RESERVATIONS, payload: data });
      dispatch(trackLoader(User.GET_RESERVATIONS, false));
    } catch (error) {
      dispatch(trackLoader(User.GET_RESERVATIONS, false));
      throw error;
    }
  }
}

export const cancelReservation = (id) => {
  return async (dispatch) => {
    try {
      dispatch(trackLoader(User.CANCEL_RESERVATION, true));
      const userClient = new UserClient();
      await userClient.cancelReservation({ reservationId: id });
      dispatch({ type: User.CANCEL_RESERVATION, payload: true });
      dispatch(trackLoader(User.CANCEL_RESERVATION, false));
      dispatch({ type: Loader.OPEN_MODAL, payload: { header: 'Reservations', body: 'Cancelled Reservation Successfully', open: true } });
    } catch (error) {
      dispatch(trackLoader(User.CANCEL_RESERVATION, false));
      throw error;
    }
  }
}
