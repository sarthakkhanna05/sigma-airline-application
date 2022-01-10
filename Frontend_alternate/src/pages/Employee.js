import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Common.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DateTimePicker from '../helpers/DateTimePicker';
import {flightCreate} from '../actions/Flight';
import {Flight} from '../actions/ActionTypes';
import Loader from '../helpers/Loader';
import Modal from './Modal';
import NavBar from './NavBar';

function Employee(props) {
    const [data, setData] = React.useState({});


    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const continueHandler = () => {
        // console.log('Book', JSON.stringify(data));
        props.flightCreate(data)
    }

    return (
        <div >
            <NavBar/>
             { props.loader[Flight.CREATE_FLIGHT_SUCCESS] ? <Loader/> : null}
            <Modal />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="container"
                style={{ width: '100%' }}
            >
                <Paper className="paper" elevation={5}>
                    <Stack spacing={3} >
                        <Typography variant="h5" gutterBottom component="div">
                            Create Flight
                        </Typography>
                        <TextField variant="outlined"
                            label={"Flight Number"}
                            value={data.flightNumber || ""}
                            onChange={(e) => handler("flightNumber", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Departure"}
                            value={data.departure || ""}
                            onChange={(e) => handler("departure", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Arrival"}
                            value={data.arrival || ""}
                            onChange={(e) => handler("arrival", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Airplane"}
                            value={data.airplane || ""}
                            onChange={(e) => handler("airplane", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Airline"}
                            value={data.airline || ""}
                            onChange={(e) => handler("airline", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Gate"}
                            value={data.gate || ""}
                            onChange={(e) => handler("gate", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Price"}
                            value={data.price || void 0}
                            type={"number"}
                            onChange={(e) => handler("price", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Seats Left"}
                            type={"number"}
                            value={data.seatsLeft || void 0}
                            onChange={(e) => handler("seatsLeft", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Price Miles"}
                            type={"number"}
                            value={data.priceMiles || void 0}
                            onChange={(e) => handler("priceMiles", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Miles"}
                            type={"number"}
                            value={data.miles || void 0}
                            onChange={(e) => handler("miles", e.target.value)}
                        />

                        <DateTimePicker
                            label={"Depart"}
                            fieldName={"departureTime"}
                            handler={handler}
                            time={true}
                        />
                        <DateTimePicker
                            label={"Return"}
                            fieldName={"arrivalTime"}
                            handler={handler}
                            time={true}
                        />


                        <Button variant="outlined" startIcon={<FlightTakeoffIcon />} onClick={continueHandler}>
                            Create
                        </Button>
                    </Stack>
                </Paper>
            </Box>


        </div>
    );
}

const mapStateToProps = ({ user, loader }) => {
    return {
        user,
        loader
    }
}

export default connect(mapStateToProps, {
    flightCreate
})(Employee);