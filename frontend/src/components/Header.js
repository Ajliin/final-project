import React from 'react'
import { Typography, Container, Box, Link, MenuItem } from '@material-ui/core'

import { styles } from '../utils/theme'
import { useNavigate } from 'react-router-dom'

import MenuBar from './Menu'

const Header = () => {
  const navigate = useNavigate()

  const goToLandingPage = () => {
    navigate('/')
  }

  return (
    <Container>
      <Box style={styles.HeaderStyle}>
        <MenuItem
          color="primary"
          //type="submit"
          onClick={() => goToLandingPage()}
        >
          <Typography variant="h2" component="h2">
            FOAJÉ
          </Typography>
        </MenuItem>
        <MenuBar />
      </Box>
    </Container>
  )
}

export default Header
