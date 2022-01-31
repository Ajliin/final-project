import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'
import PieChart1 from '../components/PieChart'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'

const Company = () => {
  const profileId = useSelector((store) => store.user.userId)
  const postCompany = useSelector((store) => store.company)
  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  //Get companypage

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
        console.log('Data from get company/profileid in COMPANY', data)
        console.log(
          'Data.response.companyName from get company/profileid in COMPANY',
          data.response.getCompany[0].companyName,
        )

        if (data.success) {
          batch(() => {
            //  dispatch(company.actions.setUserId(data.response.newCompany.userId))
            dispatch(
              company.actions.setCompanyId(data.response.getCompany[0]._id),
            )
            dispatch(
              company.actions.setCompanyName(
                data.response.getCompany[0].companyName,
              ),
            )

            dispatch(
              company.actions.setGenderRatio(
                data.response.getCompany[0].genderRatio,
              ),
            )
            dispatch(
              company.actions.setCompanyDescription(
                data.response.getCompany[0].companyDescription,
              ),
            )
            dispatch(
              company.actions.setLocation(data.response.getCompany[0].location),
            )
            dispatch(
              company.actions.setSkills(data.response.getCompany[0].skills),
            )
            dispatch(company.actions.setUrl(data.response.getCompany[0].url))
            dispatch(company.actions.setError(null))
            localStorage.setItem(
              'company',
              JSON.stringify({
                user: data.response.getCompany[0].companyName,
                companyId: data.response.getCompany[0].companyName,
                companyName: data.response.getCompany[0].companyName,
                companyDescription:
                  data.response.getCompany[0].companyDescription,
                genderRatio: data.response.getCompany[0].genderRatio,
                location: data.response.getCompany[0].location,
                skills: data.response.getCompany[0].skills,
                url: data.response.getCompany[0].url,
              }),
            )
          })
        } else {
          batch(() => {
            dispatch(company.actions.setCompanyId(null))
            dispatch(company.actions.setCompanyName(null))
            dispatch(company.actions.setGenderRatio(null))
            dispatch(company.actions.setCompanyDescription(null))
            dispatch(company.actions.setLocation(null))
            dispatch(company.actions.setSkills(null))
            dispatch(company.actions.setUrl(null))
            dispatch(company.actions.setError(data.response))
          })
          //    setError(true)
        }
      })
  }, [dispatch, company])

  //to the store

  return (
    <>
      <Header />
      <div>
        <p>FÖRETAGSSIDA.. </p>
        {postCompany && (
          <>
            <p>Företagsnamn: {postCompany.companyName}</p>
            <p>Kvinnliga ägare: {postCompany.genderRatio} %</p>
            <PieChart1 />
            <p>Beskrvning av företaget: {postCompany.companyDescription}</p>

            <p>Location: {postCompany.location}</p>
            <p>Hemsida: {postCompany.url}</p>
            <p>
              Skills eller produkter:{' '}
              {postCompany.skills?.map((skill) => skill)}
            </p>

            {console.log('postcompany', postCompany)}
          </>
        )}
      </div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => navigate('/company-sign-up')}
      >
        Edit company profile
      </Button>
      <LogOutBtn />
    </>
  )
}

export default Company
