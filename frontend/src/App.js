import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import './App.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import user from './reducers/user'
import profile from './reducers/profile'
import company from './reducers/company'
import companies from './reducers/companies'

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
})

const store = configureStore({ reducer })

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#11111',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company-sign-up" element={<CompanySignUp />} />
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
