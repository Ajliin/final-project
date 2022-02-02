import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Typography, TextField } from '@material-ui/core'

import { TEST_API } from '../utils/url'
import Header from '../components/Header'
import LogOutBtn from '../components/LogOutBtn'
import PieChart1 from '../components/PieChart'

import user from '../reducers/user'
import company from '../reducers/company'
import profile from '../reducers/profile'
import companies from '../reducers/companies'
import searchedCompany from '../reducers/searchedCompany'

const Company = () => {
  const [mode, setMode] = useState('')
  console.log('modemodemodemdeomdeomdomde', mode)

  const profileId = useSelector((store) => store.user.userId)
  const myCompany = useSelector((store) => store.company)
  const accessToken = useSelector((store) => store.user.accessToken)
  const sCompany = useSelector((store) => store.searchedCompany)

  const { paramId } = useParams()
  console.log('paramId', paramId)

  //const { companyId } = useSelector((store) => store.company)
  // console.log('company', companyId)

  //const { searchedCompany1 } = useSelector((store) => store.companies)
  //console.log('searchedCompany', searchedCompany1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (paramId === profileId) {
      setMode('profile')
    } else {
      setMode('searched')
    }
  }, [mode, paramId, profileId])

  console.log('modemodemodemdeomdeomdomde', mode)
  //if mode === profile
  useEffect(() => {
    if (mode === 'profile') {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      }

      fetch(TEST_API(`company/${paramId}`), options)
        .then((res) => res.json())
        .then((data) => {
          console.log('Data from get company/profileid in COMPANY', data)
          console.log(
            'Data.response.companyName from get company/profileid in COMPANY',
            data.response.getCompany[0].companyName,
          )

          if (data.success) {
            batch(() => {
              dispatch(
                company.actions.setUserId(data.response.getCompany[0].userId),
              )
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
                company.actions.setLocation(
                  data.response.getCompany[0].location,
                ),
              )
              dispatch(
                company.actions.setSkills(data.response.getCompany[0].skills),
              )
              dispatch(company.actions.setUrl(data.response.getCompany[0].url))
              dispatch(
                company.actions.setRating(data.response.getCompany[0].rating),
              )
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
          }
          //if mode === searched
          else {
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
    } else {
      const options2 = {
        method: 'GET',
        headers: {
          //  Authorization: accessToken,
        },
      }

      fetch(TEST_API(`company-result/${paramId}`), options2)
        .then((res) => res.json())
        .then((data) => {
          console.log('inside company.result', data)
          console.log(
            'inside company.result companyId',
            data.response.companyId,
          )
          if (data.success) {
            batch(() => {
              //  dispatch(company.actions.setUserId(data.response.newCompany.userId))
              dispatch(
                searchedCompany.actions.setCompanyId(data.response.companyId),
              )
              dispatch(
                searchedCompany.actions.setCompanyName(
                  data.response.companyName,
                ),
              )

              dispatch(
                searchedCompany.actions.setGenderRatio(
                  data.response.genderRatio,
                ),
              )
              dispatch(
                searchedCompany.actions.setCompanyDescription(
                  data.response.companyDescription,
                ),
              )
              dispatch(
                searchedCompany.actions.setLocation(data.response.location),
              )
              dispatch(searchedCompany.actions.setSkills(data.response.skills))
              dispatch(searchedCompany.actions.setUrl(data.response.url))
              dispatch(searchedCompany.actions.setRating(data.response.rating))
              dispatch(searchedCompany.actions.setError(null))
              localStorage.setItem(
                'searchedCompany',
                JSON.stringify({
                  user: data.response.companyName,
                  companyId: data.response.companyName,
                  companyName: data.response.companyName,
                  companyDescription: data.response.companyDescription,
                  genderRatio: data.response.genderRatio,
                  location: data.response.location,
                  skills: data.response.skills,
                  url: data.response.url,
                }),
              )
            })
          } else {
            batch(() => {
              dispatch(searchedCompany.actions.setCompanyId(null))
              dispatch(searchedCompany.actions.setCompanyName(null))
              dispatch(searchedCompany.actions.setGenderRatio(null))
              dispatch(searchedCompany.actions.setCompanyDescription(null))
              dispatch(searchedCompany.actions.setLocation(null))
              dispatch(searchedCompany.actions.setSkills(null))
              dispatch(searchedCompany.actions.setUrl(null))
              dispatch(searchedCompany.actions.setError(data.response))
            })
            //    setError(true)
          }
        })
    }
  }, [dispatch, company, mode])

  //RATE COMPANY
  const rateCompany = () => {
    const options3 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }

    fetch(TEST_API(`rating/${paramId}`), options3)
      .then((res) => res.json())
      .then((data) => {
        console.log('ratingdata!!!!!!!!!', data)
      })
  }

  return (
    <>
      <Header />
      <section className="app-container">
        <div>
          <p>FÖRETAGSSIDA.. </p>

          {mode === 'profile' ? (
            <>
              <p>Företagsnamn: {myCompany.companyName}</p>
              <p>Kvinnliga ägare: {myCompany.genderRatio} %</p>
              <PieChart1 />
              <p>Beskrvning av företaget: {myCompany.companyDescription}</p>

              <p>Location: {myCompany.location}</p>
              <p>Hemsida: {myCompany.url}</p>
              <p>Rating: {myCompany.rating}</p>
              <p>
                Skills eller produkter:
                {myCompany.skills?.map((skill) => skill)}
              </p>
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
          ) : (
            <>
              <p>Företagsnamn: {sCompany.companyName}</p>
              <p>Kvinnliga ägare: {sCompany.genderRatio} %</p>
              <PieChart1 />
              <p>Beskrvning av företaget: {sCompany.companyDescription}</p>

              <p>Location: {sCompany.location}</p>
              <p>Hemsida: {sCompany.url}</p>
              <p>Rating: {sCompany.rating}</p>
              <p>
                Skills eller produkter:
                {sCompany.skills?.map((skill) => skill)}
              </p>
            </>
          )}
          <>
            {mode === 'searched' && (
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={() => rateCompany()}
              >
                Rate this company
              </Button>
            )}

            {console.log('myCompany', myCompany)}
          </>
        </div>
      </section>
    </>
  )
}

export default Company
