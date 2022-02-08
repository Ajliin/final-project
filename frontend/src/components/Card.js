import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import { Paper, Grid, Button, Typography, Chip, Box } from '@material-ui/core'
import Stack from '@mui/material/Stack'

import { LocationOnOutlined } from '@material-ui/icons'

import { PieChart3 } from './PieChart'
import { styles } from '../utils/theme'

const Card = () => {
  const allCompanies = useSelector((store) => store.companies.companies)

  const navigate = useNavigate()

  const goToCompany = (paramId, companyName) => {
    console.log('paramId on Landingpage before navigaton', paramId)
    console.log('companyname on Landingpage before navigaton', companyName)
    //dispatch(companies.actions.setSearchedCompany(companyId))
    navigate(`/company/${paramId}`)
    //navigate(`/company/${companyName}`, { state: paramId })
    // console.log(companyId)
  }

  let ratingDec = 0

  return (
    <>
      <Grid>
        <Box>
          {allCompanies?.map((company, index) => (
            <>
              {/* //whole card */}
              <Paper key={company._id} elevation={1} style={styles.Paper}>
                <Grid item xs={4}>
                  {/* Picture  */}
                  <Box>
                    <img
                      className="img-profile"
                      src={`https://source.unsplash.com/random/150x150?sig=${index}`}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  {/* Name, location and rating */}
                  <Box
                    sx={{
                      marginLeft: 20,
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
                      marginBottom={4}
                    >
                      <LocationOnOutlined />
                      <Typography variant="subtitle2" component="h3">
                        {company.location}
                      </Typography>
                    </Box>
                    <Rating
                      name="read-only"
                      defaultValue={0} //bara value sedan
                      value={company.rating}
                      readOnly
                      precision={0.1}
                    />
                    <Typography variant="subtitle2" component="h3">
                      {Math.round(company.rating * 10) / 10} (
                      {company.countRating} reviews)
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  {/* Skills  */}
                  <Box
                    sx={{
                      marginLeft: 50,
                      width: 200,
                    }}
                  >
                    <Typography variant="subtitle2" component="h3">
                      Skills
                    </Typography>
                    <Box>
                      {company.skills.map((skill) => {
                        if (skill === '') {
                          return
                        } else {
                          return (
                            <Chip
                              label={skill}
                              color="primary"
                              variant="outlined"
                              spacing={2}
                            />
                          )
                        }
                      })}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  {' '}
                  {/* Ägandestruktur */}
                  <Box
                    sx={{
                      marginLeft: 50,
                    }}
                  >
                    <Typography variant="subtitle2" component="h3">
                      Ägandestruktur
                    </Typography>

                    <PieChart3 genderRatio={company.genderRatio} />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  {' '}
                  {/* Knapp */}
                  <Box padding={1}>
                    <Button
                      onClick={() =>
                        goToCompany(company._id, company.companyName)
                      }
                    >
                      Go to company
                    </Button>
                  </Box>
                </Grid>

                {/* </Box> */}
              </Paper>
            </>
          ))}
        </Box>
      </Grid>
    </>
  )
}

export default Card
