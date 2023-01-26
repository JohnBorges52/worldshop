//STYLE IMPORTS //
import "../style/products.scss";

// COMPONENTS IMPORTS //
import Pagination from '@mui/material/Pagination';
import Notification from './Notification';
import ItemContainer from './ItemContainer';
import TopNav from './TopNav';
import ShoppingCart from './ShoppingCart';

//HOOKS AND UTILITIES //
import React from 'react';
import  { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';


export default function Products() {
  const pageSize = 16;

  //STATES//
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState({
    initial: 1,
    final: 15})
  const [shoppingCart, setShoppingCart] = useState([]);
  const [qty, setQty] = useState(0)
  const [isCart, setIsCart] =useState(false)
  const [loading, setLoading] = useState(false)

  
  //Used to handle changes on Pagination//
  const handleChange = (event, value) => {
    setCurrentPage(value);
    setRange({initial:((value * pageSize)- pageSize +1 ), final: value * pageSize -1})
  };

   //API// 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262'
    }
  };

  //Used to Fetch information from the API //
  const getItems = () => {
    setLoading(true)
    fetch('https://api.chimoney.io/v0.2/info/assets', options)
    .then(response => response.json())
    .then(response => setItems(response.data.ecommerce))
    .then(()=>setLoading(false))
    .catch(err => console.error(err));
    
  }

  //Used to update state and localStorage on load //
  useEffect(() => {
    const data = localStorage.getItem('cart');
    if(data){
      setShoppingCart(JSON.parse(data))
    } else{
      localStorage.setItem("cart", JSON.stringify(shoppingCart))
    }
    getItems();
  }, [])



//Used for show cart count and after changing the shopping cart//
useEffect(()=>{
  localStorage.setItem("cart", JSON.stringify(shoppingCart))
  countItems();
},[shoppingCart])


//Used to add Item to the cart//
//Basically get the select item information from the API using productID
//and add it to the cart. Also update localstorage quantity.
  const addItem = (itemId, itemName, itemQuantity, itemPrice) => {
    const product = [itemId, itemName, itemQuantity, itemPrice]
      
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
            element[3] = itemPrice *= element[2]
          }
        })
      }
    }
  
    localStorage.setItem("cart", JSON.stringify(shoppingCart))
}

//Used to show how many items are inside the shopping cart//
const countItems = () =>{
  const data = JSON.parse(localStorage.getItem('cart'))
  setQty(data.length)
}

//Used to show pop up notification after add a new item to the car.
//Also resets the notification pop up if user tries to different
//items in a short period of time. 
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


//Used to add blur and brightness filters to the main container 
//as well as remove scrollbar when user opens the cart component.
const Addblur = () =>{
  const element = document.getElementById("on-blur");
  const bodyElement = document.getElementById("noScroll");
  if(!element.classList.contains("blur-container") && !isCart){
    element.classList.add("blur-container");
    bodyElement.classList.add("overflowY-zero");
  }
}

//Used to remove blur and brightness filters from the main container 
//as well as allow scrollbar when user closes the cart componen.
const removeBlur = () => {
  const bodyElement = document.getElementById("noScroll");
  const element = document.getElementById("on-blur");
  if(element.classList.contains("blur-container") && isCart) {
    element.classList.remove("blur-container");
    countItems()
    bodyElement.classList.remove("overflowY-zero");
  }
}


//still need to be done//
const scaleContainer = ()=>{
  const element = document.getElementById("scale-up");
  element.classList.add("scale-up");
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
      {loading && 
        <div className="loading-icon"></div>
      }
    <div className='products-browser-container'>
      <Notification 
        message={"You added this item to your cart"}
        isCart={false}
        classname={"notification-container"}
      />

  {items
  .filter((item => item.category.includes("Gift Cards")))
  .map((element, index) => {
    if (index +1 >= range.initial && index <= range.final)  {
      return (
        <ItemContainer 
          key={element.productId} 
          image={element.thumbnail} 
          imgalt={element.name}
          name={element.name} 
          price={element.price} 
          currency={element.currency} 
          category={element.category} 
          soldby={element.marketplace} 
          type={element.category}
          addItem={()=> {addItem(element.productId, element.name, 1, element.price); addNotification(); countItems()}} 
          onDelete={()=> {console.log(shoppingCart)}}
          productPage={true}
          resize={()=>{scaleContainer()}}
        />
        )
      }
    })}
  </div>

  <div className='pagination-container'>
    <Stack spacing={2}>
      <Pagination 
        count={Math.ceil(items.filter((item => item.category.includes("Gift Cards"))).length / pageSize)} 
        size="normal" 
        color="secondary" 
        page={currentPage} 
        onChange={handleChange}
      />
    </Stack>
  </div>
</div>
</>
)
}
