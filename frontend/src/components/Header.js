import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React from 'react'

import { createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <div className="nav-container">
          <Typography>FOAJÉ</Typography>

          <Button type="submit" onClick={() => navigate('/login')}>
            <AccountCircle />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
