import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

    const handleChnage=()=>{

    }

  return (
    <>
  <div className="navbar">
            <div className="logo">
            <img src="/images/logo.jpeg" alt=""/>
              <Link to="/home"><h4>Food <span>Delights</span></h4></Link>
                
            </div>
            <div className="seachBarDiv">
              {/* <input className='searchBar' onChange={handleChnage} type="search" placeholder='search for a restaurant,or a dish' /> */}
              {/* <i className='fas fa-search'></i> */}
            </div>
            <div className="links">
                <Link id="home" to="/home">Home</Link>
                <Link id="home" to="/home">About us</Link>
             
                <Link to="/cart">Cart <i className='fas fa-shopping-cart'></i></Link>
            </div>
        </div>
    </>
  )
}

export default Navbar
