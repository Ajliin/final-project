import React, { useEffect, useState } from 'react'

import Header from '../components/Header'

const Company = () => {
  const [company, setCompany] = useState('')

  useEffect = () => {
    fetch('http://localhost:8080/company/61ee4f01e8a8604db38366cf')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCompany(data.response[0].companyName)
      }, [])
  }

  return (
    <>
      <Header />
      <div>
        <p>Profile.. </p>
        <p>{company}.. </p>
      </div>
    </>
  )
}

export default Company
