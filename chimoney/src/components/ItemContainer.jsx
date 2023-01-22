import React, { useEffect, useState } from 'react'

import '../style/ItemContainer.scss'

export default function ItemContainer(props) {

  return (
    <div className="item-container">
      <div className="top-container">
        <div className="left-side-box">
          <div className="item-img-container">
            <img className="item-img" src={props.image} alt={props.imgalt} />
          </div>
         
        </div>
        <div className="right-size-box">
          <div className="item-description">
            <span> {props.description}</span> {/*delete after*/}
          </div>
          <div className="item-price"> 
          <span>{props.currency}: </span>
          <span>{props.price}</span>
          </div>
          <div className="item-type-box">
            <span>{props.type}</span>
          </div>

          <div className="country-box">
            <span>{props.country}</span>
            
          </div>
          <div className='redeem-box'>
            <span>{props.redeem}</span>
          </div>
       

        </div>
  </div>
        <div className='bottom-box'>
          <div className="quantaty-container"> +/-
          </div>  
          <div className="delete-save-item-box" > button bytton
           
          </div>
        </div>
      </div>
  )
}
