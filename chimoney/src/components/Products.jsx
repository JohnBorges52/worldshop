import React from 'react';
import "../style/products.scss";
import  { useEffect, useState } from 'react';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ItemContainer from './ItemContainer';


export default function Products() {

  const pageSize = 15;
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState({
    initial: 0,
    final: 0
  })


  const handleChange = (event, value) => {
    setCurrentPage(value);
    setRange({initial:((value*15)-14), final: value* 15})
    
  };

  useEffect(()=>{
   
    

  },[currentPage])
  




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
    getItems()
    
  }, [])




  return (
    <div className='products-main-container'>

    <div className='top-nav'>
      <ul>
        <li className='WorldShop'>WorldShop</li>
        <li>Products</li>
        <li onClick={()=>console.log(items.length)}>Cart</li>
      </ul>

    </div>

    <div className='products-browser-container'>
    {items.map((element, index) => {
        if (index >= range.initial && index <= range.final) {
          return (
            <ItemContainer key={element.id} image={element.img} imgalt={element.name} description={element.productName} price={element.senderFee} currency={element.senderCurrencyCode} type={element.type} country={element.country.name} redeem={element.description} />
          )
        }
      })}
    </div>

      <div className='pagination-container'>
      <Stack spacing={2}>
        <Pagination count={Math.ceil(items.length / pageSize)} size="small" color="secondary" page={currentPage} onChange={handleChange}/>
      </Stack>
    

      </div>
    </div>
  )
}
