
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {FormControl, Form, Row, Col,Button} from "react-bootstrap";
import {calculatePercentage} from '../guitarsFolder/Helper'
import style from './Style'
import './Cart.css'
import paymentImg from '../Layout/img/payments.png'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
function Cart() {
const [data, setData] = useState([])

useEffect(() => {
 
    async function getCart() {
      const response = await axios.get(`http://localhost:8000/cart`);
      setData(response.data);
    }

    getCart();
},[]);

  return (
    <div>
   <div className="body-card" style={style.bodyCart}>
        <div className="card" style={style.card}>
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title" style={style.title}>
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">{}</div>
                </div>
              </div>
             
             {/* Adding data */}
             {data.map((cart, idx) => {
            const {id,cart_id, guitar_id, purchcost, quantity, cart_image, brand_name} = cart;

            return <> 
              <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2"><img className="img-fluid" src={ cart_image}/></div>
                  <div className="col">
                    <div className="row text-muted">Guitar</div>
                    <div className="row">Functionality not done</div> 
                  </div>
                  <div className="col">
                    <a href="#">-</a>
                    <a href="#" className="border">{quantity}</a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">{calculatePercentage(purchcost)}
                   {/* Remove Item */}
                    <span className="close" style={{padding  : '20px', color : 'red'}}>
                    <i class="fas fa-trash"></i>
                    </span>
                  </div>
                </div>
              </div>
            </>
      })}
         
              <div className="back-to-shop">
                <a href="#">
                <i class="fa-solid fa-left-long"></i>
                  </a>
                <span className="text-muted">Back to shop</span>
              </div>
              <div className="alert alert-success mt-3">
            <p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
            </div>
            </div>
            <div className="col-md-4 summary" style={style.summary}>
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr/>
              <div className="row">
                <div
                  className="col"
                  style={{
                  paddingLeft: 0
                }}>ITEMS 3</div>
                <div className="col text-right">&euro; 132.00</div>
              </div>
              <form>
                <p>SHIPPING</p>
                <select>
                  <option className="text-muted">Standard-Delivery- $ 0.00</option>
                </select>
                <p>GIVE CODE</p>
                <input id="code" className="input-checkout" placeholder="Enter your code"/>
              </form>
              <div
                className="row"
                style={{
                borderTop: '1px solid rgba(0,0,0,.1)',
                padding: '2vh 0'
              }}>
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">&euro; 137.00</div>
              </div>

              <button className="btn btn-checkout">CHECKOUT</button>

              <hr/>
              <p className="text-center mb-3">
                <img src={paymentImg} width="250" height="35"/>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Cart
   {/* ========== Table ==========

      <Table striped bordered hover className="table" variant="">

        <thead>

          <tr>
            <th>Table id</th>
            <th>Cart id</th>
            <th>Guitar id</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cart, idx) => {
            const {id,cart_id, guitar_id, purchcost, quantity, cart_image, brand_name} = cart;

            return <> 
            <tr>
              <td>{id}</td>
              <td>{cart_id}</td>
              <td>{guitar_id}</td>
              <td><img src={cart_image} width="100" height="100" alt="img"/></td>
              <td>{quantity}</td>
              <td>{calculatePercentage(purchcost)}</td>
              <td>
              <Button variant="danger">Remove</Button>
                </td>
            </tr> 
            </>
      })}
        </tbody>
      </Table> */}