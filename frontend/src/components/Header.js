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
import { styles } from '../utils/theme'
import { useNavigate } from 'react-router-dom'

import Menu from './Menu'

const Header = () => {
  const navigate = useNavigate()

  return (
    <Box
      style={styles.HeaderStyle}
      sx={{
        padding: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // position: 'sticky',
        // backgroundColor: 'rgba(0,0,0,0.2)',
      }}
    >
      <Button type="submit" onClick={() => navigate('/')}>
        <Typography>FOAJÉ</Typography>
      </Button>
      <Menu />
    </Box>
  )
}

export default Header
