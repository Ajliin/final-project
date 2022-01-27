import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // userId: null,
  // username: null,
  // accessToken: null,
  company: null,
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
    setCompany: (store, action) => {
      console.log('setCompany in reducer', action.payload)
      store.company = action.payload
      console.log('store.company', store.company)
    },
    setUsername: (store, action) => {
      console.log('inside user reducer', action.payload)
      store.username = action.payload
    },
    setCompanyName: (store, action) => {
      console.log('inside companyName reducer', action.payload)
      store.companyName = action.payload
    },
    setGenderRatio: (store, action) => {
      console.log('inside genderRatio reducer', action.payload)
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
