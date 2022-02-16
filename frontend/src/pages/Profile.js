import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from '@material-ui/core'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

import { URL_API } from '../utils/url'
import { styles } from '../utils/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LogOutBtn from '../components/LogOutBtn'
import AvatarIcon from '../components/AvatarIcon'

import user from '../reducers/user'
import profile from '../reducers/profile'

const Profile = () => {
  const {
    userId,
    accessToken,
    firstname,
    lastname,
    hasCompany,
    email,
  } = useSelector((store) => store.user)

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

    fetch(URL_API(`profile/${userId}`), options)
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

    fetch(URL_API(`user-edit/${userId}`), options2)
      .then((res) => res.json())
      .then((data) => {
        dispatch(user.actions.setHasCompany(data.response.hasCompany))
      })
  }, [accessToken, userId, dispatch])

  return (
    <>
      <Header />
      <Container style={styles.PageContainer}>
        {/* //HEADERKORT */}
        <Card style={styles.Card}>
          <Grid container spacing={2}>
            {/* Grid img */}
            <Grid item xs={12}>
              <CardContent style={styles.ProfileCardHeader}></CardContent>
            </Grid>
            {/* Grid content */}
            <Grid item xs={12} md={6}>
              <CardContent style={styles.CardContent}>
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
                    <Typography variant="h6" component="h6">
                      Din email: {email}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
            {/* buttons inside content */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginBottom: 20,
                  marginRight: 30,
                }}
              >
                <Button
                  style={styles.ProfileBtn}
                  color="primary"
                  variant="contained"
                  onClick={goToLandingPage}
                >
                  <SearchRoundedIcon />
                  &nbsp; Sök efter företag
                </Button>

                {!hasCompany ? (
                  <Button
                    type="submit"
                    style={styles.ProfileBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/company-form')}
                  >
                    <WorkOutlineRoundedIcon />
                    &nbsp; Sign up a new company?
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    style={styles.ProfileBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => navigate(`/company/${userId}`)}
                  >
                    <WorkOutlineRoundedIcon /> &nbsp; Till ditt företag
                  </Button>
                )}
                <Button
                  style={styles.ProfileBtn}
                  color="primary"
                  variant="contained"
                >
                  <FavoriteRoundedIcon />
                  &nbsp; Sparade annonser
                </Button>
                <Button
                  style={styles.ProfileBtn}
                  color="primary"
                  variant="contained"
                >
                  Redigera dina uppgifter
                </Button>
                <LogOutBtn />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default Profile
