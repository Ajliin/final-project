import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //   userId: null,
  //   username: null,
  //   accessToken: null,
  searchedCompany: null,
  companies: [],
}

const companies = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (store, action) => {
      store.companies = action.payload
      console.log('inside reducer', store.companies)
    },
    setSearchedCompany: (store, action) => {
      store.searchedCompany = action.payload
      console.log('inside reducer searchedCompanies', store.searchedCompany)
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default companies
