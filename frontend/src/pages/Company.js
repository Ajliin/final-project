import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'

const Company = () => {
  const [companyLocal, setCompanyLocal] = useState('')
  const profileId = useSelector((store) => store.user.userId)
  console.log('profileId', profileId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector((store) => store.user.accessToken)
  useEffect(() => {
    fetch(`http://localhost:8080/company/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCompanyLocal(data.response[0].companyName)
      }, [])
  })

  useEffect(() => {
    if (accessToken === null) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  return (
    <>
      <Header />
      <div>
        <p>Company page.. </p>
        <p>{companyLocal}.. </p>
      </div>

      <LogOutBtn />
    </>
  )
}

export default Company
