import React from 'react'
import { createTheme } from '@mui/material/styles'
import Typography from '@material-ui/core/Typography'
import { purple } from '@material-ui/core/colors'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ee98fb',
      main: '#ba68c8',
      dark: '#883997',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffa270',
      main: '#ff7043',
      dark: '#c63f17',
      contrastText: '#000',
    },
  },
  typography: {},
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
  SmallCard: { padding: 20 },
  Paper: {
    marginTop: 20,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 800,
  },
  // CategoryBtn: {
  //   width: 200,
  //   borderRadius: '50%',
  // },

  //login sign up PAGE
  PaperForm: {
    display: 'flex',
    height: '85vh',
    marginTop: 20,
    elevation: 5,
  },
  LoginBtn: {
    width: '100%',
  },
  NoBtn: {},
  CardLoginMedia: {
    backgroundImage: `url(https://source.unsplash.com/random/300x300?sig=2)`,
    height: '100%',
    width: '50%',
  },
}

// components: {
//   MuiTypography: {
//     variants: [
//       {
//         props: {
//           variant: 'body3',
//         },
//         style: {
//           fontSize: 20,
//         },
//       },
// {
//   props: {
//     variant: 'undertitle',
//   },
//   style: {
//     color: 'grey',
//     fontSize: 20,
//   },
// },
//     ],
//   },
// },
