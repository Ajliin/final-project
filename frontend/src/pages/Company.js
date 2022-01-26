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
  const companyAllInfo = useSelector((store) => store.company)
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

    fetch(TEST_API(`company/${profileId}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCompanyLocal(data.response[0].companyName)
        dispatch(company.actions.setCompany(data.response))
        console.log('companyAllInfo', companyAllInfo)
        console.log('profileId', profileId)
      })
  }, [])

  return (
    <>
      <Header />
      <div>
        <p>Company page.. </p>
        {/* <p>{companyLocal}.. </p> */}
        {companyAllInfo?.company?.map((item) => (
          <p>{item.companyName}</p>
        ))}
      </div>

      <LogOutBtn />
    </>
  )
}

export default Company
