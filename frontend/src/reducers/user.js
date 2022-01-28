import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
      userId: JSON.parse(localStorage.getItem('user')).userId,
      username: JSON.parse(localStorage.getItem('user')).username,
      email: JSON.parse(localStorage.getItem('user')).email,
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      hasCompany: JSON.parse(localStorage.getItem('user')).hasCompany,
    }
  : {
      userId: null,
      username: null,
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
    setUsername: (store, action) => {
      console.log('inside setUsername reducer', action.payload)
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setHasCompany: (store, action) => {
      store.hasCompany = action.payload
      console.log('reducr store.hasCompany', store.hasCompany)
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default user
