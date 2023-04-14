import React from "react";
import "./HomepageFood.css";
import { Link } from "react-router-dom";


const HomepageFood = (props) => {
 console.log(props)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let token = JSON.parse(localStorage.getItem("token"));
  let userId = token.data.user.id;
  // console.log(userId)

  // console.log(props.items._id)
  let addToCart = async (e) => {
    // setallItems(props.items)
    const response = await fetch("http://localhost:8080/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token.authtoken,
        // 'body':userId
      },
      body: JSON.stringify({ userId: userId, productId: props.items._id }),
    });
    let res = await response.json();
    // console.log(res);
  };
 

  return (
    <div className="HomepageFood">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={PF + props.items.img}
          alt="food Img"
        />
        <div className="card-body">
          <h5 className="card-title">{props.items.productName}</h5>
          <p style={{ height: "23px" }} className="card-text">
            {props.items.desc}
          </p>
          <li className="list-group-item">
            <p className="list-groupItem-P">
              <b>Quantity</b>:{props.items.quantity}
              <span>
                <b>Price</b>:{props.items.price}Rs
              </span>
            </p>
          </li>
        </div>
        <div className="card-body-button">
          <Link to="#">
            <button onClick={addToCart} className="btn btn-success cart-btn">
              Add to cart
            </button>
          </Link>

        </div>
      </div>
      <div>
      {/* {allItems.map((element)=>{
        return <Cart data={element}/>
      })} */}
      </div>
    </div>
  );
};

export default HomepageFood;
