import React, { useState } from 'react'

import { Button, Typography, TextField } from '@material-ui/core'

import Header from '../components/Header'
import AvatarIcon from '../components/AvatarIcon'
import { TEST_API } from '../utils/url'

const LandingPage = () => {
  const [user, setUser] = useState('')

  console.log(' TEST_API', TEST_API(''))

  const getData = () => {
    fetch(TEST_API('allcompanies'))
      .then((res) => res.json())
      .then((data) => {
        setUser(data.response[0].companyName)
      })
  }

  return (
    <section className="landing-page-container">
      <Header />
      <div className="intro-text">
        <Typography variant="h4" component="h4">
          FOAJÉ works as a commercial space where woman can sell and buy
          products and services to and from each other. At FOAJÉ you are of
          course also welcome only to be a part of the community and search for
          services and products sold on the platform from female entrepreneurs.
        </Typography>
      </div>
      <div>
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
        <div>
          <p>Let us talk about this</p>
        </div>
        <div className="category-container">
          <AvatarIcon />
        </div>
      </div>
    </section>
  )
}

export default LandingPage