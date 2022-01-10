import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Common.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DropDown from '../helpers/DropDown';

function Home(props) {
    const [data, setData] = React.useState(props.user.userData || {});
    useEffect(() => {
        setData(props.user.userData || {})
    }, [props.user.userData]);

    const handler = (name, value) => {
        
        if(name === 'seat')
            props.seatHandler(value);
        else
            setData({ ...data, [name]: value });
    }

    const continueHandler = () => {
        console.log('Book', JSON.stringify(data));
        //TODO
        //Call search API and send below data
        //Book {"from":"SEA","to":"NYC","depart":"2021-11-18T15:03:05+05:30","return":"2021-11-20T15:03:09+05:30","passenger":"1","class":"economy"}
    }

    const getSeatsData = (flight) => {
        const result = [];
        for(let seat in flight.seats){
            if(flight.seats[seat] === null)
                result.push({
                    label: seat,
                    value: seat
                })
        }
        return result;
    }

    return (
        <div >
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
                            Passenger Details
                        </Typography>
                        <TextField variant="outlined"
                            label={"Firstname"}
                            value={data.firstName || ""}
                            onChange={(e) => handler("firstName", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Lastname"}
                            value={data.lastName || ""}
                            onChange={(e) => handler("lastName", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Email"}
                            value={data.email || ""}
                            onChange={(e) => handler("email", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Phone Number"}
                            value={data.phoneNumber || ""}
                            onChange={(e) => handler("phoneNumber", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Milage Points"}
                            value={data.mileagePoints || 0}
                            disabled={true}
                        />
                        {props.selectedFlight ? <DropDown
                            label={"Select Seat"}
                            fieldName={"seat"}
                            items={getSeatsData(props.selectedFlight)}
                            handler={handler}
                        />: null}
                        

                        {/* <Button variant="outlined" startIcon={<FlightTakeoffIcon />} onClick={continueHandler}>
                            Continue
                        </Button> */}
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

})(Home);