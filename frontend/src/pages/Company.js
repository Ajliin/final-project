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
  const companyAllInfo = useSelector((store) => store.company.company)
  const {
    companyName,
    genderRatio,
    companyDescription,
    location,
    skills,
    url,
  } = useSelector((store) => store.company)
  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }
  })
  return (
    <>
      <Header />
      <div>
        {companyAllInfo && (
          <>
            <p> {companyAllInfo[0]?.companyName} </p>
            <p> {companyAllInfo[0]?.companyDescription} </p>
            <p> {companyAllInfo[0]?.genderRatio} </p>
            <p> {companyAllInfo[0]?.location} </p>
            <p> {companyAllInfo[0]?.url} </p>
            <p> {companyAllInfo[0]?.skills?.map((skill) => skill)} </p>
          </>
        )}
        <p>Company page.. </p>
        {/* <p>{companyLocal}.. </p> */}

        {/* {companyName?.map((item) => (
          <p>{item}</p>
        ))} */}
      </div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => navigate('/company-sign-up')}
      >
        Edit profile
      </Button>
      <LogOutBtn />
    </>
  )
}

export default Company
