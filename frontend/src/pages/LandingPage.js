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
import Card from '../components/Card'
import Footer from '../components/Footer'
import Category from '../components/Category'

import { URL_API } from '../utils/url'

import companies from '../reducers/companies'

const LandingPage = () => {
  const [searchSkills, setSearchSkills] = useState('')
  const [searchCompany, setSearchCompany] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [mode, setMode] = useState('')

  const { email, firstname } = useSelector((store) => store.user)

  const allCompanies = useSelector((store) => store.companies.companies)

  const category1 = useSelector((store) => store.companies.category)

  const { searchedCompany } = useSelector((store) => store.companies)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (category1) {
      setMode('category')
    } else {
      setMode('')
    }
  }, [category1])

  const getCompanyData = (event) => {
    event.preventDefault()
    setMode('searched')

    fetch(
      URL_API(
        `result-companies?companyName=${searchCompany}&&location=${searchLocation}&&skills=${searchSkills}`,
      ),
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(companies.actions.setCompanies(data.response))
      })
  }

  return (
    <Box
      sx={{
        backgroundColor: '#cab9ed',
      }}
    >
      <Box style={styles.BackgroundImg}>
        <Header />
        <Box
          minWidth={700}
          maxWidth={900}
          marginTop={'25vh'}
          marginLeft={'25vw'}
        >
          {/* // <Paper> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '&hover': { backgroundColor: 'red' },
              paddingRight: 20,
              marginRight: 20,
            }}
          >
            <Typography
              variant="h3"
              style={styles.Typo1}
              component="body1"
              fontWeight={700}
            >
              Sveriges största marknadsplats för kvinnliga entreprenörer,
              kreatörer och småföretagare
              <Box component="span" style={styles.TypoBright}>
                &nbsp;!
              </Box>
            </Typography>
          </Box>
          {/* // </Paper> */}
          <Box
            sx={{
              marginY: '1vh',
              display: 'flex',
              //justifyContent: 'center',
            }}
          >
            {email ? (
              <Typography style={styles.Typo1} variant="h5" component="h4">
                Välkommen {firstname}
              </Typography>
            ) : (
              <Typography style={styles.Typo2} variant="h5" component="h4">
                Välkommen till Foajé
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginY: 2,
              marginRight: 20,
              background: 'rgba(215,215,215,0.5)',
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
                autoComplete="off"
                label="Företag"
                InputProps={{
                  startAdornment: (
                    <SearchRoundedIcon style={{ marginRight: 5 }} />
                  ),
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
                autoComplete="off"
                label="Skills"
                InputProps={{
                  startAdornment: (
                    <WorkOutlineRoundedIcon style={{ marginRight: 5 }} />
                  ),
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
                autoComplete="off"
                label="Location"
                InputProps={{
                  startAdornment: (
                    <LocationOnOutlined style={{ marginRight: 5 }} />
                  ),
                }}
                variant="outlined"
                value={searchLocation}
                onChange={(event) => setSearchLocation(event.target.value)}
              />
            </Box>

            <Button
              type="submit"
              color="primary"
              marginRight={10}
              variant="contained"
              onClick={getCompanyData}
            >
              <SearchRoundedIcon />
              &nbsp;SÖK&nbsp;&nbsp;&nbsp;
            </Button>
          </Box>
        </Box>
      </Box>
      <Container>
        <Box
          sx={
            {
              // marginY: 2,
              //backgroundColor: 'beige',
              // backgroundColor: '#ff7043',
            }
          }
        >
          {/********************  SEARCH ***************/}
          {mode !== '' &&
            (allCompanies.length === 0 ? (
              <Typography style={styles.Typo1} variant="h5" component="h4">
                Inga Foajé medlemmar matchar din efterfrågan
              </Typography>
            ) : (
              <>
                <Card />
              </>
            ))}

          <Box
            sx={{
              marginY: 5,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box>
              <Typography variant="h6" component="h3" style={styles.h6Space}>
                Just nu söker många efter
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Chip label="Web design" style={styles.BgLightPurple} />
                <Chip
                  label="Frontend utvecklare"
                  style={styles.BgLightPurple}
                />
                <Chip label="Elektriker" style={styles.BgLightPurple} />
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" component="h3" style={styles.h6Space}>
                Just nu finns det många
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Chip label="Trädgårsdesigner" style={styles.BgLightPurple} />
                <Chip label="Sömmerska" style={styles.BgLightPurple} />
                <Chip label="SEO/SME" style={styles.BgLightPurple} />
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginY: 6,

              //backgroundColor: 'beige',
            }}
          >
            <Category category={'Business'} no={1} searchSkills={'SEO'} />
            <Category
              category={'Programmering & Design'}
              no={2}
              searchSkills={'programmering'}
            />
            <Category category={'Hem & Hus'} no={3} searchSkills={'trädgård'} />
            <Category category={'Träning & Hälsa'} no={4} searchSkills={'pt'} />
            <Category
              category={'Hantverk & Bild'}
              no={5}
              searchSkills={'snickrare'}
            />
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default LandingPage
