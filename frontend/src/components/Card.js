import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import { Paper, Grid, Button, Typography, Chip, Box } from '@material-ui/core'

import { LocationOnOutlined } from '@material-ui/icons'

import { PieChart3 } from './PieChart'

const Card = () => {
  const allCompanies = useSelector((store) => store.companies.companies)
  console.log('allcompanies', allCompanies[0]._id)

  const navigate = useNavigate()

  const goToCompany = (paramId, companyName) => {
    console.log('paramId on Landingpage before navigaton', paramId)
    console.log('companyname on Landingpage before navigaton', companyName)
    //dispatch(companies.actions.setSearchedCompany(companyId))
    navigate(`/company/${paramId}`)
    //navigate(`/company/${companyName}`, { state: paramId })
    // console.log(companyId)
  }

  return allCompanies?.map((company, index) => (
    <>
      <Grid key={company._id} item xs={12}>
        <Paper elevation={3}>
          <Box
            sx={{
              padding: '2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box padding={1}>
              <img
                className="img-profile"
                src={`https://source.unsplash.com/random/100x100?sig=${index}`}
              />
            </Box>
            <Box
              sx={{
                padding: '1',
                minWidth: 300,
              }}
            >
              {/* //component is what it is and variant how it looks */}
              <Typography variant="h6" component="h2">
                {company.companyName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                marginBottom={7}
              >
                <LocationOnOutlined />
                <Typography variant="subtitle2" component="h3">
                  {company.location}
                </Typography>
              </Box>
              <Box>
                {company.skills.map((skill) => {
                  if (skill === '') {
                    return
                  } else {
                    return <Chip label={skill} />
                  }
                })}
              </Box>
            </Box>
            <Box padding={1}>
              <p>Ägandestruktur: {company.genderRatio}</p>
              <PieChart3 genderRatio={company.genderRatio} />

              <Rating
                name="read-only"
                defaultValue={0} //bara value sedan
                value={company.rating}
                readOnly
                precision={0.5}
              />
              <Typography variant="subtitle2" component="h3">
                {company.rating} ({company.countRating} reviews)
              </Typography>
            </Box>
            <Box padding={1}>
              <Button
                onClick={() => goToCompany(company._id, company.companyName)}
              >
                Go to company
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  ))
}

export default Card
