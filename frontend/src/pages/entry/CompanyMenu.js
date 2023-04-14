import React from 'react'
import { Link } from 'react-router-dom'
import './CompanyMenu.css'
const CompanyMenu = () => {
  return (
    <div className='companymenu'>
      <Link to="/companyLogin"><p>Restaurat Login</p></Link>
      <Link to="/companySignup"><p>Restaurant Signup</p></Link>
     
    </div>
  )
}

export default CompanyMenu
