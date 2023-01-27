import React from 'react'

import '../style/increasedsizebox.scss'

export default function IncreasedSizeBox(props) {
  return (
    <div className='increased-size-container'>
      <div className='increased-size-close' onClick={props.close}><span>&#215;</span></div>
      <div className='increased-size-image'>
        <img src={props.src} alt={props.alt} />
      </div>
    <div className='increased-size-description'>
      <span>{props.description}</span>
    </div>
    <div className='increased-size-price'>
    <span>{props.currency}{props.price}</span>
    </div>
    <div className='increased-size-add-btn'>
    <span onClick={props.add}>Add to Cart</span>


    </div>




    </div>
  )
}
