import "../style/index.css"
import '../style/shoppingCart.scss';
import React, { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer';

export default function ShoppingCart() {

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
  const [items, setItems] = useState([]);
  const[ mycart, setMycart] = useState(cartFromLocalStorage)

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
    const data = localStorage.getItem('cart');
    setMycart(JSON.parse(data))
  },[])


  const handleIncrease = (product) => {

    cartFromLocalStorage.map(element => {

      if(product === element[0]){
        element[2]++
      }
    })
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage))
    setMycart(JSON.parse(localStorage.getItem('cart')))
  }

  const handleDecrease = (product) => {
    cartFromLocalStorage.map(element => {

      if(product === element[0] && element[2] > 0){
        element[2]--
      }
    })
    localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage))
    setMycart(JSON.parse(localStorage.getItem('cart')))
  }

  const handleDelete = (product) => {
    let data = JSON.parse(localStorage.getItem('cart'));
    
    console.log("1",data)
    for (let i = 0; i < data.length; i++) {
      if(data[i][0] === product){
        data.splice(i,1);
        break;
      }

    }
    localStorage.setItem("cart", JSON.stringify(data))
    setMycart(JSON.parse(localStorage.getItem('cart')))

    console.log(data)

      
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
        <button onClick={()=>console.log(JSON.parse(localStorage.getItem('cart')))}>play</button>
      </div>

      <hr className='item-hr' />

      {items.map((element) => {
        if(cartFromLocalStorage.length !== 0){
          for(let product of cartFromLocalStorage){
            if(element.productId === product[0]){
              return (
                <ItemContainer key={element.productId} image={element.img} imgalt={element.name} description={element.productName} price={element.senderFee} currency={element.senderCurrencyCode} type={element.type} country={element.country.name} redeem={element.description} quantity={product[2]} 
                onDelete={()=> handleDelete(element.productId)} 
                onIncrease={()=>{handleIncrease(element.productId)}} onDecrease={()=>handleDecrease(element.productId)}  />
                )
              }
            }
            
          }
      })} 
       
    </div>
  )
}
