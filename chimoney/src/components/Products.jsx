import React from 'react';
import "../style/products.scss";
import  { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Notification from './Notification';

import ItemContainer from './ItemContainer';
import TopNav from './TopNav';
import ShoppingCart from './ShoppingCart';
import SideCart from './SideCart';


export default function Products() {

  const pageSize = 15;
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState({
    initial: 1,
    final: 15
  })
  const [shoppingCart, setShoppingCart] = useState([]);
  const [qty, setQty] = useState(0)
  const [isCart, setIsCart] =useState(false)
  const [loading, setLoading] = useState(false)

  


  const handleChange = (event, value) => {
    setCurrentPage(value);
    setRange({initial:((value * pageSize)-pageSize - 1), final: value * pageSize})
    
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262'
    }
  };

  const getItems = () => {
    setLoading(true)
    fetch('https://api.chimoney.io/v0.2/info/assets', options)
      .then(response => response.json())
      .then(response => setItems(response.data.giftCardsRLD.content))
      .then(()=>setLoading(false))
      .catch(err => console.error(err));


    

  }

  useEffect(() => {
    const data = localStorage.getItem('cart');
    if(data){
      setShoppingCart(JSON.parse(data))
    } else{
      localStorage.setItem("cart", JSON.stringify(shoppingCart))
    }
    getItems();
  }, [])



useEffect(()=>{
  localStorage.setItem("cart", JSON.stringify(shoppingCart))
  countItems();
},[shoppingCart])


  const addItem = (itemId, itemName, itemQuantity) => {
    
    const product = [itemId, itemName, itemQuantity]
    if(shoppingCart.length === 0){
      setShoppingCart([...shoppingCart, product])
    } else{
      const isInside = shoppingCart.filter(item => item[0] === itemId);
      if(isInside.length === 0){
        setShoppingCart([...shoppingCart, product])
      } else{
        shoppingCart.map(element => {
          if(element[0] === itemId){
            element[2]++
          }
        })
      }
    }
    localStorage.setItem("cart", JSON.stringify(shoppingCart))
    console.log("cart:" ,JSON.parse(localStorage.getItem('cart')))
    console.log("ShoppingCar:", shoppingCart)
}



const countItems = () =>{
  const data = JSON.parse(localStorage.getItem('cart'))
  setQty(data.length)
}

const addNotification = () => {
  const element = document.getElementById("animation");
  if(element.classList.contains("animationBounce")){
    element.classList.remove("animationBounce");
    setInterval(()=>{
      element.classList.add("animationBounce");
    },20)

  } else{
    element.classList.add("animationBounce");
  }
}


const Addblur = () =>{
  const element = document.getElementById("on-blur")
  if(!element.classList.contains("blur-container") && !isCart){
    element.classList.add("blur-container");
  }
}

const removeBlur = () => {
  const element = document.getElementById("on-blur")
  if(element.classList.contains("blur-container") && isCart) {
    element.classList.remove("blur-container");
  }
}

  return (
    <>
      <TopNav 
      count={qty}
      click={()=>{setIsCart(true); Addblur(); window.scrollTo(0, 0)}}
      
      />
      {isCart && 
      <ShoppingCart 
      closeCart={()=>{removeBlur();setIsCart(false)}}
      
      />
      }
    <div className='products-main-container' id='on-blur'>
      <div className='products-browser-container'>
      
      <Notification 
      message={"You added this item to your cart"}
      isCart={false}
      classname={"notification-container"}
      />
    {loading && 
        <div className="loading-icon"></div>
      }

    {items.map((element, index) => {
      if (index >= range.initial && index <= range.final) {
        return (
          <ItemContainer 
          key={element.productId} 
          image={element.img} 
          imgalt={element.name} 
          description={element.productName} 
          price={element.senderFee} 
          currency={element.senderCurrencyCode} 
          type={element.type} 
          country={element.country.name} 
          redeem={element.description} 
          addItem={()=> {addItem(element.productId, element.name, 1); addNotification();countItems()}} 
          onDelete={()=> {console.log(shoppingCart)}}
          productPage={true}
          />
          )
        }
      })}
    </div>

<div className='pagination-container'>
      <Stack spacing={2}>
        <Pagination count={Math.ceil(items.length / pageSize)} size="normal" color="secondary" page={currentPage} onChange={handleChange}/>
      </Stack>

      </div>
    </div>
    </>
    )
}
