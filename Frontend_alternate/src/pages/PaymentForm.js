import React from 'react';
import '../css/Common.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import RadioComponent from '../helpers/RadioComponent';
import Typography from '@mui/material/Typography';
import config from '../config';

export default function PaymentForm(props) {
    const [data, setData] = React.useState({});
    

    const handler = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const continueHandler = () => {
        console.log('Book', JSON.stringify(data));
        //TODO
        //Call search API and send below data
        //Payment {"card_number":"12","lastname":"01/12","cvv":"123","name":"asd"}

    }

    const SingleRow = ({label, value}) => {
        return (
            <Stack spacing={3} direction={'row'}>
                <Typography variant="h6" gutterBottom component="div">
                    {label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    {value}
                </Typography>
            </Stack>
        )
    }

    return (
       
        <div>
            { console.log(props.flight)}
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="container"
            // style={{ width: '150%'}}
            >
                <Paper className="paper" elevation={5}>
                    <Stack spacing={3} >
                        <Typography variant="h5" gutterBottom component="div">
                            Payment Details
                        </Typography>

                        <RadioComponent
                            label={"Pay by"}
                            values={config.paymentType}
                            defaultValue={config.defaultPaymentType}
                            fieldName={'paymentType'}
                            handler={(fieldName, val) => props.paymentHandler(val)}
                        />

                        {props.paymentType === "card" ? (<React.Fragment>

                            <TextField variant="outlined"
                                label={"Card Number"}
                                type={"number"}
                                onChange={(e) => handler("card_number", e.target.value)}
                            />
                            <TextField variant="outlined"
                                label={"Expiry (MM/YY)"}
                                onChange={(e) => handler("lastname", e.target.value)}
                            />
                            <TextField variant="outlined"
                                label={"CVV"}
                                type={"number"}
                                onChange={(e) => handler("cvv", e.target.value)}
                            />
                            <TextField variant="outlined"
                                label={"Name"}
                                onChange={(e) => handler("name", e.target.value)}
                            />
                        </React.Fragment>) :
                            <React.Fragment>
                                <Stack spacing={3}>
                                    <SingleRow label={'Required Miles'} value={props?.selectedFlight?.priceMiles}/>
                                    <SingleRow label={'Available Miles'} value={props?.user?.mileagePoints}/>
                                    <SingleRow label={'Balance Miles'} value={props?.user?.mileagePoints - props?.selectedFlight?.priceMiles}/>
                                </Stack>

                            </React.Fragment>
                        }



                        {/* <Button variant="outlined" startIcon={<FlightTakeoffIcon />} onClick={continueHandler}>
                            Continue
                        </Button> */}
                    </Stack>
                </Paper>
            </Box>


        </div>
    );
}