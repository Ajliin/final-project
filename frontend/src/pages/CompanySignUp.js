import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import user from '../reducers/user'
import company from '../reducers/company'
import AvatarIcon from '../components/AvatarIcon'
import Header from '../components/Header'
import profile from '../reducers/profile'

const CompanySignUp = () => {
  const [companyId, setCompanyId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [genderRatio, setGenderRatio] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState([])
  const [url, setUrl] = useState('')
  const [rating, setRating] = useState('')
  const [error, setError] = useState(false)
  const [userState, setUserState] = useState('')

  const hasCompany1 = useSelector((store) => store.user.hasCompany)
  console.log('hasCompany in signup', hasCompany1)

  const [mode, setMode] = useState('new')
  const [hasCompany, setHasCompany] = useState(hasCompany1)

  const errorMess = useSelector((store) => store.user.error)

  const companyData = useSelector((store) => store.company)
  console.log('companyData', companyData)

  const profileId = useSelector((store) => store.user.userId)
  console.log('profileId', profileId)

  const accessToken = useSelector((store) => store.user.accessToken)
  console.log('profileId', profileId)

  const companyStoreId = useSelector((store) => store.company.companyId)
  console.log('companyStoreId', companyStoreId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setUserState(profileId)
    if (hasCompany1) {
      setMode('edit')
      setCompanyName(companyData.companyId)
      setCompanyName(companyData.companyName)
      setGenderRatio(companyData.genderRatio)
      setCompanyDescription(companyData.companyDescription)
      setSkills(companyData.skills)
      setLocation(companyData.location)
      setUrl(companyData.url)
    } else {
      setHasCompany(true)
    }
  }, [hasCompany, mode, profileId])

  useEffect(() => {
    if (accessToken === null) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (mode === 'done') {
      navigate('/company')
    }
  }, [mode, navigate])

  const onFormSubmit = (event) => {
    console.log('onformsubmit mode', mode)
    event.preventDefault()

    //Patch user and fetch if new company
    if (mode === 'new') {
      // PATCH the user

      console.log('hasCompany inside patch', hasCompany)
      const options2 = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hasCompany,
        }),
      }

      fetch(TEST_API(`user-edit/${profileId}`), options2)
        .then((res) => res.json())
        .then((data) => {
          console.log(
            'data inside PATCH EDIT USER companyfetch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            data.response.hasCompany,
          )
          dispatch(user.actions.setHasCompany(data.response.hasCompany))
        })

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          genderRatio,
          user: userState,
          companyDescription,
          location,
          skills,
          url,
        }),
      }

      fetch(TEST_API('company'), options)
        .then((res) => res.json())
        .then((data) => {
          console.log('data inside POST new Company', data)
        })

      setMode('done')
    }

    //Fetch if EDIT a company
    else {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId,
          companyName,
          genderRatio,
          user: userState,
          companyDescription,
          location,
          skills,
          url,
        }),
      }

      fetch(TEST_API(`company/${companyStoreId}`), options)
        .then((res) => res.json())
        .then((data) => {
          console.log('PATCH COMPANY', data)
          if (data.success) {
            batch(() => {
              dispatch(company.actions.setUserId(data.response.user))
              dispatch(
                company.actions.setCompanyName(data.response.companyName),
              )

              dispatch(
                company.actions.setGenderRatio(data.response.genderRatio),
              )
              dispatch(
                company.actions.setCompanyDescription(
                  data.response.companyDescription,
                ),
              )
              dispatch(company.actions.setLocation(data.response.location))
              dispatch(company.actions.setSkills(data.response.skills))
              dispatch(company.actions.setUrl(data.response.url))
              dispatch(company.actions.setError(null))
            })
          } else {
            batch(() => {
              dispatch(company.actions.setCompanyName(null))
              dispatch(company.actions.setGenderRatio(null))
              dispatch(company.actions.setCompanyDescription(null))
              dispatch(company.actions.setLocation(null))
              dispatch(company.actions.setSkills(null))
              dispatch(company.actions.setUrl(null))
              dispatch(company.actions.setError(data.response))
            })
            setError(true)
          }
        })
      setMode('done')
    }
  }

  return (
    <>
      <Header />
      <section position="static" color="secondary">
        <form onSubmit={onFormSubmit}>
          <TextField
            id="companyName"
            label="companyName *"
            variant="outlined"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />

          <TextField
            id="genderRatio"
            type="text"
            label="Gender ratio *"
            variant="outlined"
            value={genderRatio}
            onChange={(event) => setGenderRatio(event.target.value)}
          />

          <TextField
            id="companyDescription"
            type="text-area"
            label="Company description"
            variant="outlined"
            value={companyDescription}
            onChange={(event) => setCompanyDescription(event.target.value)}
          />

          <TextField
            id="location"
            type="text"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />

          <TextField
            id="skills"
            type="text"
            label="Skills *"
            variant="outlined"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />

          <TextField
            id="url"
            type="text"
            label="Webb adress"
            variant="outlined"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          {!hasCompany1 ? (
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          ) : (
            <Button type="submit" color="secondary" variant="contained">
              Edit data
            </Button>
          )}
        </form>
      </section>
    </>
  )
}

export default CompanySignUp
