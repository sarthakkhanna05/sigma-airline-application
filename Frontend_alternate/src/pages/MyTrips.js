import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlightRow from './FlightRow';
import { cancelReservation, updateUserData } from '../actions/User';

function MyTrips(props) {
    const [data, setData] = React.useState(props.user.userData || {});
    useEffect(() => {
        setData(props.user.userData || {})
    }, [props.user.userData]);

    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const cancelHandler = (id) => {
        props.cancelReservation(id);
        let userData = {...props.user.userData};
        console.log('before', userData.trips);
        userData.trips = userData.trips.filter(trip => trip._id !== id);
        console.log('after', userData.trips);
        props.updateUserData(userData);
    }

    const continueHandler = () => {
        // console.log('Book', JSON.stringify(data));
        //TODO
        //Call search API and send below data
        //Book {"from":"SEA","to":"NYC","depart":"2021-11-18T15:03:05+05:30","return":"2021-11-20T15:03:09+05:30","passenger":"1","class":"economy"}
    }

    return (
        <div>
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
                            My Trips
                        </Typography>
                        
                        {props.user.userData && props.user.userData.trips ? props.user.userData.trips.map(trip => <FlightRow key={trip._id} trip={trip} cancel={true} cancelHandler={cancelHandler}/>) : null}
                        
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
    cancelReservation,
    updateUserData
  })(MyTrips);