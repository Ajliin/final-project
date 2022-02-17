import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  Card,
  CardMedia,
  Grid,
} from '@material-ui/core'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { URL_API } from '../utils/url'
import { styles } from '../utils/theme'

import Header from '../components/Header'

import user from '../reducers/user'
import company from '../reducers/company'

const CompanySignUp = () => {
  const [companyId, setCompanyId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [genderRatio, setGenderRatio] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState('')
  const [skills2, setSkills2] = useState('')
  const [skills3, setSkills3] = useState('')
  const [skills4, setSkills4] = useState('')

  const [url, setUrl] = useState('')
  // const [rating, setRating] = useState('')
  // const [countRating, setCountRating] = useState('')
  const [error, setError] = useState(false)
  const [userState, setUserState] = useState('')
  const [mode, setMode] = useState('new')
  const [hasCompany, setHasCompany] = useState('')

  //useSelector
  const hasCompanyStore = useSelector((store) => store.user.hasCompany)

  const errorMess = useSelector((store) => store.user.error)
  const companyData = useSelector((store) => store.company)

  const profileId = useSelector((store) => store.user.userId)

  const accessToken = useSelector((store) => store.user.accessToken)

  const companyStoreId = useSelector((store) => store.company.companyId)

  // end of Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setUserState(profileId)
    if (hasCompanyStore) {
      setHasCompany(true)
      setMode('edit')
      setCompanyName(companyData.companyId)
      setCompanyName(companyData.companyName)
      setGenderRatio(companyData.genderRatio)
      setCompanyDescription(companyData.companyDescription)
      setSkills(companyData.skills[0])

      setSkills2(companyData.skills[1])
      setSkills3(companyData.skills[2])
      setSkills4(companyData.skills[3])

      setLocation(companyData.location)
      setUrl(companyData.url)
    } else {
    }
  }, [hasCompany, hasCompanyStore, mode, profileId, companyData])

  useEffect(() => {
    if (accessToken === null) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (mode === 'done') {
      navigate(`/company/${profileId}`)
    }
  }, [mode, profileId, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    //Patch user and fetch if new company
    if (mode === 'new') {
      // PATCH the user

      const options2 = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hasCompany,
        }),
      }

      fetch(URL_API(`user-edit/${profileId}`), options2)
        .then((res) => res.json())
        .then((data) => {
          dispatch(user.actions.setHasCompany(data.response.hasCompany))
          setHasCompany(true)
        })

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          genderRatio,
          user: userState,
          companyDescription,
          location,
          skills: [skills, skills2, skills3, skills4],
          url,
        }),
      }

      fetch(URL_API('company'), options)
        .then((res) => res.json())
        .then((data) => {
          dispatch(company.actions.setCompanyId(data.response.companyId))
        })

      setMode('done')
    }

    //Fetch if EDIT a company
    else {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId,
          companyName,
          genderRatio,
          user: userState,
          companyDescription,
          location,
          skills: [skills, skills2, skills3, skills4],
          url,
        }),
      }

      fetch(URL_API(`company/${companyStoreId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(company.actions.setUserId(data.response.user))
              dispatch(
                company.actions.setCompanyName(data.response.companyName),
              )

              dispatch(
                company.actions.setGenderRatio(data.response.genderRatio),
              )
              dispatch(
                company.actions.setCompanyDescription(
                  data.response.companyDescription,
                ),
              )
              dispatch(company.actions.setLocation(data.response.location))
              dispatch(company.actions.setSkills(data.response.skills))
              dispatch(company.actions.setUrl(data.response.url))
              dispatch(company.actions.setError(null))
            })
          } else {
            batch(() => {
              dispatch(company.actions.setCompanyName(null))
              dispatch(company.actions.setGenderRatio(null))
              dispatch(company.actions.setCompanyDescription(null))
              dispatch(company.actions.setLocation(null))
              dispatch(company.actions.setSkills(null))
              dispatch(company.actions.setUrl(null))
              dispatch(company.actions.setError(data.response))
            })
            setError(true)
          }
        })
      setMode('done')
    }
  }

  return (
    <>
      <Header />
      <Container className="app-container" position="static" color="secondary">
        <Card style={styles.SignUpEditForm}>
          <Grid container spacing={2}>
            <Grid item xs={1} md={1}>
              <Button onClick={() => navigate(`/company/${profileId}`)}>
                <CloseRoundedIcon style={{ marginTop: '1vw' }} />
              </Button>
            </Grid>
            {/* //ramen kring */}
            <Grid item xs={11} md={5}>
              <form onSubmit={onFormSubmit}>
                {/* Containern kring formulär */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginX: '5vw',
                    marginTop: '5vh',
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: 25,
                    }}
                  >
                    {mode === 'new' ? (
                      <>
                        <Typography variant="h5" component="h2">
                          Välkommen att registrera ditt företag
                        </Typography>
                        <Typography variant="body2" component="h5">
                          Lorum ipsum
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="h5" component="h2">
                          Redigera dina uppgifter om ditt företag
                        </Typography>
                        <Typography variant="body2" component="h5">
                          Lorum ipsum
                        </Typography>
                      </>
                    )}
                  </Box>

                  <TextField
                    id="companyName"
                    label="Företagsnamn"
                    required
                    margin="normal"
                    variant="outlined"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                  />

                  <TextField
                    id="genderRatio"
                    type="text"
                    required
                    label="Ägarandel kvinnor i %"
                    margin="normal"
                    variant="outlined"
                    value={genderRatio}
                    onChange={(event) => setGenderRatio(event.target.value)}
                  />

                  <TextField
                    id="companyDescription"
                    type="text-area"
                    margin="normal"
                    multiline
                    maxRows={4}
                    label="Företagsbeskrivning"
                    variant="outlined"
                    value={companyDescription}
                    onChange={(event) =>
                      setCompanyDescription(event.target.value)
                    }
                  />

                  <TextField
                    id="location"
                    required
                    type="text"
                    margin="normal"
                    label="Plats"
                    variant="outlined"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />

                  <TextField
                    id="skills"
                    required
                    type="text"
                    margin="normal"
                    label="Skills"
                    variant="outlined"
                    value={skills}
                    onChange={(event) => setSkills(event.target.value)}
                  />
                  <TextField
                    id="skills2"
                    type="text"
                    margin="normal"
                    label="Skills "
                    variant="outlined"
                    value={skills2}
                    onChange={(event) => setSkills2(event.target.value)}
                  />
                  <TextField
                    id="skills3"
                    type="text"
                    margin="normal"
                    label="Skills "
                    variant="outlined"
                    value={skills3}
                    onChange={(event) => setSkills3(event.target.value)}
                  />
                  <TextField
                    id="skills2"
                    type="text"
                    margin="normal"
                    label="Skills "
                    variant="outlined"
                    value={skills4}
                    onChange={(event) => setSkills4(event.target.value)}
                  />

                  <TextField
                    id="url"
                    required
                    type="text"
                    label="Webb-adress"
                    margin="normal"
                    variant="outlined"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                  {!hasCompanyStore ? (
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      style={styles.BtnCompanyForm}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      style={styles.BtnCompanyForm}
                    >
                      Edit data
                    </Button>
                  )}
                </Box>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia style={styles.CompanyFormMedia}>
                <Box
                  sx={{
                    height: '110vh',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      margin: 20,
                      padding: 30,
                      backgroundColor: 'rgba(215,215, 215,0.7)',
                      color: 'black',
                    }}
                  >
                    <Typography>
                      Genom att bli medlem i FOAJÉ blir du en del av Sveriges
                      största marknadsplats för kvinnliga entreprenörer,
                      kreatörer och småföretagare.
                    </Typography>
                    <Typography>
                      Här kan du hitta och köpa produkter och tjänster från
                      företag drivna av kvinnor. Registrera ditt bolag eller dig
                      själv om du har tjänster och produkter som du vill sälja.
                      Det går att bli en säljare oavsett om du har ett bolag
                      eller är frilansare.
                    </Typography>
                  </Box>
                </Box>
              </CardMedia>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default CompanySignUp
