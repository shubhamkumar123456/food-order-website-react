import React from 'react'
import './Entry.css'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import CompanyMenu from './CompanyMenu';


const Entry = () => {
  return (
    <>
      <div className="entryImgDiv">
        <img src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="" />
        <div className="entryDivLinks">
            <ul>
           <Tippy
            theme='light'
            className='tippy'
            content={<CompanyMenu/>}
            interactive={true}
           >
          <li className='Link'>Add Restaurant</li>
           </Tippy>
                
                <Link to="/Login"><li>Login</li></Link>
                <Link to="/Signup"><li>Sign up</li></Link>
            </ul>
        </div>
        <div className='entryDivContent'>
            <h1>Food Delight</h1>
            <h3>Find the best restaurants,cafes and bars in India</h3>
        </div>
      </div>
    </>
  )
}

export default Entry
