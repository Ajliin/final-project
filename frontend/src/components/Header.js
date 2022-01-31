import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
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
      <Toolbar>
        <div className="nav-container">
          <Button type="submit" onClick={() => navigate('/')}>
            <Typography>FOAJÉ</Typography>
          </Button>
          <Menu />

          {/* <Button type="submit" onClick={() => navigate('/login')}>
            <AccountCircle />
          </Button> */}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
