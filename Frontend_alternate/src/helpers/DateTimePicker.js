import React from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function MaterialUIPickers(props) {
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        // console.log(newValue)
        if(!newValue)
            return
        setValue(newValue);
        const val = props.time ? newValue.format() : newValue.format("yyyy-MM-DD")
        props.handler(props.fieldName, val);
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            {props.time ?
                <DateTimePicker
                    label={props.label}
                    value={value}
                    // inputFormat="yyyy-MM-DD"
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                :
                <DesktopDatePicker
                label={props.label}
                value={value}
                inputFormat="yyyy-MM-DD"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
            }

        </LocalizationProvider>
    );
}
