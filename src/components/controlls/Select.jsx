import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material';
import React from 'react'
import Select from '@mui/material/Select';


export default function Selects(props) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl  variant="standard" style={{ margin: 20,  }} sx={{ m: 1, minWidth: 230 }}
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
             
                value={value}
                size="small"
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}