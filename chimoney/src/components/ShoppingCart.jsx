import "../style/index.css"
import '../style/shoppingCart.scss';
import React, { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer';

export default function ShoppingCart() {

  const [items, setItems] = useState([]);

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
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
      .then(response => setItems(response.data.giftCardsRLD.content))
      .catch(err => console.error(err));
  }

  useEffect(() => {

    getItems();
    
  }, [])


  useEffect(()=>{
    console.log(cartFromLocalStorage)
  },[])



  const handleIncrease = (product) => {

    cartFromLocalStorage.map(element => {

      if(product === element[0]){
        element[2]++
        console.log("ACHEI")
      }
    })
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

      {items.map((element) => {
        if(cartFromLocalStorage.length !== 0){
          for(let product of cartFromLocalStorage){
            if(element.productId === product[0]){
              return (
                <ItemContainer key={element.productId} image={element.img} imgalt={element.name} description={element.productName} price={element.senderFee} currency={element.senderCurrencyCode} type={element.type} country={element.country.name} redeem={element.description} quantity={product[2]} onDelete={()=>console.log(cartFromLocalStorage)}  onIncrease={()=>{handleIncrease(element.productId)}} onDecrease={()=>{}}  />
                )
              }
            }
            
          }
      })} 

    </div>
  )
}
