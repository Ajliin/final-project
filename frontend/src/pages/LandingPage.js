import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button, Typography, TextField } from '@material-ui/core'

import Header from '../components/Header'
import AvatarIcon from '../components/AvatarIcon'
import { TEST_API } from '../utils/url'

import companies from '../reducers/companies'
import user from '../reducers/user'

const LandingPage = () => {
  //const [user, setUser] = useState('')

  const { firstname } = useSelector((store) => store.user)

  const allCompanies = useSelector((store) => store.companies)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToLogIn = () => {
    navigate('/login')
  }

  const getData = () => {
    fetch(TEST_API('allcompanies'))
      .then((res) => res.json())
      .then((data) => {
        // setUser(data.response[0].companyName)
        dispatch(companies.actions.setCompanies(data.response))
      })
  }

  return (
    <section className="landing-page-container">
      <Header />
      <div className="intro-text">
        <Typography variant="h6" component="h6">
          FOAJÉ gör det lättare och roligare för dig att stötta kvinnliga
          entreprenörer kreatörer och småföretagare.
        </Typography>
      </div>
      <div>
        {firstname ? (
          <Typography variant="h4" component="h4">
            Välkommen {firstname}!
          </Typography>
        ) : (
          <Button onClick={goToLogIn}>Log in</Button>
        )}

        <div className="search-container">
          <TextField id="skills" label="Skills" variant="outlined" />
          <TextField id="city" label="City" variant="outlined" />
          <Button color="secondary" variant="contained" onClick={getData}>
            Hitta
          </Button>
        </div>
        <div></div>
        {/* <div className="category-container">
          <AvatarIcon />
        </div> */}
        <div>
          <p>Sökresultat:</p>
          {allCompanies?.companies?.map((company) => (
            <p key={company._id}>{company.companyName}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingPage
