import React from 'react';
import '../css/Common.css';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import DropDown from '../helpers/DropDown';
import Stack from '@mui/material/Stack';
import DateTimePicker from '../helpers/DateTimePicker';
import Config from '../config';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { flightSearch } from '../actions/Flight';
import FlightRow from './FlightRow';
import Book from './Book';
import NavBar from './NavBar';
import Modal from './Modal';

function Search(props) {
    const [data, setData] = React.useState({});
    const [modalOpen, setModalOpen] = React.useState(false);
    const [flight, setFlight] = React.useState({});

    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const searchHandler = () => {
        props.flightSearch(data);
    }

    const onClickHandler = (flight) => {
        setFlight(flight);
        setModalOpen(true);
    }

    return (
        <div>
             <NavBar/>
             <Modal />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="container"
            >
                <Paper className="paper" elevation={5}>
                    <Stack spacing={3}  >
                        <Typography variant="h5" gutterBottom component="div">
                            Search Flights
                        </Typography>
                        <DropDown
                            label={"From"}
                            fieldName={"departure"}
                            items={Config.flights.from}
                            handler={handler}
                        />
                        <DropDown
                            label={"To"}
                            fieldName={"arrival"}
                            items={Config.flights.to}
                            handler={handler}
                        />

                        <Stack spacing={2}>
                            <DateTimePicker
                                label={"Depart"}
                                fieldName={"departureDate"}
                                handler={handler}
                            />
                            {/* <DateTimePicker
                                label={"Return"}
                                fieldName={"return"}
                                handler={handler}
                            /> */}
                        </Stack>

                        {/* <TextField id="passenger" label="Passengers" variant="outlined" type="number"
                            onChange={(e) => handler("passenger", e.target.value)}
                        /> */}

                        {/* <RadioComponent
                            label={"Class"}
                            values={Config.class}
                            fieldName="class"
                            handler={handler}
                        /> */}

                        <Button variant="outlined" startIcon={<SearchIcon />} onClick={searchHandler}>
                            Search
                        </Button>
                    </Stack>
                </Paper>
            </Box>


            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="container"
            >
                <Paper className="paper" elevation={5}>
                    <Stack spacing={2}

                    >
                        <Typography variant="h5" gutterBottom component="div">
                            Flights
                        </Typography>

                        {(props.flight?.flights && props.flight.flights.length) ? props.flight.flights.map(trip => <FlightRow key={trip._id} trip={trip} search={true} onClickHandler={() => onClickHandler(trip)} />) : null}

                    </Stack>
                </Paper>
            </Box>

            <Book
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                selectedFlight={flight}
            />
        </div>
    );
}

const mapStateToProps = ({ flight, loader, user }) => {
    return {
        flight,
        loader,
        user
    }
}

export default connect(mapStateToProps, {
    flightSearch
})(Search);