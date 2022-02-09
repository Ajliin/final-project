import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'

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
      }}
    >
      <Button color="primary" type="submit" onClick={() => navigate('/')}>
        <Typography>FOAJÉ</Typography>
      </Button>
      <Menu />
    </Box>
  )
}

export default Header
