import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatepicker} from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DatePicker(props) {
    
    const { name, label, value, onChange } = props

    const [valueD, setValue] = React.useState(new Date());
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} style={{ margin: 10 }} size='small'>
        
            <MuiDatepicker  disableToolbar variant="inline"  
                label={label}
                // views={["year"]}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                size="small"
                renderInput={(params) => <TextField {...params} />}
                onChange={date =>onChange(convertToDefEventPara(name,date))} /> 
                
        </LocalizationProvider>
    )
}