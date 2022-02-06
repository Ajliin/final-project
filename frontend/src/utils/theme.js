import React from 'react'
import { createTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { purple } from '@material-ui/core/colors'

export const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'body3',
          },
          style: {
            fontSize: 20,
          },
        },
        // {
        //   props: {
        //     variant: 'undertitle',
        //   },
        //   style: {
        //     color: 'grey',
        //     fontSize: 20,
        //   },
        // },
      ],
    },
  },
  palette: {
    primary: purple,

    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },

  styles: {
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
  SmallCard: { padding: 20 },
  Paper: {
    marginTop: 20,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    minWidth: 800,
    // alignItems: 'center',
    //justifyContent: 'space-around',
    // width: 1100,
  },
  CategoryBtn: {
    width: 200,
    borderRadius: '50%',
  },
  PaperForm: {
    display: 'flex',
    height: '85vh',
    marginTop: 20,
    elevation: 5,
  },
}
