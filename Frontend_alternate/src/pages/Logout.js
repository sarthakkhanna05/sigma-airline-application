import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link, Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { logout } from '../actions/User';
import Loader from '../helpers/Loader';
import { User } from '../actions/ActionTypes';
import Modal from './Modal';

function Login(props) {
    const [data, setData] = React.useState({});


    useEffect(() => {
        props.history.push('/');
        props.logout();
        // eslint-disable-next-line 
    }, []);

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
                            Logging out
                        </Typography>
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
    logout
})(Login);