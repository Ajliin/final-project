import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  description: null,
}

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setDescription: (store, action) => {
      store.description = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default profile
