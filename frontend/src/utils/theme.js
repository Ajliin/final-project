import React from 'react'
import { createTheme } from '@mui/material/styles'
//import Typography from '@material-ui/core/Typography'
//import { purple } from '@material-ui/core/colors'
//import { withTheme } from '@material-ui/core'

export const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    fontWeightLight: 100,

    body1: {
      // color: '#030304',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      light: '#cab9ed',
      main: '#251761',
      dark: '#010037',

      contrastText: '#d5cfc7',
    },
    secondary: {
      light: '#ff983f',
      main: '#ff6600',
      dark: '#c43300',
      contrastText: '#030304',
    },
  },
})

export const styles = {
  CardHeaderMedia: {
    backgroundImage: `url(https://source.unsplash.com/random/3000x300?sig=1)`,
    height: 300,
  },
  CardHeader: {
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },
  Card: { marginTop: 20 },
  SmallCard: { padding: 20, marginTop: 10 },
  Paper: {
    marginTop: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 800,
    backgroundColor: '#d5cfc7',
  },

  //login sign up PAGE
  PaperForm: {
    display: 'flex',
    height: '85vh',
    marginTop: 20,
    elevation: 5,
    background: '#fcd3c5',
  },
  LoginBtn: {
    width: '100%',
  },
  CardLoginMedia: {
    backgroundImage: `url(./illu5.jpg)`,
    height: '100%',
    width: '50%',
  },

  BackgroundImg: {
    backgroundImage: `url(./header.jpg)`,
    backgroundPosition: 'bottom',
    height: '65vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    objectFit: 'cover',
  },

  BackgroundOrange: {
    backgroundColor: 'secondary',
  },
  //CompanySignUp
  SignUpEditForm: {
    display: 'flex',
    marginTop: 20,
    elevation: 5,
    height: '100%',
    backgroundColor: '#cab9ed',
  },

  FooterStyle: {
    background: '#010037',
    color: '#d5cfc7',
    padding: 20,

    bottomMargin: 0,
  },
  HeaderStyle: {
    position: 'sticky',
  },
  Typo1: {
    color: '#030304',
  },
  TypoGrey: {
    color: 'darkgrey',
  },
  TypoBright: {
    color: '#cab9ed',
    fontWeight: 700,
    fontSize: 50,
  },
  BgLightPurple: {
    background: '#251761',
    fontSize: 'large',
    color: '#d5cfc7',
    paddingY: 20,
    paddingX: 2,
    margin: 2,
  },
}
