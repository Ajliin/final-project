import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('company')
  ? {
      companyId: JSON.parse(localStorage.getItem('company')).companyId,
      company: JSON.parse(localStorage.getItem('company')).company,
      companyName: JSON.parse(localStorage.getItem('company')).companyName,
      genderRatio: JSON.parse(localStorage.getItem('company')).genderRatio,
      companyDescription: JSON.parse(localStorage.getItem('company'))
        .companyDescription,
      location: JSON.parse(localStorage.getItem('company')).location,
      skills: JSON.parse(localStorage.getItem('company')).skills,
      url: JSON.parse(localStorage.getItem('company')).url,
      rating: JSON.parse(localStorage.getItem('company')).rating,
      countRating: JSON.parse(localStorage.getItem('company')).countRating,
      reviews: JSON.parse(localStorage.getItem('company')).reviews,
    }
  : {
      companyId: null,
      company: null,
      companyName: null,
      genderRatio: null,
      companyDescription: null,
      location: null,
      skills: [],
      url: null,
      rating: null,
      countRating: null,
      reviews: [],
      thisReview: null,
    }

const company = createSlice({
  name: 'searchedCompany',
  initialState,
  reducers: {
    // setCompany: (store, action) => {
    //   console.log('setCompany in reducer', action.payload)
    //   store.company = action.payload
    //   console.log('store.company', store.company)
    // },
    setUserId: (store, action) => {
      console.log('inside userId reducer', action.payload)
      store.userId = action.payload
    },
    setCompanyId: (store, action) => {
      console.log('inside companyId reducer', action.payload)
      store.companyId = action.payload
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
      store.companyDescription = action.payload
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
    setCountRating: (store, action) => {
      store.countRating = action.payload
    },
    setReviews: (store, action) => {
      console.log('inside genderRatio reducer', action.payload)
      store.reviews = action.payload
    },
    setThisReview: (store, action) => {
      store.thisReview = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default company
