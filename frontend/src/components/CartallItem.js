import React, { useEffect, useState } from 'react'
import './CartallItem.css'
const CartallItem = (props) => {
    // console.log(typeof props.ele)
    const [data, setdata] = useState([]);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
     useEffect(()=>{
        let items=async()=>{
            const response1 = await fetch(
                "http://localhost:8080/api/foodItem/getone",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id:props.ele }),
                }
              );
              let res1 = await response1.json();
            //   console.log(res1)
                setdata(res1)
        }
        items()
     },[props.ele])
          
    const removeItem=()=>{
        console.log(data._id)
    }
     
  return (
    <div className='cartAllItem'>
        <img className='cartAllItemImg' src={PF+data.img} alt="" />
      <p>{data.productName}</p>
      <span>{data.price}</span>
      <span>{data.quantity}</span>
      <button className='btn btn-danger' onClick={removeItem}>remove item</button>
    </div>
  )
}

export default CartallItem
