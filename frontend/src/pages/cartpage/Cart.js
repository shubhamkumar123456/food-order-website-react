import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import "./Cart.css";
import CartallItem from "../../components/CartallItem";

const Cart = () => {
  const [data, setData] = useState([]);
  const [price, setprice] = useState([]);

  let token = JSON.parse(localStorage.getItem("token"));
  let userId = token.data.user.id;

  useEffect(() => {
    const userFunction = async () => {
      const response = await fetch(
        "http://localhost:8080/api/customer/getone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token.authtoken,
          },
          body: JSON.stringify({ id: userId }),
        }
      );
      let res = await response.json();
      setData(res.cart);
      // console.log(res.price)
      setprice(res.price);
      // res.cart.forEach(async (element) => {
    };
    userFunction();
  }, [token.authtoken,userId]);

  let sum = 0;
  const ttl = () => {
    price.forEach((num) => {
      sum += parseInt(num);
    });
  };
  ttl();
  // console.log(sum)

  // console.log(data)

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-data">
        <div className="cart-data-names">
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        {data.map((ele) => {
          return <CartallItem key={ele + Math.random()} ele={ele} />;
        })}
        <p style={{ textAlign: "center" }}>
          <b>Total</b>={sum}
        </p>
        <button className="btn btn-success">Buy now</button>
      </div>
    </div>
  );
};

export default Cart;
