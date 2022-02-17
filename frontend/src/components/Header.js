import React from 'react'
import { Typography, Container, Box, Link } from '@material-ui/core'

import { styles } from '../utils/theme'
import { useNavigate } from 'react-router-dom'

import MenuBar from './Menu'

const Header = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Box
        style={styles.HeaderStyle}
        // sx={{
        //   padding: 10,
        //   width: '100%',
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'space-between',
        // }}
      >
        <Link
          color="primary"
          type="submit"
          onClick={() => navigate('/')}
          href=""
          underline="none"
        >
          <Typography variant="h2" component="h2">
            FOAJÉ
          </Typography>
        </Link>
        <MenuBar />
      </Box>
    </Container>
  )
}

export default Header
