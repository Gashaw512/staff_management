
import { Card, Paper,Typography } from '@mui/material'
import { flexbox, styled } from '@mui/system';
import React from 'react'

const  PageHeader = (props) => {
    const { title, subTitle, icon } = props;
    const StyledDiv=styled('div')({
        padding:4,
        display:'flex',
        marginBottom:2
    })
    
    const StyledCard=styled(Card)({
        display:'inline-block',
        padding:5,
        color:'#3c44b1'
    })
    const StyledTitle=styled('div')({
        paddingLeft:40,
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    })
   

    return (
        <Paper elevation={0} square sx={{ backgroundColor: '#fdfdff', display:'flex' }}>
           <StyledDiv>
                <StyledCard>
                    {icon}
                </StyledCard>

                <StyledTitle>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </StyledTitle>
            </StyledDiv>
        </Paper>
    )
}
export default PageHeader;

