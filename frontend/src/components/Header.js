import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React from 'react'

import { createTheme } from '@mui/material/styles';


const Header = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <div className="nav-container">
          <Typography>This is my final project</Typography>
          <AccountCircle />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
