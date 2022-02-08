import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { styles } from '../utils/theme'

import {
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Box,
  Paper,
  Link,
  Chip,
} from '@material-ui/core'

import Stack from '@mui/material/Stack'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import { LocationOnOutlined } from '@material-ui/icons'

import Header from '../components/Header'
import AvatarIcon from '../components/AvatarIcon'
import { TEST_API } from '../utils/url'
import Card from '../components/Card'

import companies from '../reducers/companies'
import user from '../reducers/user'
import Category from '../components/Category'

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
    console.log(
      'searchSkills URL in LANDINGPAGE',
      `result-companies?companyName=${searchCompany}&&location=${searchLocation}&&skills=${searchSkills}`,
    )

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
      <Box style={styles.BackgroundImg}>
        <Paper>
          <Box
            sx={{
              marginY: 2,
              padding: 20,
              display: 'flex',
              justifyContent: 'center',
              //  backgroundColor: 'beige',
            }}
          >
            <Typography variant="h6" component="h2">
              FOAJÉ gör det lättare och roligare för dig att stötta kvinnliga
              entreprenörer kreatörer och småföretagare.
            </Typography>
          </Box>
        </Paper>

        <Box
          sx={{
            marginY: 2,
            display: 'flex',
            justifyContent: 'center',
            // paddingX: 20,
            //  backgroundColor: 'beige',
          }}
        >
          {email ? (
            <Typography color="primary" variant="h4" component="h3">
              Välkommen {firstname}!
            </Typography>
          ) : (
            <Button onClick={goToLogIn}>Log in</Button>
          )}
        </Box>

        <Box
          sx={{
            margin: 20,
            display: 'flex',
            justifyContent: 'center',
            marginY: 2,
            background: 'rgba(0,0,0,0.5)',
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Box
            sx={{
              marginX: 2,
            }}
          >
            <TextField
              id="companyName"
              label="Företag"
              InputProps={{
                startAdornment: <SearchRoundedIcon />,
              }}
              variant="outlined"
              value={searchCompany}
              onChange={(event) => setSearchCompany(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              marginX: 2,
            }}
          >
            <TextField
              id="skills"
              label="Skills eller produkter"
              InputProps={{
                startAdornment: <WorkOutlineRoundedIcon />,
              }}
              variant="outlined"
              value={searchSkills}
              onChange={(event) => setSearchSkills(event.target.value)}
            />
          </Box>

          <Box
            sx={{
              marginX: 2,
            }}
          >
            <TextField
              id="city"
              label="Location"
              InputProps={{
                startAdornment: <LocationOnOutlined />,
              }}
              variant="outlined"
              value={searchLocation}
              onChange={(event) => setSearchLocation(event.target.value)}
            />
          </Box>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={getCompanyData}
          >
            Hitta företag
          </Button>
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            marginY: 2,

            //backgroundColor: 'beige',
          }}
        >
          <Box
            sx={{
              margin: 10,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box>
              <Typography variant="h6" component="h3">
                Just nu söker många efter:
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Chip label="Web design" color="primary" variant="outlined" />
                <Chip
                  label="Frontend utvecklare"
                  color="primary"
                  variant="outlined"
                />
                <Chip label="Hantverkare" color="primary" variant="outlined" />
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" component="h3">
                Just nu finns det många:
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Chip
                  label="Trädgårsdesigner"
                  color="primary"
                  variant="outlined"
                />
                <Chip label="Undervisning" color="primary" variant="outlined" />
                <Chip label="SEO" color="primary" variant="outlined" />
              </Stack>
            </Box>
          </Box>
          <Typography variant="h6" component="h2">
            Sökresultat
          </Typography>

          {mode === '' ? (
            <p></p>
          ) : allCompanies.length === 0 ? (
            <p>Inga Foajé medlemmar matchar din efterfrågan</p>
          ) : (
            <>
              <Card />
            </>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 100,

            //backgroundColor: 'beige',
          }}
        >
          <Category category={'Kategori 1'} no={1} searchSkills={'Talking'} />
          <Category category={'Kategori 2'} no={2} />
          <Category category={'Kategori 3'} no={3} />
          <Category category={'Kategori 4'} no={4} />
          <Category category={'Kategori 5'} no={5} />
        </Box>
      </Container>
    </>
  )
}

export default LandingPage
