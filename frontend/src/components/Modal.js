import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useSelector, useDispatch } from 'react-redux'

import DoRating from './DoRating'

import searchedCompany from '../reducers/searchedCompany'
import company from '../reducers/company'

import { TEST_API } from '../utils/url'

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  //const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const userReview = useSelector((store) => store.user.firstname)
  const { companyId, thisReview } = useSelector(
    (store) => store.searchedCompany,
  )

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //RATE COMPANY
  const rateCompany = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newRating: thisReview,
        comment: review,
        reviewer: userReview,
      }),
    }

    fetch(TEST_API(`rating/${companyId}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('REVIEWS!!!', data.response.reviews)
        dispatch(company.actions.setReviews(data.response.reviews))
      })
    dispatch(searchedCompany.actions.setThisReview(null))
    setReview('')
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Rate this company
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rating</DialogTitle>
        <DialogContent>
          <DoRating />

          <DialogContentText>
            To rate to this company, please your amount of stars here.
          </DialogContentText>
          <DialogContentText>{thisReview}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Recension"
            type="String"
            fullWidth
            variant="standard"
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={rateCompany}>Rate</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
