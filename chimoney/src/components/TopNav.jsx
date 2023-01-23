import React from 'react'
import '../style/topNav.scss'

export default function TopNav() {
  return (
    <div className='top-nav'>
      <ul>
        <li className='WorldShop'>WorldShop</li>
        <li>Products</li>
        <li> <a href='/cart'>Cart</a></li>
      </ul>
    </div>
  )
}
