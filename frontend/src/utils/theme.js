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
  // COMPANYPAGE

  //HeaderCard
  Card: {
    marginTop: 20,
  },
  CardHeaderMedia: {
    backgroundImage: `url(https://source.unsplash.com/random/3000x300?sig=1)`,
    height: 300,
  },
  //content under picture
  CardContent: {
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },

  SmallCard: {
    padding: 20,
    marginTop: 10,

    transition: 'transform 6s ease-in-out',
    '&:hover': { transform: 'scale(1.5, 1.5, 1)', backgroundColor: 'red' },
  },

  // Searchresult
  Paper: {
    marginTop: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 800,
    backgroundColor: '#d5cfc7',
  },

  AnimateCard: {
    transition: 'transform 0.15s ease-in-out',
    '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
  },

  //login sign up PAGE
  PaperForm: {
    display: 'flex',
    height: '85vh',
    marginTop: 20,
    elevation: 5,
    backgroundColor: '#cab9ed',
  },
  LoginBtn: {
    width: '100%',
  },
  CardLoginMedia: {
    backgroundImage: `url(./illu8.jpg)`,
    height: '100%',
    width: '50%',
  },
  //end login

  // Profile
  ProfileCardHeader: {
    backgroundImage: `url(./illu10.jpg)`,
    height: 300,
  },
  ProfileBtn: {
    width: '70%',
    marginBottom: 10,
    float: 'left',
  },
  PageContainer: {
    height: '80vh',
  },
  // Landingpage
  BackgroundImg: {
    backgroundImage: `url(./header.jpg)`,
    backgroundPosition: 'bottom',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    objectFit: 'cover',
  },

  h6Space: {
    marginTop: 10,
    marginBottom: 20,
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

  CompanyFormMedia: {
    backgroundImage: `url(./illu7.jpg)`,
    height: '100%',
    width: '50%',
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
    fontWeight: 700,
  },
  Typo2: {
    color: '#030304',
    fontWeight: 200,
  },
  TypoGrey: {
    //color: 'darkgrey',
    fontWeight: 700,
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
