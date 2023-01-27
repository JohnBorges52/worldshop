import React, { useEffect, useState } from 'react'
import '../style/checkout.scss'
import TopNav from './TopNav'

export default function Checkout() {

  const[totalLocalStorage, setTotalLocalStorage] = useState(0)
  
  const[qty, setQty] = useState(0)

  const getTotal = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    let total = 0
    setQty(data.length)
    data.map((element)=>{
      total = total + element[3]
    })
    setTotalLocalStorage(total.toFixed(2))
  
  }

  useEffect(()=>{ 
    getTotal()
  },[])


  
  return (
    <>
    <TopNav 
    href={"/"}
    count={qty}
      />
    <div className='checkoutmain-container'>
      <div className='type'>
        <span>Gift Cards</span>
        <span> {totalLocalStorage} </span>
      </div>
      
      <hr/>

      <div className='checkout-information'>
        <div className='checkout-information-container'>
          <div className="checkout-information-container-left">
            <span className="checkout-information-span">Subtotal</span>
            <span className="checkout-information-span">Taxes</span>
            <span className="checkout-information-span">Order Total</span>
          </div>
            
          <div className="checkout-information-container-right">
            <span className="checkout-information-span">$ {totalLocalStorage}</span>
            <span className="checkout-information-span"> $ 0.00</span>
            <span className="checkout-information-span">$ {totalLocalStorage}</span>
          </div>
        </div>

          <hr/>

        <div className='checkout-google-pay-btn'>
          
          <span><div className='img'></div>Google Pay</span>
        </div>

        <hr />

        <div className='checkout-contact'>
          <span className='contact'>CONTACT</span>
          <div className='input-info'>
            <input placeholder='Email and address for receipt' className='input-email-address'/>
            <div className='country-phone-div'>
              <input placeholder='Country' className='country-input'/>
              <input placeholder='Phone number' className='phone-input'/>
            </div>
            <div className='names-input'>
              <input placeholder='First name' className='first-name-input'/>
              <input placeholder='Last name' className='last-name-input'/>
            </div>
          </div>
        </div>

        <hr />

        <div className='checkout-card-info'>
          <input placeholder='Card Number' className='input-card-number'></input>
          <input placeholder='MM/YY' className='mm-yy' />
          <input placeholder='CVV' className='cvv' />
        </div>

        <hr/>
        <div className='pay-btn'>
          <span>Pay $127</span>
        </div>
      </div>
    </div>
    </>

  )
}
