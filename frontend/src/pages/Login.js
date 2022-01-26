import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import user from '../reducers/user'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState('signin')
  const [error, setError] = useState(false)

  const errorMess = useSelector((store) => store.user.error)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/profile')
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    }

    fetch(TEST_API(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(TEST_API(mode))

        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setError(null))
            //specify the data that we want to save in localStorage 'user' here
            localStorage.setItem(
              'user',
              JSON.stringify({
                userId: data.response.userId,
                username: data.response.username,
                email: data.response.email,
                accessToken: data.response.accessToken,
              }),
            )
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setError(data.response))
          })
          setError(true)
        }
      })
  }

  return (
    <section position="static" color="secondary">
      <form onSubmit={onFormSubmit}>
        {mode === 'signup' && (
          <TextField
            id="username"
            label="Username *"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        )}

        <TextField
          id="email"
          type="email"
          type="text"
          label="Email *"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Password *"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
        {mode === 'signup' ? (
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => setMode('signin')}
          >
            Already a an account?
          </Button>
        ) : (
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => setMode('signup')}
          >
            Want to become a new member?
          </Button>
        )}
      </form>
    </section>
  )
}

export default Login