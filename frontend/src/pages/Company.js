import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { SocialIcon } from 'react-social-icons'

import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  Chip,
  List,
} from '@material-ui/core'

import Rating from '@mui/material/Rating'
import { LocationOnOutlined } from '@material-ui/icons'
import { CardContent } from '@mui/material'

//import uniqid from 'uniqid'

import { URL_API } from '../utils/url'
import { styles } from '../utils/theme'

import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'
import { PieChart1, PieChart2 } from '../components/PieChart'
import Modal from '../components/Modal'
import ImgList from '../components/ImgList'
import Footer from '../components/Footer'

import company from '../reducers/company'
import searchedCompany from '../reducers/searchedCompany'

const Company = () => {
  const [mode, setMode] = useState('')
  const [showRating, setShowRating] = useState(false)

  //useSelector
  const profileId = useSelector((store) => store.user.userId)
  const myCompany = useSelector((store) => store.company)
  const accessToken = useSelector((store) => store.user.accessToken)
  const sCompany = useSelector((store) => store.searchedCompany)

  //useParams
  const { paramId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //useEffects
  useEffect(() => {
    if (accessToken === null) {
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

      fetch(URL_API(`company/${paramId}`), options)
        .then((res) => res.json())
        .then((data) => {
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
                  companyId: data.response.companyId,
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
          }
        })
    } else if (mode === 'searched') {
      const options2 = {
        method: 'GET',
        headers: {
          //  Authorization: accessToken,
        },
      }

      fetch(URL_API(`company-result/${paramId}`), options2)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
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
          }
        })
    }
  }, [dispatch, accessToken, paramId, mode])
  // console.log(uniqid())
  return (
    <>
      <Header />
      <Container className="app-container">
        {mode === 'searched' ? (
          // ***********************Searched Company ****************
          <>
            <Grid container spacing={2}>
              {/* //HEADER Card */}
              <Grid item xs={12}>
                <Card style={styles.Card}>
                  <CardContent style={styles.CardHeaderMedia}></CardContent>
                  <CardContent style={styles.CardContent}>
                    <Grid container spacing={4}>
                      <Grid item xs={6} md={3}>
                        <img
                          className="img-profile"
                          src={`https://source.unsplash.com/random/150x150?sig=7`}
                          alt=" profile"
                        />
                      </Grid>
                      <Grid item xs={5} md={3}>
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
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <PieChart2 />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Button>Kontakta mig</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* SKILLS Card */}
              <Grid item xs={12} md={4}>
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
                      flexWrap: 'wrap',
                    }}
                  >
                    {sCompany.skills?.map((skill, index) => {
                      if (skill === '') {
                        return null
                      } else {
                        return (
                          <Chip
                            key={skill}
                            label={skill}
                            style={styles.BgLightPurple}
                          />
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
                    defaultValue={0} //0 ratings
                    value={sCompany.rating}
                    readOnly
                    precision={0.1}
                  />
                  <Typography>
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
                  </Typography>
                  {/* //Rating modal*/}
                  <Modal />
                </Card>
              </Grid>
              {/* Company Description Card */}
              <Grid item xs={12} md={8}>
                <Card style={styles.SmallCard}>
                  <Typography variant="h6" component="h2">
                    Beskrivning av företaget
                  </Typography>
                  <p>{sCompany.companyDescription}</p>
                </Card>
              </Grid>

              {/* show Ratings*/}
              <Grid item xs={12}>
                {showRating && (
                  <Card style={styles.SmallCard}>
                    <p>Recension</p>

                    {sCompany.reviews &&
                      sCompany.reviews.map((review, index) => (
                        <List
                          key={index}
                          sx={{
                            padding: 10,
                            display: 'flex',
                          }}
                        >
                          {console.log('review sCompany key', index)}
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
                            <Typography>Kommentar: {review.comment}</Typography>
                          </Box>
                        </List>
                      ))}
                  </Card>
                )}
              </Grid>
              {/* Grid with images */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ImgList />
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          // ********************MY PAGE ************''
          <>
            <Grid container spacing={2}>
              {/* //HEADER Card */}
              <Grid item xs={12}>
                <Card style={styles.Card}>
                  <CardContent style={styles.CardHeaderMedia}></CardContent>
                  <CardContent style={styles.CardContent}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <img
                          className="img-profile"
                          src={`https://source.unsplash.com/random/150x150?sig=7`}
                          alt="Profile of my company  "
                        />
                      </Grid>
                      <Grid item xs={5} md={3}>
                        <Typography variant="h4" component="h1">
                          {myCompany.companyName}
                        </Typography>
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

                      <Grid item xs={6} md={3}>
                        <PieChart1 />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Box
                          sx={{
                            marginLeft: 20,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            style={styles.h6Space}
                            onClick={() => navigate('/company-form')}
                          >
                            Redigera
                          </Button>
                          <LogOutBtn />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* SKILLS Card */}
              <Grid item xs={12} md={4}>
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
                      flexWrap: 'wrap',
                    }}
                  >
                    {myCompany.skills?.map((skill, index) => {
                      if (skill === '') {
                        return null
                      } else {
                        return (
                          <Chip
                            key={skill}
                            label={skill}
                            style={styles.BgLightPurple}
                          />
                        )
                      }
                    })}
                  </Box>
                </Card>
                {/* HEMSIDA */}
                <Card style={styles.SmallCard}>
                  <p>Hemsida: {myCompany.url}</p>
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
                    defaultValue={0} //0 ratings
                    value={myCompany.rating}
                    readOnly
                    precision={0.1}
                  />

                  <p>Omdöme: {Math.round(myCompany.rating * 10) / 10}</p>
                </Card>
              </Grid>
              {/* Company Description Card */}
              <Grid item xs={12} md={8}>
                <Card style={styles.SmallCard}>
                  <Typography variant="h6" component="h2">
                    Beskrivning av företaget
                  </Typography>
                  <p>{myCompany.companyDescription}</p>
                </Card>
              </Grid>

              {/* webpage and social media */}

              {/* Grid with images */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ImgList />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>

      <Footer />
    </>
  )
}

export default Company
