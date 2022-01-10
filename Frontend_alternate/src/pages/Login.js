import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link, Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { login } from '../actions/User';
import Loader from '../helpers/Loader';
import { User } from '../actions/ActionTypes';
import Modal from './Modal';

function Login(props) {
    const [data, setData] = React.useState({});

    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const continueHandler = () => {
        props.login(data);
    }

    useEffect(() => {
        if (props.user && props.user.loggedIn) {
            props.history.push(props.location?.state?.from?.pathname || "/home");
        }
        // eslint-disable-next-line 
    }, [props.user]);

    return (
        <div>

            {props.loader[User.LOGIN_SUCCESSFUl] ? <Loader /> : null}
            <Modal />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="container"
            >
                <Paper className="paper" elevation={5}>
                    <Stack spacing={3} >
                        <Typography variant="h5" gutterBottom component="div">
                            Login
                        </Typography>
                        <TextField variant="outlined"
                            label={"Email"}
                            onChange={(e) => handler("email", e.target.value)}
                        />
                        <TextField variant="outlined"
                            label={"Password"}
                            onChange={(e) => handler("password", e.target.value)}
                        />

                        <Button variant="outlined" startIcon={<LoginIcon />} onClick={continueHandler}>
                            Login
                        </Button>

                        <Link
                            href="/signup"
                            // component="button"
                            variant="body2"
                        >
                            <Typography variant="subtitle1" gutterBottom component="div">
                                Not a registered user? SignUp here
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
    login
})(Login);