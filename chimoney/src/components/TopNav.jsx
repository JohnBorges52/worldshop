import React from 'react'
import '../style/topNav.scss'

export default function TopNav(props) {
  return (
    <div className='top-nav'>
      <ul>
        <li className='WorldShop'>WorldShop</li>
        <li>Products</li>
        <li><div className='cart-img' onClick={props.click}><span className='cart-count'>{props.count}</span></div></li>
      </ul>
    </div>
  )
}
