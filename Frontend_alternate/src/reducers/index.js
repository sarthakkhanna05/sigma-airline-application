import {combineReducers} from 'redux';
import FlightReducer from './FlightReducer';
import UserReducer from './UserReducer';
import LoaderReducer from './LoaderReducer';

export default combineReducers({
    flight: FlightReducer,
    user: UserReducer,
    loader: LoaderReducer
})