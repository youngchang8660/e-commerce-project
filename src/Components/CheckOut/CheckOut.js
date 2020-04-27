import React from "react";
import "./CheckOut.css";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateCart} from '../../ducks/reducer'

const CheckOut = (props) => {
    // function handleToken(token, addresses) {
    //     console.log({token, addresses})
    // }

const completeCheckout = () => {
  axios.put(`/api/purchase-cart/${props.user.user.customer_id}`)
  .then((res) => {
    console.log(res.data)
    const {cart_id} = res.data
    alert('Successful purchased')
    updateCart(cart_id)
    props.history.push('/')
  })
}

    console.log(StripeCheckout)
  return (
    <div className="checkout-body">
      <div className='checkout-container'>
        <h2 className="checkout-total-display">CART TOTAL: <span>${props.total}</span></h2>
        {/* <form onSubmit={completeCheckout}> */}
          <StripeCheckout  
            className='checkout-button'     
            stripeKey='pk_test_vS0VsMTF4h8LtghSe3CmvdNk00Qi81xDwN' 
            token={completeCheckout} 
            billingAddress
            shippingAddress
            amount={props.total * 100}
        />
        {/* </form> */}
        
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {updateCart})(CheckOut));
