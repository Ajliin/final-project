import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, batch, useSelector } from 'react-redux'

import company from '../reducers/company'
import user from '../reducers/user'
import profile from '../reducers/profile'

export default function BasicMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [mode, setMode] = useState('login')
  const { userId, hasCompany } = useSelector((store) => store.user)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToLandingPage = () => {
    navigate('/')
  }
  const goToProfile = () => {
    navigate('/profile')
  }

  const goToCompanyPage = () => {
    navigate(`/company/${userId}`)
  }

  const goToLogIn = () => {
    navigate('/login')
  }

  const goToLogOut = () => {
    batch(() => {
      dispatch(user.actions.setFirstname(null))
      dispatch(user.actions.setLastname(null))
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setHasCompany(null))
      dispatch(user.actions.setError(null))
      dispatch(profile.actions.setDescription(null))
      dispatch(company.actions.setCompanyId(null))
      dispatch(company.actions.setUserId(null))
      dispatch(company.actions.setCompanyName(null))
      dispatch(company.actions.setGenderRatio(null))
      dispatch(company.actions.setCompanyDescription(null))
      dispatch(company.actions.setLocation(null))
      dispatch(company.actions.setSkills(null))
      dispatch(company.actions.setUrl(null))
      // dispatch(company.actions.setError(data.response))

      //specify the data that we want to save in localStorage 'user' here
      localStorage.removeItem('user')
      localStorage.removeItem('profile')
      localStorage.removeItem('company')
    })
  }

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircle color="secondary" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={goToLandingPage}>Sök</MenuItem>

        {!userId ? (
          <MenuItem onClick={goToLogIn}>Login</MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={goToProfile}>Min profil</MenuItem>
            {hasCompany && (
              <MenuItem onClick={goToCompanyPage}>Mitt företag</MenuItem>
            )}
            <MenuItem onClick={goToLogOut}>Logout</MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  )
}
