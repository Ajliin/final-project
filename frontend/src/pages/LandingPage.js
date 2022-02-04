import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import {
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Box,
} from '@material-ui/core'

import Header from '../components/Header'
import AvatarIcon from '../components/AvatarIcon'
import { TEST_API } from '../utils/url'
import Card from '../components/Card'

import companies from '../reducers/companies'
import user from '../reducers/user'

const LandingPage = () => {
  const [searchSkills, setSearchSkills] = useState('')
  const [searchCompany, setSearchCompany] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [mode, setMode] = useState('')

  const { email, firstname } = useSelector((store) => store.user)

  const allCompanies = useSelector((store) => store.companies.companies)
  console.log('allCompanies', allCompanies)
  const { searchedCompany } = useSelector((store) => store.companies)
  console.log('searched comapany from landingpage', searchedCompany)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setMode('')
  }, [])

  const goToLogIn = () => {
    navigate('/login')
  }

  const goToCompany = (paramId, companyName) => {
    console.log('paramId on Landingpage before navigaton', paramId)
    console.log('companyname on Landingpage before navigaton', companyName)
    //dispatch(companies.actions.setSearchedCompany(companyId))
    navigate(`/company/${paramId}`)
    //navigate(`/company/${companyName}`, { state: paramId })
    // console.log(companyId)
  }

  const getCompanyData = (event) => {
    event.preventDefault()
    setMode('searched')

    fetch(
      TEST_API(
        `result-companies?companyName=${searchCompany}&&location=${searchLocation}&&skills=${searchSkills}`,
      ),
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        //setUser(data.response[0].companyName)
        dispatch(companies.actions.setCompanies(data.response))
      })
  }

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            marginY: 5,
            paddingX: 20,
            backgroundColor: 'lightgrey',
          }}
        >
          <Typography variant="h6" component="h2">
            FOAJÉ gör det lättare och roligare för dig att stötta kvinnliga
            entreprenörer kreatörer och småföretagare.
          </Typography>
        </Box>
        <Box
          sx={{
            marginY: 2,
            paddingX: 20,
            //  backgroundColor: 'beige',
          }}
        >
          {email ? (
            <Typography variant="h5" component="h3">
              Välkommen {firstname}!
            </Typography>
          ) : (
            <Button onClick={goToLogIn}>Log in</Button>
          )}
        </Box>

        <Box
          sx={{
            margin: 2,
            paddingX: 20,
            // backgroundColor: 'beige',
            display: 'flex',

            alignItems: 'around',
            justifyContent: 'space-between',
            width: 1100,
          }}
        >
          <TextField
            id="companyName"
            label="Alla företag"
            variant="outlined"
            value={searchCompany}
            onChange={(event) => setSearchCompany(event.target.value)}
          />
          <TextField
            id="skills"
            label="Alla skills"
            variant="outlined"
            value={searchSkills}
            onChange={(event) => setSearchSkills(event.target.value)}
          />
          <TextField
            id="city"
            label="Hela Sverige"
            variant="outlined"
            value={searchLocation}
            onChange={(event) => setSearchLocation(event.target.value)}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={getCompanyData}
          >
            Hitta företag
          </Button>
        </Box>

        <Box
          sx={{
            marginY: 2,
            paddingX: 20,
            //backgroundColor: 'beige',
          }}
        >
          <Typography variant="h6" component="h2">
            Sökresultat:
          </Typography>
          {mode === '' ? (
            <p>sök efter något!</p>
          ) : allCompanies.length === 0 ? (
            <p>Inga Foajé medlemmar matchar din efterfrågan</p>
          ) : (
            <>
              <Grid container spacing={3}>
                <Card />
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

export default LandingPage
