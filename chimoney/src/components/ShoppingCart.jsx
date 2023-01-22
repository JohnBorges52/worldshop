import "../style/index.css"
import '../style/shoppingCart.scss';
import React, { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer';

export default function ShoppingCart() {

  const [shoppingCart, setShoppingCart] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262'
    }
  };

  const getItems = () => {

    fetch('https://api.chimoney.io/v0.2/info/assets', options)
      .then(response => response.json())
      .then(response => setShoppingCart(response.data.giftCardsRLD.content))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getItems()
  }, [])
  
  return (
    <div className="main-container">

      <div className="subtotal-box">
        <span className="subtotal-span">Subtotal</span><span className="totalprice-span">3.403.29</span>
      </div>

      <hr className='subtotal-hr' />

      <div className="checkout-container">
        <button className='checkout-btn' onClick={() => console.log(shoppingCart)}>Proceed to Checkout(4items) </button>
      </div>

      <hr className='checkout-hr' />


      <div className="gift-message">
        <input type="checkbox"></input>
        <span>Send as a gift. Include custom message</span>
      </div>

      <hr className='item-hr' />
      {shoppingCart.map((element, index) => {
        if (index < 10) {
          return (
            <ItemContainer key={element.id} image={element.img} imgalt={element.name} description={element.productName} price={element.senderFee} currency={element.senderCurrencyCode} type={element.type} country={element.country.name} redeem={element.description} />

          )

        }
      })}

    </div>
  )
}
