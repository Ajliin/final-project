import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
//import { theme } from '../utils/theme'
import { useNavigate } from 'react-router-dom'

import Menu from './Menu'

const Header = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Toolbar>
          <Box
            sx={{
              padding: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button type="submit" onClick={() => navigate('/')}>
              <Typography>FOAJÉ</Typography>
            </Button>
            <Menu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
