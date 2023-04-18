import "./CompanyHome.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CompanyHome = () => {
  const [loading, setloading] = useState(false);
  // console.log(PF)
  let token = JSON.parse(localStorage.getItem("token"));
  // console.log('token',token.authtoken)

  const [data, setdata] = useState([]);
  // console.log(token.data.user.id)
  let userId = token.data.user.id;
  // console.log(userId)
  const desc = useRef();
  const quantity = useRef();
  const price = useRef();
  const category = useRef();
  const productName = useRef();
  const [file, setfile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      companyId: userId,
      desc: desc.current.value,
      quantity: quantity.current.value,
      price: price.current.value,
      category: category.current.value,
      productName: productName.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post("http://localhost:8080/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("http://localhost:8080/api/foodItem", newPost);
      // console.log(newPost.img)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(
        "http://localhost:8080/api/foodItem/single",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token.authtoken,
            // 'body':userId
          },
          body: JSON.stringify({ companyId: userId }),
        }
      );
      // console.log(response)
      const json = await response.json();
      // console.log(json)
      setdata(json);
    };
    getItem();
  }, []);


   
  const deletefoodItem=async(element)=>{
    const response = await fetch(
      "http://localhost:8080/api/foodItem",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.authtoken,
          // 'body':userId
        },
        body: JSON.stringify({ id:element}),
      }
    );
    // console.log(response)
      if(response.status && response.ok){
        setloading(true)
        window.location.reload();
      }
      else{
        console.log("something went wrong")
      }
  }


  return (
    <div className="companyHomeFlex">
      <div className="companyHomeFlextitle">
      <h1 style={{fontStyle:"italic"}}>Food Delight</h1>
      <img src="/images/logo.jpeg" alt="" />
      </div>
      <h4 style={{textAlign:"center", fontStyle:"italic"}}>Add your restaurant Foods here</h4>
      <div className="companyHome">
       

        <form className="companyHomeForm" action="" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="productName">Food Name</label>
            <input
              type="text"
              className="form-control"
              ref={productName}
              id="productName"
              placeholder="Enter name of food you want to add in your restaurant"
              name="productName"
            />
          </div>

          <div className="form-group">
            <label name="quantity" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="text"
              className="form-control"
              ref={quantity}
              id="quantity"
            />

            {/* <select ref={quantity} id="quantity">
            <option value="full">Full</option>
            <option value="half">Half</option>
          </select> */}
            {/* <input type="number" className="form-control" id="quantity" /> */}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              ref={price}
              name="price"
              id="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              ref={desc}
              name="desc"
              id="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="foodImg">Upload Food Image</label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              ref={category}
              name="category"
              id="category"
            />
          </div>

          <button type="submit" className="btn btn-primary submit">
            Submit
          </button>
        </form>
      </div>

      <div className="CompanyHomeAllItem">
        {data.map((element) => {
          let PF = process.env.REACT_APP_PUBLIC_FOLDER;
          return (
            <div className="showRestaurantFood" key={element._id} >
              {/* <div className="showRestaurantFoodTop">
              <div className="showRestaurantFoodImg">
                <h3 style={{textAlign:"center"}}>{element.productName}</h3>
                <img src={PF+element.img} alt="" />
              </div>
              <div className="showRestaurantFoodBottom">
                <p className='foodPrice'>Quantity:{element.quantity} <span>price: {element.price} Rs</span></p>
                <p>Description:{element.desc}</p>
              </div>
            </div> */}
              <div className="card" style={{ width: "12rem" }}>
                <img
                  className="card-img-top"
                  src={PF + element.img}
                  style={{ height: "100px" }}
                  alt="Card image cap"
                />
                <div style={{margin:"0",padding:"2px",gap:"0"}} className="card-body">
                  <h5 style={{margin:"0",padding:"2px",gap:"0"}}  className="card-title">{element.productName}</h5>
                  <p style={{margin:"0",padding:"2px",gap:"0"}}  className="card-text">
                    Quantity:{element.quantity}{" "}
                   
                  </p>
                  <p style={{margin:"0",padding:"2px"}}  className="card-text">
              
                    <span>Price: {element.price} Rs</span>
                  </p>
                  <p
                    className="card-text"
                    style={{
                      overflowY: "hidden",
                      height: "20px",
                      fontWeight: "400",
                      margin:"4px",
                   
                    }}
                  >
                    {element.desc}
                  </p>
                  <a style={{margin:"5px",textAlign:"center"}} href="#" className="btn btn-danger" onClick={()=>deletefoodItem(element._id)}>
                    Delete Food item
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyHome;
