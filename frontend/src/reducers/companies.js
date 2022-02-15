import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchedCompany: null,
  category: null,
  companies: [],
}

const companies = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (store, action) => {
      store.companies = action.payload
    },
    setCategory: (store, action) => {
      store.category = action.payload
    },
    setSearchedCompany: (store, action) => {
      store.searchedCompany = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default companies
