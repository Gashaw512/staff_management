import { Button } from '@mui/material';
import React from 'react'


export default function ActionButton (props){
    const {color, children, onClick, ...other}=props;
  return (
   <Button onClick={onClick}>
         {children}
   </Button>
  )
}
