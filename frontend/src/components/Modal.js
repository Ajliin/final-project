import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useSelector } from 'react-redux'

import { TEST_API } from '../utils/url'

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)

  const userReview = useSelector((store) => store.user.firstname)
  const { companyId } = useSelector((store) => store.searchedCompany)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //RATE COMPANY
  const rateCompany = () => {
    const options3 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newRating: rating,
        comment: 'Hello',
        reviewer: userReview,
      }),
    }

    fetch(TEST_API(`rating/${companyId}`), options3)
      .then((res) => res.json())
      .then((data) => {
        console.log('ratingdata!!!!!!!!!', data)
        setRating(data.response.rating)
      })
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
          <DialogContentText>
            To rate to this company, please your amount of stars here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Number of stars"
            type="Number"
            fullWidth
            variant="standard"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
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
