import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { TEST_API } from '../utils/url'
import { styles } from '../utils/theme'
import Header from '../components/Header'
import {
  Button,
  Typography,
  TextField,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { LocationOnOutlined } from '@material-ui/icons'

import LogOutBtn from '../components/LogOutBtn'

import user from '../reducers/user'
import profile from '../reducers/profile'
import company from '../reducers/company'
import AvatarIcon from '../components/AvatarIcon'

const Profile = () => {
  const {
    userId,
    accessToken,
    firstname,
    lastname,
    hasCompany,
    email,
  } = useSelector((store) => store.user)
  const description = useSelector((store) => store.profile.description)

  const { companyName } = useSelector((store) => store.company)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken === null) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  const goToLandingPage = () => {
    navigate('/')
  }

  //Get profilepage
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(TEST_API(`profile/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(profile.actions.setDescription(data.response))
      })

    //get userData
    const options2 = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(TEST_API(`user-edit/${userId}`), options2)
      .then((res) => res.json())
      .then((data) => {
        dispatch(user.actions.setHasCompany(data.response.hasCompany))
      })
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Box>
          <div>
            {/* {description &&
              description?.map((item) => (
                <>
                  <p key={item.description}>{item.description}</p>
                </>
              ))} */}
          </div>
        </Box>

        {/* //HEADERKORT */}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={styles.Card}>
              <CardMedia style={styles.CardHeaderMedia}></CardMedia>
              <Grid item xs={12}>
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
                      <Typography variant="h5" component="h3">
                        Välkommen {firstname} {lastname} till Foaje!
                      </Typography>
                      <Typography variant="h6" component="body1">
                        Din email: {email}
                      </Typography>
                      <Box
                        sx={{
                          padding: 2,
                          display: 'flex',
                        }}
                      >
                        <LocationOnOutlined />
                        Location
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: 400,
                    }}
                  >
                    <Button
                      style={{ margin: 10 }}
                      color="primary"
                      variant="contained"
                      onClick={goToLandingPage}
                    >
                      Sök efter företag
                    </Button>

                    {!hasCompany ? (
                      <Button
                        type="submit"
                        style={{ margin: 10 }}
                        color="primary"
                        variant="contained"
                        onClick={() => navigate('/company-form')}
                      >
                        Sign up a new company?
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        style={{ margin: 10 }}
                        color="primary"
                        variant="contained"
                        onClick={() => navigate(`/company/${userId}`)}
                      >
                        Go to your company
                      </Button>
                    )}
                    <Button
                      style={{ margin: 10 }}
                      color="primary"
                      variant="contained"
                    >
                      Dina sparade annonser
                    </Button>
                    <Button
                      style={{ margin: 10 }}
                      color="primary"
                      variant="contained"
                    >
                      Redigera dina uppgifter
                    </Button>
                    <LogOutBtn />
                  </Box>
                </Box>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
