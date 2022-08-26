import { createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import Controls from './controlls/Controls';
import NotListedLocation from '@mui/icons-material/NotListedLocation';


 const ConfirmDialog=(props) =>{
    const { confirmDialog, setConfirmDialog } = props;
    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle sx={{textAlign:'center'}} >
            <IconButton disableRipple sx={{backgroundColor:'#ffcdd2', color:'red', fontSize:'8 rem'}} >
                <NotListedLocation/>
            </IconButton>
            </DialogTitle>
            <DialogContent sx={{textAlign:'center'}}>
                <Typography variant='h5'>
                    {confirmDialog.title} 
                </Typography>
                <Typography variant='subtitle2'>
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent:'center'}}>
                <Controls.Button sx={{ width: 80, padding: 0.5, margin: 2 }} color="secondary"  variant="outlined"  text='No' onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}/>
                <Controls.Button sx={{ width: 80, padding: 0.5, margin: 2 }} color="error" text='Ok' onClick={confirmDialog.onConfirm}  variant="outlined" />
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDialog;
