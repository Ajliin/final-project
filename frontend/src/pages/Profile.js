import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import {
  Button,
  Typography,
  TextField,
  Container,
  Box,
} from '@material-ui/core'
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
          <AvatarIcon />
          <Typography variant="h5" component="h3">
            Välkommen {firstname} till Foaje!
          </Typography>
          <Typography variant="h6" component="body1">
            Din email: {email}
          </Typography>

          <p>
            Här hittar du tjänster och produkter skapade av kvinnliga
            entreprenörer, kreatörer och småföretagare.
          </p>

          <div>
            {/* {description &&
              description?.map((item) => (
                <>
                  <p key={item.description}>{item.description}</p>
                </>
              ))} */}
          </div>
        </Box>
        <LogOutBtn />

        {!hasCompany ? (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => navigate('/company-form')}
          >
            Sign up a new company?
          </Button>
        ) : (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => navigate(`/company/${userId}`)}
          >
            Go to your company
          </Button>
        )}
      </Container>
    </>
  )
}

export default Profile
