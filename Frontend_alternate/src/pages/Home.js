import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import PassengerInfo from './PassengerInfo';
import MyTrips from './MyTrips';
import { getReservations } from '../actions/User';
import _ from 'lodash';
import NavBar from './NavBar';
import Loader from '../helpers/Loader';
import { User } from '../actions/ActionTypes';
import Modal from './Modal';

function Home(props) {
    useEffect(() => {
        const trips = _.get(props, 'user.userData.trips', []);
        const ids = _.map(trips, (trip) => trip._id);
        if (ids.length) {
            props.getReservations(ids);
        }

    }, []);

    return (
        <Grid container spacing={2}>
            {props.loader[User.GET_RESERVATIONS] || props.loader[User.CANCEL_RESERVATION] ? <Loader /> : null}
            <NavBar />
            <Modal />
            <Grid item xs={6} md={4}>
                <PassengerInfo />
            </Grid>
            <Grid item xs={6} md={8}>
                <MyTrips />
            </Grid>
        </Grid>

    );
}

const mapStateToProps = ({ user, loader }) => {
    return {
        user,
        loader
    }
}

export default connect(mapStateToProps, {
    getReservations
})(Home);