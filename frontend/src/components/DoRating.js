import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import searchedCompany from '../reducers/searchedCompany'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

const DoRating = () => {
  const [value, setValue] = useState(3)
  const [hover, setHover] = useState(-1)

  const dispatch = useDispatch()

  return (
    <>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          defaultValue={2.5}
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue)
            dispatch(searchedCompany.actions.setThisReview(newValue))
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover)
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    </>
  )
}

export default DoRating
