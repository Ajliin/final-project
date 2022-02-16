import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, batch, useSelector } from 'react-redux'

import company from '../reducers/company'
import user from '../reducers/user'
import profile from '../reducers/profile'

const MenuBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userId, hasCompany } = useSelector((store) => store.user)

  const [anchorEl, setAnchorEl] = useState(null)

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

      localStorage.removeItem('user')
      localStorage.removeItem('profile')
      localStorage.removeItem('company')
    })
  }

  return (
    <Box>
      {!userId ? (
        <Button color="primary" variant="outlined" onClick={goToLogIn}>
          Logga in
        </Button>
      ) : (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircle
              color="primary"
              variant="outlined"
              sx={{ fontSize: 100 }}
            />
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
            <Box>
              <MenuItem onClick={() => goToLandingPage()}>Sök</MenuItem>
              <MenuItem onClick={() => goToProfile()}>Min profil</MenuItem>
              {hasCompany && (
                <MenuItem onClick={() => goToCompanyPage()}>
                  Mitt företag
                </MenuItem>
              )}
              <MenuItem onClick={() => goToLogOut()}>Logout</MenuItem>
            </Box>
          </Menu>
        </>
      )}
    </Box>
  )
}

export default MenuBar
