import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Common.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link, Paper } from '@mui/material';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DropDown from '../helpers/DropDown';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { userSignUp } from '../actions/User';
import Loader from '../helpers/Loader';
import Modal from './Modal';
import { User } from '../actions/ActionTypes';

function SignUp(props) {
    const [data, setData] = React.useState({});

    const continueHandler = () => {
        // console.log('Book', JSON.stringify(data));
        props.userSignUp(data);
    }

    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }


    return (
        <div >
            {props.loader[User.SIGNUP_SUCCESSFUl] ? <Loader /> : null}
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
                            Sign Up
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
                            label={"Password"}
                            onChange={(e) => handler("password", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Phone Number"}
                            value={data.phoneNumber || ""}
                            onChange={(e) => handler("phoneNumber", e.target.value)}
                        />
                        {/* <TextField variant="outlined"
                            label={"Milage Points"}
                            value={data.mileagePoints || 0}
                            disabled={true}
                        /> */}


                        <Button variant="outlined" startIcon={<PersonAddAltIcon />} onClick={continueHandler}>
                            Sign Up
                        </Button>

                        <Link
                            href="/"
                            // component="button"
                            variant="body2"
                        >
                            <Typography variant="subtitle1" gutterBottom component="div">
                                Already a registered user? Login here
                            </Typography>
                        </Link>
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
    userSignUp
})(SignUp);