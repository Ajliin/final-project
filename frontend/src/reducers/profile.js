import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //   userId: null,
  //   username: null,
  //   accessToken: null,
  description: null,
}

const profile = createSlice({
  name: 'profile',
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
    setDescription: (store, action) => {
      store.description = action.payload
      console.log('inside reducer', store.description)
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default profile
