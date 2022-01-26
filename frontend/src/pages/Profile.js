import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import { Button, Typography, TextField } from '@material-ui/core'

import user from '../reducers/user'
import profile from '../reducers/profile'

const Profile = () => {
  const [name, setName] = useState('')

  const profileId = useSelector((store) => store.user.userId)
  const accessToken = useSelector((store) => store.user.accessToken)
  const description = useSelector((store) => store.profile.description)
  console.log('profileId', profileId)
  console.log('accessToken', accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken === null) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authoriztion: accessToken,
      },
    }

    fetch(TEST_API(`profile/${profileId}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from useSeffect', data)
        // setName(data.response[0].user.username)
        console.log('desciption', data.response)
        dispatch(profile.actions.setDescription(data.response))
      })
  }, [])

  const onLogOut = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setError(null))
      dispatch(profile.actions.setDescription(null))
      //specify the data that we want to save in localStorage 'user' here
      localStorage.removeItem('user')
    })
  }

  return (
    <>
      <Header />
      <div>
        <p>Profile.. </p>
        <p>{name}.. </p>
        <div>
          {description?.map((item) => (
            <>
              {console.log(item.description)}
              <p>{item.description}</p>
            </>
          ))}
        </div>
      </div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => onLogOut()}
      >
        Log out
      </Button>

      {/* <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => onSubmitButton()}
      >
        Fetch api
      </Button> */}
    </>
  )
}

export default Profile
