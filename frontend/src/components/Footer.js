import { Typography, Box, Grid, Container } from '@material-ui/core'

import { styles } from '../utils/theme'

const Footer = () => {
  return (
    <footer>
      <Box style={styles.FooterStyle}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
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
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
