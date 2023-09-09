import React from 'react'
import '../style/topNav.scss'

export default function TopNav(props) {
  return (
    <div className="top-nav">
      <ul>
        <li className="WorldShop"> <a href="/">WorldShop</a></li>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href={props.href}>
            <div className="cart-img" id="scrollup" onClick={props.click}>
              <span className="cart-count">{props.count}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  )
}
