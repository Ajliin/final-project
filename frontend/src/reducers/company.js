import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // userId: null,
  // username: null,
  // accessToken: null,
  companyName: null,
  genderRatio: null,
  companyDesciption: null,
  location: null,
  skills: [],
  url: null,
  rating: null,
}

const company = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // setUserId: (store, action) => {
    //   store.userId = action.payload
    // },
    // setUsername: (store, action) => {
    //   store.username = action.payload
    // },
    // setAccessToken: (store, action) => {
    //   store.accessToken = action.payload
    // },
    setCompanyName: (store, action) => {
      store.companyName = action.payload
    },
    setGenderRatio: (store, action) => {
      store.genderRatio = action.payload
    },
    setCompanyDescription: (store, action) => {
      store.companyDesciption = action.payload
    },
    setLocation: (store, action) => {
      store.location = action.payload
    },
    setSkills: (store, action) => {
      store.skills = action.payload
    },
    setUrl: (store, action) => {
      store.url = action.payload
    },
    setRating: (store, action) => {
      store.rating = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default company
