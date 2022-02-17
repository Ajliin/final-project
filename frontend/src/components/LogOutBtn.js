import React from 'react'
import { useDispatch, batch } from 'react-redux'

import { Button } from '@material-ui/core'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'

const LogOutBtn = () => {
  const dispatch = useDispatch()

  const onLogOut = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setFirstname(null))
      dispatch(user.actions.setLastname(null))
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

      dispatch(company.actions.setRating(null))

      dispatch(company.actions.setCountRating(null))
      dispatch(company.actions.setReviews(null))
      dispatch(company.actions.setError(null))

      //specify the data that we want to save in localStorage 'user' here
      localStorage.removeItem('user')
      localStorage.removeItem('company')
    })
  }
  return (
    <Button
      type="submit"
      color="primary"
      variant="outlined"
      onClick={() => onLogOut()}
    >
      Logga ut
    </Button>
  )
}

export default LogOutBtn
