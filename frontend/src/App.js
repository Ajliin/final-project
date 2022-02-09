import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import './App.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@material-ui/core/'
import { theme } from './utils/theme'

import user from './reducers/user'
import profile from './reducers/profile'
import company from './reducers/company'
import companies from './reducers/companies'
import searchedCompany from './reducers/searchedCompany'

import Company from './pages/Company'
import CompanySignUp from './pages/CompanySignUp'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'

const reducer = combineReducers({
  user: user.reducer,
  profile: profile.reducer,
  company: company.reducer,
  companies: companies.reducer,
  searchedCompany: searchedCompany.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/company/:paramId" exact element={<Company />} />
            <Route path="/company-form" element={<CompanySignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
