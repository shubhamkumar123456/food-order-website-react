import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './Home.css'
import HomepageFood from '../../components/homepagefood/HomepageFood'


const Home = () => {

  const [data, setdata] = useState([]);

  useEffect(()=>{
    const getAllRestaurant=async()=>{
      const response = await fetch('http://localhost:8080/api/foodItem')
      let res=await response.json();
     
      setdata(res)
    }
    getAllRestaurant()
  },[])

  return (
    <div className='Home'>
      <div className='HomeNav'>
      <Navbar/>
      </div>
      
        <div>
        <div className="HomeTop">
            <div className="main-content">
                <h2>We believe Good Food <br/>Offer great Smile</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem minima doloremque iusto laboriosam error a ex, pariatur molestias dolor earum.</p>
                {/* <button className="btn btn-success">Get started</button> */}
            </div>
            <div className="main-pic">
                <div className='main-picDiv'>
                <img src="/images/plate-removebg-preview.png" alt=""/>
                </div>
            </div>
        </div>
        </div>
        <div className='HomeFoodAllItems'>
        {data.map((items)=>{
          return <HomepageFood items={items} key={items._id}/>
        })}
        </div>
    </div>
  )
}

export default Home
