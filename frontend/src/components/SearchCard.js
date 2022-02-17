import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import {
  Grid,
  Typography,
  Chip,
  Box,
  CardActionArea,
  Card,
} from '@material-ui/core'
import { LocationOnOutlined } from '@material-ui/icons'

import { PieChart3 } from './PieChart'
import { styles } from '../utils/theme'

const SearchCard = () => {
  const allCompanies = useSelector((store) => store.companies.companies)

  const navigate = useNavigate()

  const goToCompany = (paramId, companyName) => {
    navigate(`/company/${paramId}`)
  }

  return (
    <>
      <Box>
        {allCompanies?.map((company, index) => (
          <Card key={company._id} style={styles.Paper}>
            <CardActionArea
              href="#"
              onClick={() => goToCompany(company._id, company.companyName)}
            >
              <Grid container item xs={12} spacing={2}>
                {/* //whole card */}

                <Grid item xs={5} md={2}>
                  {/* Picture  */}
                  <Box>
                    <img
                      className="img-profile"
                      src={`https://source.unsplash.com/random/150x150?sig=${index}`}
                      alt="company profile"
                    />
                  </Box>
                </Grid>

                <Grid item xs={7} md={4}>
                  {/* Name, location and rating */}
                  <Box
                    sx={{
                      marginLeft: 20,
                    }}
                  >
                    {/* //component is what it is and variant how it looks */}
                    <Typography variant="h5" component="h2">
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
                {/* Skills  */}
                <Grid item xs={5} md={3}>
                  <Box>
                    <Typography variant="h6" component="h3">
                      Skills
                    </Typography>
                    <Box>
                      {company.skills.map((skill) => {
                        if (skill === '') {
                          return
                        } else {
                          return (
                            <Chip
                              key={skill}
                              label={skill}
                              style={styles.BgLightPurple}
                              spacing={2}
                            />
                          )
                        }
                      })}
                    </Box>
                  </Box>
                </Grid>
                {/* Ägandestruktur */}
                <Grid item xs={7} md={3}>
                  {/* sm if less than 600 */}

                  <Box>
                    <Typography variant="h6" component="h3">
                      Ägandestruktur
                    </Typography>

                    <PieChart3 genderRatio={company.genderRatio} />
                  </Box>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  )
}

export default SearchCard
