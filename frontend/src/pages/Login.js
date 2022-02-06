import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  Paper,
} from '@material-ui/core'

import { TEST_API } from '../utils/url'
import user from '../reducers/user'
import Header from '../components/Header'
import { styles } from '../utils/theme'

const Login = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState('signin')
  const [error, setError] = useState(false)

  const errorMess = useSelector((store) => store.user.error)

  const accessToken = useSelector((store) => store.user.accessToken)
  const { hasCompany } = useSelector((store) => store.user)

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
      body: JSON.stringify({
        firstname,
        lastname,
        password,
        email,
        hasCompany,
      }),
    }

    fetch(TEST_API(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('userdata', data)

        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setFirstname(data.response.firstname))
            dispatch(user.actions.setLastname(data.response.lastname))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setHasCompany(data.response.hasCompany))
            dispatch(user.actions.setError(null))
            //specify the data that we want to save in localStorage 'user' here
            localStorage.setItem(
              'user',
              JSON.stringify({
                userId: data.response.userId,
                firstname: data.response.firstname,
                lastname: data.response.lastname,
                email: data.response.email,
                accessToken: data.response.accessToken,
                hasCompany: data.response.hasCompany,
              }),
            )
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setFirstname(null))
            dispatch(user.actions.setLastname(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setError(data.response))
          })
          setError(true)
        }
      })
  }

  return (
    <>
      <Header />
      <Container>
        <Paper style={styles.PaperForm}>
          <Box
            sx={{
              width: '50%',
              marginTop: 50,
            }}
          >
            <form onSubmit={onFormSubmit}>
              <Box
                sx={{
                  margin: 2,
                  paddingX: 20,
                  // backgroundColor: 'beige',
                  display: 'flex',
                  flexDirection: 'column',
                  //alignItems: 'around',
                  //justifyContent: 'space-between',
                }}
              >
                {mode === 'signup' && (
                  <>
                    <TextField
                      id="firstname"
                      label="Förnamn"
                      required
                      variant="outlined"
                      value={firstname}
                      onChange={(event) => setFirstname(event.target.value)}
                    />
                    <TextField
                      id="lastname"
                      label="Efternamn"
                      required
                      variant="outlined"
                      value={lastname}
                      onChange={(event) => setLastname(event.target.value)}
                    />
                  </>
                )}

                {mode === 'signin' && (
                  <>
                    <Typography variant="h5" component="h2">
                      Välkommen tillbaka
                    </Typography>
                    <Typography variant="body3" component="h5">
                      Lorum ipsum
                    </Typography>
                  </>
                )}

                <TextField
                  id="email"
                  type="email"
                  type="email"
                  label="Email"
                  required
                  variant="outlined"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  required
                  variant="outlined"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="btn-container">
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                  {errorMess && <p color="red">{errorMess}</p>}

                  {mode === 'signup' ? (
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      onClick={() => setMode('signin')}
                    >
                      Har du redan ett konto? Logga in
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      onClick={() => setMode('signup')}
                    >
                      Vill du bli ny medlem? Signa upp
                    </Button>
                  )}
                </div>
              </Box>
            </form>
          </Box>
          <Box
            sx={{
              width: '50%',
              padding: 30,
            }}
          >
            <Typography>
              Genom att bli medlem i FOAJÉ blir du en del av Sveriges största
              marknadsplats för kvinnliga entreprenörer, kreatörer och
              småföretagare. Här kan du: Hitta och Köpa produkter och tjänster
              från företag drivna av kvinnor. Registrera ditt bolag eller dig
              själv om du har tjänster och produkter som du vill sälja. Det går
              att bli en säljare oavsett om du har ett bolag eller är
              frilansare.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default Login
