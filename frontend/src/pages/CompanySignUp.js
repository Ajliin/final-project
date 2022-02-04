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
  const [skills, setSkills] = useState('')
  const [skills2, setSkills2] = useState('')
  const [skills3, setSkills3] = useState('')
  const [skills4, setSkills4] = useState('')

  const [url, setUrl] = useState('')
  const [rating, setRating] = useState('')
  const [countRating, setCountRating] = useState('')
  const [error, setError] = useState(false)
  const [userState, setUserState] = useState('')
  const [mode, setMode] = useState('new')
  const [hasCompany, setHasCompany] = useState()

  //useSelector
  const hasCompany1 = useSelector((store) => store.user.hasCompany)
  console.log('hasCompany in signup', hasCompany1)
  const errorMess = useSelector((store) => store.user.error)

  const companyData = useSelector((store) => store.company)
  console.log('companyData', companyData)

  const profileId = useSelector((store) => store.user.userId)
  console.log('profileId', profileId)

  const accessToken = useSelector((store) => store.user.accessToken)
  console.log('profileId', profileId)

  const companyStoreId = useSelector((store) => store.company.companyId)
  console.log('companyStoreId', companyStoreId)

  // end of Hooks

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setUserState(profileId)
    if (hasCompany1) {
      setHasCompany(true)
      setMode('edit')
      setCompanyName(companyData.companyId)
      setCompanyName(companyData.companyName)
      setGenderRatio(companyData.genderRatio)
      setCompanyDescription(companyData.companyDescription)
      setSkills(companyData.skills[0])
      console.log('companyData.skills[0]', companyData.skills[0])
      setSkills2(companyData.skills[1])
      setSkills3(companyData.skills[2])
      setSkills4(companyData.skills[3])

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
      navigate(`/company/${profileId}`)
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
          skills: [skills, skills2, skills3, skills4],
          url,
          rating,
          countRating,
        }),
      }

      fetch(TEST_API('company'), options)
        .then((res) => res.json())
        .then((data) => {
          dispatch(company.actions.setCompanyId(data.response.companyId))
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
          skills: [skills, skills2, skills3, skills4],
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
      <section className="app-container" position="static" color="secondary">
        <form onSubmit={onFormSubmit}>
          <TextField
            id="companyName"
            label="Företagsnamn*"
            variant="outlined"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />

          <TextField
            id="genderRatio"
            type="text"
            label="Ägarandel kvinnor i %*"
            variant="outlined"
            value={genderRatio}
            onChange={(event) => setGenderRatio(event.target.value)}
          />

          <TextField
            id="companyDescription"
            type="text-area"
            label="Företagsbeskrivning"
            variant="outlined"
            value={companyDescription}
            onChange={(event) => setCompanyDescription(event.target.value)}
          />

          <TextField
            id="location"
            type="text"
            label="Plats"
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
            id="skills2"
            type="text"
            label="Skills "
            variant="outlined"
            value={skills2}
            onChange={(event) => setSkills2(event.target.value)}
          />
          <TextField
            id="skills3"
            type="text"
            label="Skills "
            variant="outlined"
            value={skills3}
            onChange={(event) => setSkills3(event.target.value)}
          />
          <TextField
            id="skills2"
            type="text"
            label="Skills "
            variant="outlined"
            value={skills4}
            onChange={(event) => setSkills4(event.target.value)}
          />

          <TextField
            id="url"
            type="text"
            label="Webb-adress"
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
