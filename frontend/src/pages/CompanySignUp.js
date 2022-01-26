import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import user from '../reducers/user'
import company from '../reducers/company'

const CompanySignUp = () => {
  const [companyName, setCompanyName] = useState('')
  const [genderRatio, setGenderRatio] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [location, setLocation] = useState('')
  const [skills, setSkills] = useState([])
  const [url, setUrl] = useState('')
  const [rating, setRating] = useState('')
  const [error, setError] = useState(false)

  const errorMess = useSelector((store) => store.user.error)

  const accessToken = useSelector((store) => store.user.accessToken)
  const companyData = useSelector((store) => store.company.companyName)
  console.log('company', company)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (companyData) {
      navigate('/company')
    }
  }, [companyData, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        genderRatio,
        companyDescription,
        location,
        skills,
        url,
      }),
    }

    fetch(TEST_API('company'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(company.actions.setCompanyName(data.response.companyName))

            dispatch(company.actions.setGenderRatio(data.response.genderRatio))
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
            dispatch(company.actions.setCompanyDesciption(null))
            dispatch(company.actions.setLocation(null))
            dispatch(company.actions.setSkills(null))
            dispatch(company.actions.setUrl(null))
            dispatch(company.actions.setError(data.response))
          })
          setError(true)
        }
      })
  }

  return (
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
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
        {/* {mode === 'signup' ? (
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => setMode('signin')}
          >
            Already a an account?
          </Button>
        ) : (
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => setMode('signup')}
          >
            Want to become a new member?
          </Button>
        )} */}
      </form>
    </section>
  )
}

export default CompanySignUp
