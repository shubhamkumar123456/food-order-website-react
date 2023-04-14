import React, { useEffect, useState, useRef } from "react";
import "./Cartcomonent.css";

const Cartcomponent = (props) => {
  const [data, setData] = useState([]);

  // const [total, settotal] = useState([]);
  const userFunction = async () => {
    const response = await fetch("http://localhost:8080/api/foodItem/getone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.items }),
    });
    let res = await response.json();
    // console.log(res);
    setData(res);
    props.setttl(parseInt(res.price))
    // console.log(typeof res.price)

 
  };

 

  useEffect(() => {
    userFunction();
  }, []);

  



  return (
    <>

    </>
  );
};

export default Cartcomponent;
