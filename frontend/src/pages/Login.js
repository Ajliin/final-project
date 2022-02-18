import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  Link,
  Card,
  CardMedia,
  Grid,
} from '@material-ui/core'

import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'

import { URL_API } from '../utils/url'
import { styles } from '../utils/theme'

import user from '../reducers/user'
import Header from '../components/Header'

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

    fetch(URL_API(mode), options)
      .then((res) => res.json())
      .then((data) => {
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
        <Card style={styles.PaperForm}>
          {/* //ramen kring */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} style={styles.GridLogin}>
              <form onSubmit={onFormSubmit} autoComplete="off">
                {/* Containern kring inlogging */}

                <Box
                  sx={{
                    marginBottom: 35,
                  }}
                >
                  {mode === 'signin' ? (
                    <>
                      <Typography variant="h5" component="h2">
                        Välkommen tillbaka
                      </Typography>
                      <Typography variant="body2" component="h5">
                        Lorum ipsum
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" component="h2">
                        Välkommen till Foajé!
                      </Typography>
                      <Typography variant="body2" component="h5">
                        Lorum ipsum
                      </Typography>
                    </>
                  )}
                </Box>

                {/* Container for form */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginBottom: 20,
                  }}
                >
                  {mode === 'signup' && (
                    <>
                      <TextField
                        style={styles.InputText}
                        id="firstname"
                        label="Förnamn"
                        variant="outlined"
                        autoComplete="off"
                        InputProps={{
                          startAdornment: (
                            <PersonOutlineRoundedIcon
                              style={{ marginRight: 5 }}
                            />
                          ),
                        }}
                        margin="normal"
                        required
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                      />
                      <TextField
                        id="lastname"
                        label="Efternamn"
                        autoComplete="off"
                        InputProps={{
                          startAdornment: (
                            <PersonOutlineRoundedIcon
                              style={{
                                marginRight: 5,
                              }}
                            />
                          ),
                        }}
                        margin="normal"
                        required
                        variant="outlined"
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                      />
                    </>
                  )}

                  <TextField
                    id="email"
                    type="email"
                    label="Email"
                    autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <MailOutlineRoundedIcon style={{ marginRight: 5 }} />
                      ),
                    }}
                    margin="normal"
                    required
                    variant="outlined"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <TextField
                    id="password"
                    type="password"
                    label="Password "
                    InputProps={{
                      startAdornment: (
                        <VpnKeyRoundedIcon style={{ marginRight: 5 }} />
                      ),
                    }}
                    required
                    variant="outlined"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Box>
                <Box>
                  {mode === 'signup' ? (
                    <>
                      <Button
                        style={styles.LoginBtn}
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Sign up
                      </Button>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}
                      >
                        <Typography>Är du redan medlem? </Typography>
                        <Link
                          // href=""
                          underline="hover"
                          onClick={() => setMode('signin')}
                        >
                          Log in
                        </Link>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Button
                        style={styles.LoginBtn}
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Logga in
                      </Button>
                      {errorMess && (
                        <Typography style={styles.ErrorText}>
                          {errorMess}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}
                      >
                        <Typography>Vill du bli medlem? </Typography>
                        <Link
                          underline="hover"
                          //href=""
                          onClick={() => setMode('signup')}
                        >
                          Sign up
                        </Link>
                      </Box>
                    </>
                  )}
                </Box>
              </form>
            </Grid>

            <Grid item xs={12} md={6}>
              <CardMedia style={styles.CardLoginMedia}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      margin: 20,
                      padding: 30,
                      backgroundColor: 'rgba(228,228,206,0.95)',
                      color: 'black',
                    }}
                  >
                    <Typography>
                      Genom att bli medlem i FOAJÉ blir du en del av Sveriges
                      största marknadsplats för kvinnliga entreprenörer,
                      kreatörer och småföretagare.
                    </Typography>
                    <Typography>
                      Här kan du hitta och köpa produkter och tjänster från
                      företag drivna av kvinnor. Registrera ditt bolag eller dig
                      själv om du har tjänster och produkter som du vill sälja.
                      Det går att bli en säljare oavsett om du har ett bolag
                      eller är frilansare.
                    </Typography>
                  </Box>
                </Box>
              </CardMedia>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default Login
