import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




export default function RadioComponent(props) {

  const renderItems = (values) => {
    return values.map(item => {
      return (
        <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} 
          onClick={() => props.handler(props.fieldName, item.value)}
        />
      )
    })
  }


  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup row  name={props.label} defaultValue={props.defaultValue}>
        {renderItems(props.values)}
      </RadioGroup>
    </FormControl>
  );
}
