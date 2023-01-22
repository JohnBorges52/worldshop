import "../style/index.css"
import '../style/shoppingCart.scss';
import React, { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer';

export default function ShoppingCart() {

  




const cartItems = () => {



}





  return (
    <div className="main-container">

      <div className="subtotal-box">
        <span className="subtotal-span">Subtotal</span><span className="totalprice-span">3.403.29</span>
      </div>

      <hr className='subtotal-hr' />

      <div className="checkout-container">
        <button className='checkout-btn'>Proceed to Checkout(4items) </button>
      </div>

      <hr className='checkout-hr' />


      <div className="gift-message">
        <input type="checkbox"></input>
        <span>Send as a gift. Include custom message</span>
      </div>

      <hr className='item-hr' />
      {/* {shoppingCart.map((element, index) => {
        if (index < 10) {
          return (
            <ItemContainer key={element.id} image={element.img} imgalt={element.name} description={element.productName} price={element.senderFee} currency={element.senderCurrencyCode} type={element.type} country={element.country.name} redeem={element.description}  />

          )

        }
      })} */}

    </div>
  )
}
