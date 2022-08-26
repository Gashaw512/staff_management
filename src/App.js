import styled from '@emotion/styled';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
// import  { makeStyles } from '@mui/styles'
import React from 'react';
import './App.css';
// import SideMenu from "../components/SideMenu";
// import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
// import Header from "../components/Header";
// import PageHeader from '../components/PageHeader';

import Staff from "./pages/staff/Staff";


const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#a5790c",
      
    },
    background: {
      default: "#a5790c"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


const useStyles = styled({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})


function App() {
  const classes = useStyles();

  return (
    //   <ThemeProvider theme={theme}>
    // <SideMenu />
    //   <div className={classes.appMain}>
    //      <Header />
    <ThemeProvider theme={theme}>
      <>
        <Staff />
      </>
    </ThemeProvider>




  );
}

export default App;