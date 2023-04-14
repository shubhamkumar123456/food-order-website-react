import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CompanyLogin = () => {
  const [credentials, setcredentials] =useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/company/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
   
      // save the auth token and redirect
      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem('token',JSON.stringify(json))
      
        navigate("/companyHome");
       
      } else {
        console.log("wrong details")
      }
    }

  const onchange=(e)=>{
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="companySignupcontainer">
        <img className='companySignupMainImg' src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/f55c87d06a345e9c94021f3e/3007283.jpg" alt="" />
        <div className='companySignupAbsolute'>
          <form action="" className='companySinupForm' onSubmit={handleSubmit}>

            <label htmlFor="email">Email:</label>
            <input type="email" placeholder='enter your email' name='email' value={credentials.email} onChange={onchange} />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='enter your password'name='password' value={credentials.password} onChange={onchange} />
            <button type='submit'>Submit</button>
            <p style={{color:"black",fontWeight:500}}>don't have account? <Link to="/companySignup"><span>sign up</span></Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default CompanyLogin
