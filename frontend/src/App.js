import React, { useState } from 'react'
import './App.css'
import { Button, Typography, TextField } from '@material-ui/core'
import { Avatar } from '@mui/material'
//import { Avatar } from '@material-ui/icons'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Header from './components/Header'

const stringToColor = (string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

function App() {
  const [user, setUser] = useState('')

  const getData = () => {
    fetch('http://localhost:8080/user/61ed072a059ee544eeb84209')
      .then((res) => res.json())
      .then((data) => setUser(data.response.username))
  }

  return (
    <div className="App">
      <Header />
      <Typography variant="h2" component="h2">
        Yeah {user}, yeah!
      </Typography>
      <div className="search-container">
        <TextField id="skills" label="Skills" variant="outlined" />
        <TextField id="city" label="City" variant="outlined" />
        <Button color="secondary" variant="contained" onClick={getData}>
          Hitta
        </Button>
      </div>
      <Typography variant="p" component="p">
        Let us talk about this
      </Typography>
      <Avatar {...stringAvatar('Kent Dodds')} />
      <Avatar {...stringAvatar('Jed Watson')} />
      <Avatar {...stringAvatar('Tim Neutkens')} />
    </div>
  )
}

export default App
