import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

import {
  Button,
  Typography,
  TextField,
  Container,
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Chip,
} from '@material-ui/core'

import Stack from '@mui/material/Stack'

import Rating from '@mui/material/Rating'
import { LocationOnOutlined } from '@material-ui/icons'
import { CardContent } from '@mui/material'

import { TEST_API } from '../utils/url'
import { styles } from '../utils/theme'

import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'
import { PieChart1, PieChart2 } from '../components/PieChart'
import Modal from '../components/Modal'
import AvatarIcon from '../components/AvatarIcon'
import DoRating from '../components/DoRating'
import ImgList from '../components/ImgList'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'
import companies from '../reducers/companies'
import searchedCompany from '../reducers/searchedCompany'

const Company = () => {
  const [mode, setMode] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [test, setTest] = useState('')

  //useSelector
  const profileId = useSelector((store) => store.user.userId)
  const myCompany = useSelector((store) => store.company)
  const accessToken = useSelector((store) => store.user.accessToken)
  const sCompany = useSelector((store) => store.searchedCompany)

  //useParams
  const { paramId } = useParams()
  console.log('paramId', paramId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //useEffect
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (paramId === profileId) {
      setMode('profile')
    } else {
      setMode('searched')
    }
  }, [mode, paramId, profileId])

  //if mode === profile
  useEffect(() => {
    if (mode === 'profile') {
      //get myCompany
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }

      fetch(TEST_API(`company/${paramId}`), options)
        .then((res) => res.json())
        .then((data) => {
          console.log('Data from get company/profileid in COMPANY', data)
          console.log(
            'Data.response.companyName from get company/profileid in COMPANY',
            data.response.reviews,
          )

          if (data.success) {
            batch(() => {
              dispatch(company.actions.setUserId(data.response.userId))
              dispatch(company.actions.setCompanyId(data.response.companyId))
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
              dispatch(company.actions.setRating(data.response.rating))
              dispatch(
                company.actions.setCountRating(data.response.countRating),
              )
              dispatch(company.actions.setReviews(data.response.reviews))
              dispatch(company.actions.setError(null))
              localStorage.setItem(
                'company',
                JSON.stringify({
                  user: data.response.companyName,
                  companyId: data.response.companyName,
                  companyName: data.response.companyName,
                  companyDescription: data.response.companyDescription,
                  genderRatio: data.response.genderRatio,
                  location: data.response.location,
                  skills: data.response.skills,
                  url: data.response.url,
                  rating: data.response.rating,
                  countRating: data.response.countRating,
                  reviews: data.response.reviews,
                }),
              )
            })
          }
          //if mode === searched
          else {
            batch(() => {
              dispatch(company.actions.setCompanyId(null))
              dispatch(company.actions.setCompanyName(null))
              dispatch(company.actions.setGenderRatio(null))
              dispatch(company.actions.setCompanyDescription(null))
              dispatch(company.actions.setLocation(null))
              dispatch(company.actions.setSkills(null))
              dispatch(company.actions.setUrl(null))
              dispatch(company.actions.setRating(null))
              dispatch(company.actions.setCountRating(null))
              dispatch(company.actions.setReviews(null))
              dispatch(company.actions.setError(data.response))
            })
            //    setError(true)
          }
        })
    } else if (mode === 'searched') {
      const options2 = {
        method: 'GET',
        headers: {
          //  Authorization: accessToken,
        },
      }

      fetch(TEST_API(`company-result/${paramId}`), options2)
        .then((res) => res.json())
        .then((data) => {
          console.log('inside company.result', data)
          console.log(
            'inside company.result companyId',
            data.response.companyId,
          )
          if (data.success) {
            batch(() => {
              //  dispatch(company.actions.setUserId(data.response.newCompany.userId))
              dispatch(
                searchedCompany.actions.setCompanyId(data.response.companyId),
              )
              dispatch(
                searchedCompany.actions.setCompanyName(
                  data.response.companyName,
                ),
              )

              dispatch(
                searchedCompany.actions.setGenderRatio(
                  data.response.genderRatio,
                ),
              )
              dispatch(
                searchedCompany.actions.setCompanyDescription(
                  data.response.companyDescription,
                ),
              )
              dispatch(
                searchedCompany.actions.setLocation(data.response.location),
              )
              dispatch(searchedCompany.actions.setSkills(data.response.skills))
              dispatch(searchedCompany.actions.setUrl(data.response.url))
              dispatch(searchedCompany.actions.setRating(data.response.rating))

              dispatch(
                searchedCompany.actions.setCountRating(
                  data.response.countRating,
                ),
              )
              dispatch(
                searchedCompany.actions.setReviews(data.response.reviews),
              )
              dispatch(searchedCompany.actions.setError(null))
              localStorage.setItem(
                'searchedCompany',
                JSON.stringify({
                  user: data.response.companyName,
                  companyId: data.response.companyName,
                  companyName: data.response.companyName,
                  companyDescription: data.response.companyDescription,
                  genderRatio: data.response.genderRatio,
                  location: data.response.location,
                  skills: data.response.skills,
                  url: data.response.url,
                  rating: data.response.rating,
                  countRating: data.response.countRating,
                  reviews: data.response.reviews,
                }),
              )
            })
          } else {
            batch(() => {
              dispatch(searchedCompany.actions.setCompanyId(null))
              dispatch(searchedCompany.actions.setCompanyName(null))
              dispatch(searchedCompany.actions.setGenderRatio(null))
              dispatch(searchedCompany.actions.setCompanyDescription(null))
              dispatch(searchedCompany.actions.setLocation(null))
              dispatch(searchedCompany.actions.setSkills(null))
              dispatch(searchedCompany.actions.setUrl(null))
              dispatch(searchedCompany.actions.setRating(null))
              dispatch(searchedCompany.actions.setCountRating(null))
              dispatch(searchedCompany.actions.setReviews(null))
              dispatch(searchedCompany.actions.setError(data.response))
            })
            //    setError(true)
          }
        })
    }
  }, [dispatch, company, mode])

  return (
    <>
      <Header />
      <Container className="app-container">
        <div>
          {mode === 'searched' ? (
            // ***********************Searched Company ****************
            <>
              {/* //HEADERKORT */}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card style={styles.Card}>
                    <CardMedia style={styles.CardHeaderMedia}></CardMedia>
                    <CardContent style={styles.CardHeader}>
                      <Box
                        sx={{
                          padding: 2,
                          display: 'flex',
                        }}
                      >
                        <AvatarIcon />
                        <Box
                          sx={{
                            marginLeft: 20,
                          }}
                        >
                          <Typography variant="h4" component="h1">
                            {sCompany.companyName}
                          </Typography>
                          <Box
                            sx={{
                              padding: 2,
                              display: 'flex',
                            }}
                          >
                            <LocationOnOutlined />
                            <p>{sCompany.location}</p>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          marginLeft: 20,
                        }}
                      >
                        <PieChart2 />
                      </Box>

                      <Box
                        sx={{
                          marginLeft: 20,
                        }}
                      >
                        <Button>Kontakta mig</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  {/* SKILLSKORT */}
                  <Card style={styles.SmallCard}>
                    <Typography variant="h6" component="h2">
                      Skills eller produkter
                    </Typography>
                    <Box
                      sx={{
                        marginTop: 10,
                        display: 'flex',
                        width: '50%',
                        justifyContent: 'space-between',
                      }}
                    >
                      {sCompany.skills?.map((skill) => {
                        if (skill === '') {
                          return
                        } else {
                          return (
                            <Chip label={skill} style={styles.BgLightPurple} />
                          )
                        }
                      })}
                    </Box>
                  </Card>
                  {/* HEMSIDA */}
                  <Card style={styles.SmallCard}>
                    <p>Hemsida: {sCompany.url}</p>
                    <Box
                      sx={{
                        marginTop: 10,
                        display: 'flex',
                        width: '50%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <SocialIcon url="https://linkedin.com/" />
                      <SocialIcon url="https://instagram.com/" />
                    </Box>
                  </Card>
                  {/* RATINGKORT */}
                  <Card style={styles.SmallCard}>
                    <Rating
                      name="read-only"
                      defaultValue={0} //bara value sedan
                      value={sCompany.rating}
                      readOnly
                      precision={0.1}
                    />
                    <p>
                      Omdöme: {Math.round(sCompany.rating * 10) / 10}
                      <Button
                        onClick={() => {
                          if (showRating === true) {
                            setShowRating(false)
                          } else {
                            setShowRating(true)
                          }
                        }}
                      >
                        ({sCompany.reviews.length})
                      </Button>
                    </p>

                    <Modal />
                  </Card>
                </Grid>
                {/* BESKRIVNING AV FÖRETAG */}
                <Grid item xs={8}>
                  <Card style={styles.SmallCard}>
                    <Typography variant="h6" component="h2">
                      Beskrivning av företaget
                    </Typography>
                    <p>{sCompany.companyDescription}</p>
                  </Card>
                </Grid>

                <Grid item xs={4}></Grid>

                {/* HEMSIDA */}
                <Grid item xs={4}></Grid>
                <Grid item xs={12}>
                  {showRating && (
                    <Card style={styles.SmallCard}>
                      <p>Recension</p>

                      {sCompany.reviews &&
                        sCompany.reviews.map((review) => (
                          <Box
                            sx={{
                              padding: 10,
                              display: 'flex',
                              // justifyContent: 'space-between',
                            }}
                          >
                            <Box
                              sx={{
                                width: '20%',
                              }}
                            >
                              <Typography>Omdöme: {review.rating}</Typography>
                            </Box>
                            <Box
                              sx={{
                                width: '20%',
                              }}
                            >
                              <Typography>
                                Gjord av: {review.reviewerId}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                width: '40%',
                              }}
                            >
                              <Typography>
                                Kommentar: {review.comment}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </Card>
                  )}
                </Grid>
                <Grid>
                  <ImgList />
                </Grid>
              </Grid>
            </>
          ) : (
            // ********************MY PAGE ************''
            <>
              <Box
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Box
                  sx={{
                    marginBottom: 50,
                  }}
                >
                  <Typography variant="h3" component="h1">
                    {myCompany.companyName}
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <AvatarIcon />
                    <Box
                      sx={{
                        padding: 2,
                        display: 'flex',
                      }}
                    >
                      <LocationOnOutlined />
                      <p>{myCompany.location}</p>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <PieChart1 />
                  </Grid>
                  <Grid item xs={4}>
                    <p>Hemsida: {myCompany.url}</p>
                  </Grid>
                  <Grid item xs={4}>
                    <Rating
                      name="read-only"
                      defaultValue={0} //bara value sedan
                      value={myCompany.rating}
                      readOnly
                      precision={0.1}
                    />
                    <p>Rating: {Math.round(myCompany.rating * 10) / 10}</p>
                  </Grid>
                  <Grid item xs={8}>
                    <p>
                      Skills eller produkter:
                      {myCompany.skills?.map((skill) => skill)}
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={() => navigate('/company-form')}
                    >
                      Edit company profile
                    </Button>
                  </Grid>
                  <Grid
                    sx={{
                      padding: 2,
                      backgroundColor: 'lightgrey',
                    }}
                    item
                    xs={4}
                  >
                    <p>
                      Beskrivning av företaget: {myCompany.companyDescription}
                    </p>
                  </Grid>
                </Grid>
              </Box>

              <LogOutBtn />
            </>
          )}
        </div>
      </Container>
    </>
  )
}

export default Company
