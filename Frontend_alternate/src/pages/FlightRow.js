import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';

const Block = ({ label, value }) => {
    return <Stack spacing={0} >
        <Typography variant="h6" gutterBottom component="div">
            {label}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
            {value}
        </Typography>
    </Stack>
}

function FlightRow(props) {
    const [data, setData] = React.useState(props.user.userData || {});
    useEffect(() => {
        setData(props.user.userData || {})
    }, [props.user.userData]);

    const trip = props.trip.flight || props.trip || {};

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="container"
        // style={{ width: '150%'}}
        >
            <Paper className="paper" elevation={1} onClick={props.onClickHandler}>
                <Typography variant="h5" gutterBottom component="div">
                    {trip.airline}
                </Typography>
                <Stack spacing={1} >

                    <Stack spacing={5} direction={"row"}
                        justifyContent={'space-between'}
                    >
                        <Block label={'Flight'} value={trip.airline} />
                        <Block label={'Depature'} value={trip.departure} />
                        <Block label={'Arrival'} value={trip.arrival} />
                        <Block label={'Price'} value={'$' + (trip.price || 0)} />
                        <Block label={'Price Miles'} value={trip.priceMiles} />

                        {props.cancel ? <Stack spacing={0} >
                            <Typography variant="h6" gutterBottom component="div">
                                {"Cancel"}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom component="div">
                                <Button color="error" startIcon={<CancelIcon />}
                                    onClick={() => props.cancelHandler(props.trip._id)}
                                />
                            </Typography>
                        </Stack> : null}

                    </Stack>

                    <Stack spacing={3} direction={"row"} justifyContent={'space-between'}>
                        <Block label={'Departed At'} value={moment(trip.departureTime).format('MMMM Do YYYY, h:mm:ss a')} />
                        <Block label={'Arrived At'} value={moment(trip.arrivalTime).format('MMMM Do YYYY, h:mm:ss a')} />
                    </Stack>
                </Stack>


            </Paper>
        </Box>


    );
}

const mapStateToProps = ({ user, loader }) => {
    return {
        user,
        loader
    }
}

export default connect(mapStateToProps, {

})(FlightRow);