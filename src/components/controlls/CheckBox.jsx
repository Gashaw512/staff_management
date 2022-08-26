import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import React from 'react'


export default function CheckBox(props) {

    const { name, label, value, onChange } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl style={{ margin: 10 }}>
            <FormControlLabel
                control={<Checkbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}