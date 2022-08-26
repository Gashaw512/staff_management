import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import Controls from './controlls/Controls';
import CloseIcon from '@mui/icons-material/Close';

export const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open={openPopup}>
            <DialogTitle style={{paddingRight:'0px'}}>
                <div style={{ display: 'flex' }}>
                    <Typography variant='h5' component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton onClick={()=>setOpenPopup(false)} color='secondary'>
                         <CloseIcon/>
                    </Controls.ActionButton>
                </div>  
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
