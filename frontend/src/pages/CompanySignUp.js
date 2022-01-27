import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import user from '../reducers/user'
import company from '../reducers/company'
import AvatarIcon from '../components/AvatarIcon'
import Header from '../components/Header'

const CompanySignUp = () => {
  const [companyName, setCompanyName] = useState('')
  const [genderRatio, setGenderRatio] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState([])
  const [url, setUrl] = useState('')
  const [rating, setRating] = useState('')
  const [error, setError] = useState(false)
  const [user, setUser] = useState('')
  const [mode, setMode] = useState('new')

  const errorMess = useSelector((store) => store.user.error)

  const accessToken = useSelector((store) => store.user.accessToken)

  const companyData = useSelector((store) => store.company.company)
  console.log('companyData', companyData)

  const profileId = useSelector((store) => store.user.userId)
  console.log('profileId', profileId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(profileId)
    if (companyData) {
      setMode('edit')
      setCompanyName(companyData[0].companyName)
      setGenderRatio(companyData[0].genderRatio)
      setCompanyDescription(companyData[0].companyDescription)
      setSkills(companyData[0].skills)
      setLocation(companyData[0].location)
      setUrl(companyData[0].url)
    }
  }, [user, companyData, mode])

  useEffect(() => {
    if (mode === 'done') {
      navigate('/company')
    }
  }, [mode, navigate])

  const onFormSubmit = (event) => {
    console.log('onformsubmit', mode)
    event.preventDefault()
    if (mode === 'new') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          genderRatio,
          user,
          companyDescription,
          location,
          skills,
          url,
        }),
      }

      fetch(TEST_API('company'), options)
        .then((res) => res.json())
        .then((data) => {
          console.l0g('data inside companyfetch', data)
          if (data.success) {
            batch(() => {
              dispatch(company.actions.setUsername(data.response.user))
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
      console.log('last in fetch', mode)
    } else {
      console.log('i else', mode)
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          genderRatio,
          user,
          companyDescription,
          location,
          skills,
          url,
        }),
      }

      fetch(TEST_API(`company/${profileId}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(company.actions.setUser(data.response.user))
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
      console.log('last in fetch', mode)
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
          {!companyData ? (
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
