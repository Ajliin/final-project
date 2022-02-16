import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
      userId: JSON.parse(localStorage.getItem('user')).userId,
      firstname: JSON.parse(localStorage.getItem('user')).firstname,
      lastname: JSON.parse(localStorage.getItem('user')).lastname,
      email: JSON.parse(localStorage.getItem('user')).email,
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      hasCompany: JSON.parse(localStorage.getItem('user')).hasCompany,
    }
  : {
      userId: null,
      firstname: null,
      lastname: null,
      accessToken: null,
      email: null,
      hasCompany: null,
      error: null,
    }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setFirstname: (store, action) => {
      store.firstname = action.payload
    },
    setLastname: (store, action) => {
      store.lastname = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setHasCompany: (store, action) => {
      store.hasCompany = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default user
