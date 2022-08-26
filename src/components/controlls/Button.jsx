import React from 'react'
import { Button as MuiButton, styled } from '@mui/material';
import { padding } from '@mui/system';



const StyledButton = styled(MuiButton)({
        margin: 15,
        textTransform: 'none',
        padding: 3,
}) 

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    

    return (

        <StyledButton 
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "warning"}
            onClick={onClick}
            {...other}
            >
            {text}
        </StyledButton>
    )
}
