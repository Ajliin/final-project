import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import { Button, Typography, TextField } from '@material-ui/core'
import LogOutBtn from '../components/LogOutBtn'

import user from '../reducers/user'
import profile from '../reducers/profile'
import company from '../reducers/company'
import AvatarIcon from '../components/AvatarIcon'

const Profile = () => {
  const [name, setName] = useState('')

  const { userId, accessToken, username, hasCompany } = useSelector(
    (store) => store.user,
  )
  const description = useSelector((store) => store.profile.description)
  const companyData = useSelector((store) => store.company.companyName)
  const companyName = useSelector((store) => store.company.companyName)
  const profileId = useSelector((store) => store.user.userId)

  console.log('userId', userId)
  console.log('username', username)
  // console.log('accessToken', accessToken)
  console.log('companyData', companyData)
  console.log('companyname', companyName)
  console.log('hasCompany', hasCompany)

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
  }, [])

  //Get companypage

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(TEST_API(`company/${profileId}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from fetch company/profile', data)
        batch(() => {
          dispatch(company.actions.setCompany(data.response))
          dispatch(company.actions.setCompanyName(data.response.companyName))
          dispatch(company.actions.setError(null))
        })
      })
  }, [dispatch, company])

  return (
    <>
      <Header />
      <AvatarIcon />
      <div>
        <p>VÄLKOMSTSIDA </p>
        <p>{username}.. </p>
        <div>
          {description &&
            description?.map((item) => (
              <>
                <p key={item.description}>{item.description}</p>
              </>
            ))}
        </div>
      </div>
      <LogOutBtn />

      {!hasCompany ? (
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => navigate('/company-sign-up')}
        >
          Sign up a new company?
        </Button>
      ) : (
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => navigate('/company')}
        >
          Go to your company
        </Button>
      )}
      {/* <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => navigate('/company')}
      >
        Go to your company
      </Button> */}
    </>
  )
}

export default Profile
