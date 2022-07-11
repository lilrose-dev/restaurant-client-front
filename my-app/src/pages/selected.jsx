import './selected.css'
import { useMutation } from "@apollo/client";
import { ORDERS } from "../Query";
import Basket from '../assets/img/basket.png'
import DelIcon from '../assets/img/delete.png'

import { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/context'
import { Button, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function Selected() {
  const navigate = useNavigate()

  const [ food, setFood ] = useState()
  const [ test, setTest ] = useState()
  const [ show, setShow ] = useState(false)
  const { items, setItems } = useContext(Context)
  

  //=======//
  const usernameRef = useRef();
  const locationRef = useRef();
  const phone_numberRef = useRef();

  //===========//

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlClick = (foodID) => {
    const foundFromLsMenu = items.find(e => e.id === foodID);
    const { name, price } = foundFromLsMenu;
    setFood({ name, price });
  };

   // for count selected food
   useEffect(() => {
    setTest(items.length);
  }, [items]);

  // delete from basket
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id))
    localStorage.setItem("item", JSON.stringify(items));
  };

  // ordering
  const [newOrder] = useMutation(ORDERS, {
    update:(cache, data) => {
      console.log(data);
    }
  })
  
  const productQuantity = document.querySelector('.product-quantity');
  const price = document.querySelector('.price');

  // Increment function
  const handleAddBtn = () => {
    ++productQuantity.innerHTML;
    price.innerHTML = parseInt(price.innerHTML) + food?.price;
  };

  // Decrement function
  const handleSplitBtn = () => {
    if (productQuantity.innerHTML >= 2) {
      --productQuantity.innerHTML
      price.innerHTML = parseInt(price.innerHTML) - food?.price;
    }
  };

  const handleSubmit = (e) => {
    newOrder({
      variables: {
        userName: usernameRef.current.value,
        location: locationRef.current.value,
        phone: phone_numberRef.current.value - 0,
        foodName: food?.name,
        price: price.innerHTML - 0,
        count: productQuantity.innerHTML - 0
      }
    });
    alert('Please click OK to confirm your order!')
    
      navigate('/',{replace: true}) 
    
  }




  return(<>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Selected food</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="cart-list">
            {
              items.map((e, i) => (
                <li className="cart-item" key={i}>
                  <img className="cart-item-img" src="https://picsum.photos/60/60" alt="" />
                  <div className="cart-title-wrapper">
                    <h5 className="cart-title">{e.name}</h5>
                    <p className="cart-price">{e.price} so'm</p>
                  </div>
                  <button className="btn btn-outline-success order-btn" id={e.id} onClick={() => handlClick(e.id) || handleClose()} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Order</button>
                  <button className="delete-btn" onClick={() => handleDelete(e.id)} id={e.id} ><img src={DelIcon} alt="" width="30" height="30" /></button>
                </li>
              ))
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="cart-open-btn-wrapper">
        <p className="sp">{test}</p>
       <div className="btnbasket">
          <button className="basketBtn">
            <img className='basketImg' onClick={handleShow} height={"50px"} width={"50px"} src={Basket} alt="basket"/>
          </button>
       </div>
      </div>

      {/* Order */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Order food</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <img src="https://picsum.photos/200/350" alt="" />
                <div>
                  <h5>{food?.name}</h5>
                  <label className="label" htmlFor="name">Name</label>
                  <input ref={usernameRef} className="form-control name" type="text" id="name" placeholder="Name" required />
                  <label className="label" htmlFor="location">Location</label>
                  <input ref={locationRef} className="form-control" type="text" id="location" placeholder="Location" required />
                  <label className="label" htmlFor="phone_number">Phone number</label>
                  <input ref={phone_numberRef} className="form-control"  type="number" id="phone_number" placeholder="Phone number" required />

                  <div className="quantity-wrapper">
                    <p className="quantity-title">Quantity:</p>
                    <button type="button" className="btn btn-outline-danger quantity-btn" onClick={handleSplitBtn}>-</button>
                    <div className="product-quantity">1</div>
                    <button type="button" className="btn btn-outline-danger quantity-btn" onClick={handleAddBtn}>+</button>
                  </div>

                  <div className="quantity-wrapper">
                    <p className="quantity-title">Price:</p>
                    <p className="price-h5"><span className="price">{food?.price}</span> so'm</p>
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Order</button>
              </div>
            </form>

          </div>
        </div>
      </div>


  </>)
}
export default Selected;