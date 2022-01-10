import * as React from 'react';
import { connect } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlightRow from './FlightRow';
import Stack from '@mui/material/Stack';
import PassengerInfo from './PassengerInfo';
import PaymentForm from './PaymentForm';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { flightBook } from '../actions/Flight';
import _ from 'lodash';
import MyModal from './Modal';
import Loader from '../helpers/Loader';
import { Flight } from '../actions/ActionTypes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
};

const getFirstSeat = (seats) => {
    for (let seat in seats) {
        // console.log('getFirstSeat', seat)
        return seat;
    }

}

function Book(props) {
    const [paymentType, setPaymentType] = React.useState('card');
    const firstSeat = getFirstSeat(props.selectedFlight.seats);
    const [seat, setSeat] = React.useState(firstSeat);


    React.useEffect(() => {
        setSeat(firstSeat);
    }, [firstSeat])

    const bookHandler = () => {
        const payload = {
            "flightId": _.get(props, 'selectedFlight._id'),
            "passengerId": _.get(props, 'user.userData._id'),
            "seatNumber": seat,
            "paidByMiles": paymentType === "miles"
        }
        // console.log('boook', payload)
        props.flightBook(payload);
    }

    return (
        <div>
            {props.loader[Flight.BOOK_FLIGHT_SUCCESS] ? <Loader /> : null}

            <MyModal />

            <Modal
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <Box sx={style}>
                        <Stack spacing={1} >
                            <Typography variant="h5" component="h1">
                                Flight Details
                            </Typography>

                            <FlightRow
                                trip={props.selectedFlight}
                            />

                            <PassengerInfo
                                selectedFlight={props.selectedFlight || {}}
                                seat={seat}
                                seatHandler={(val) => {
                                    console.log('seat handler', val)
                                    setSeat(val)
                                }}
                            />

                            <PaymentForm
                                user={props.user.userData}
                                selectedFlight={props.selectedFlight}
                                paymentType={paymentType}
                                paymentHandler={(val) => setPaymentType(val)}
                            />

                            <Button variant="contained" startIcon={<FlightTakeoffIcon />} onClick={bookHandler}>
                                Book
                            </Button>
                        </Stack>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const mapStateToProps = ({ user, flight, loader }) => {
    return {
        user,
        flight,
        loader
    }
}

export default connect(mapStateToProps, {
    flightBook
})(Book);