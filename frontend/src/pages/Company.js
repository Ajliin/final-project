import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Button,
  Typography,
  TextField,
  Container,
  Box,
  Grid,
} from '@material-ui/core'
import { LocationOnOutlined } from '@material-ui/icons'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'
import { PieChart1, PieChart2 } from '../components/PieChart'
import Modal from '../components/Modal'
import AvatarIcon from '../components/AvatarIcon'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'
import companies from '../reducers/companies'
import searchedCompany from '../reducers/searchedCompany'

const Company = () => {
  const [mode, setMode] = useState('')
  const [chosenVariable, setChosenVariable] = useState('')
  console.log('modemodemodemdeomdeomdomde', mode)

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

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (paramId === profileId) {
      setMode('profile')
      setChosenVariable('myCompany')
    } else {
      setMode('searched')
      setChosenVariable('sCompany')
    }
  }, [mode, paramId, profileId, chosenVariable])

  //if mode === profile
  useEffect(() => {
    if (mode === 'profile') {
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
            data.response.companyName,
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
                  rating: data.resonse.rating,
                  countRating: data.resonse.countRating,
                  reviews: data.resonse.reviews,
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
                  rating: data.resonse.rating,
                  countRating: data.resonse.countRating,
                  reviews: data.resonse.reviews,
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
          {mode === 'profile' ? (
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
                <Grid container spacing={2} backgroundColor={'red'}>
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
                    <p>Rating: {myCompany.rating}</p>
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
          ) : (
            // ***********************Searched Company ****************

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
                    {sCompany.companyName}
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
                      <p>{sCompany.location}</p>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <PieChart2 />
                  </Grid>
                  <Grid item xs={4}>
                    <p>Hemsida: {sCompany.url}</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p>Rating: {sCompany.rating}</p>
                  </Grid>
                  <Grid item xs={8}>
                    <p>
                      Skills eller produkter:
                      {sCompany.skills?.map((skill) => skill)}
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <Modal />
                  </Grid>
                  <Grid item xs={4}>
                    <p>
                      Beskrvning av företaget: {sCompany.companyDescription}
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </div>
      </Container>
    </>
  )
}

export default Company
