import React from 'react'

import '../style/sidecart.scss'

export default function SideCart(props) {
  return (
    <div className='sidecart-container'>

      <div className='heading'>
        <span className='span-heading'>Your Cart!</span>
        <span className='close-btn'>X</span>
      </div>
      <div className='subtotal--box'>
        <span> SUBTOTAL USD 600</span>
      </div>

      <div className='your-items'>


      </div>



    </div>
  )
}
