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
import { openModal } from '../actions/Loader';
import _ from 'lodash';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '35%',
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
};

function MyModal(props) {

    const handleClose = () => {
        props.openModal({open: false});
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={props.loader.modal.open || false}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.loader.modal.open}>
                    <Box sx={style}>
                        <Stack spacing={1} >
                            <Typography variant="h5" component="h1">
                                {props.loader.modal.header}
                            </Typography>
                            <hr/>
                            <Typography variant="subtitle1" >
                                {props.loader.modal.body}
                            </Typography>

                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                        </Stack>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const mapStateToProps = ({ flight, loader }) => {
    return {
        loader
    }
}

export default connect(mapStateToProps, {
    openModal
})(MyModal);