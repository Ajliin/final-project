import React, { useState } from 'react'

import { Button, Typography, TextField } from '@material-ui/core'

import Header from '../components/Header'
import AvatarIcon from '../components/AvatarIcon'
import { TEST_API } from '../utils/url'

const LandingPage = () => {
  const [user, setUser] = useState('')

  console.log(' TEST_API', TEST_API(''))

  const getData = () => {
    fetch(TEST_API(''))
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data.response[0].companyName)
      })
  }

  return (
    <div>
      <p> Hello LandingPage </p>
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
        <AvatarIcon />
      </div>
    </div>
  )
}

export default LandingPage
