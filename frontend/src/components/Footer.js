import react from 'react'
import { Typography, Box, Link, Grid, Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import companies from '../reducers/companies'
import { TEST_API } from '../utils/url'

import { styles } from '../utils/theme'

const Footer = ({ category, no, searchSkills }) => {
  console.log('categoryName', category)
  //console.log('searchSkills', searchSkills)

  const dispatch = useDispatch()

  return (
    <footer>
      <Box
        sx={{
          color: 'white',
          background: 'grey',
          padding: 20,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box
                sx={{
                  padding: 10,
                }}
              >
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box> */}
            {/* <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box> */}
            <Box
              sx={{
                paddingY: 2,
              }}
            >
              <Typography>FOAJÉ &reg; {new Date().getFullYear()}</Typography>
              <Typography>Östgötagatan 66</Typography>
              <Typography>116 64 Stockholm</Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid> */}
          {/* </Grid> */}
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
