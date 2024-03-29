//STYLE IMPORTS //
import '../style/index.css'
import '../style/shoppingCart.scss'

// COMPONENTS IMPORTS //
import ItemContainer from './ItemContainer'
import Notification from './Notification'

//HOOKS AND UTILITIES //
import React, { useEffect, useState } from 'react'

export default function ShoppingCart(props) {
  let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))

  //STATES//
  const [mycart, setMycart] = useState(cartFromLocalStorage)
  const [items, setItems] = useState([])
  const [qty, setQty] = useState(0)
  const [total, setTotal] = useState(0)
  const [isPopUp, setIsPopUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentProductId, setCurrentProductId] = useState()
  const [currentProductPrice, setCurrentProductPrice] = useState()
  const [isChecked, setIsChecked] = useState(false)

  //API//
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY':
        '5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262'
    }
  }

  //Used to Fetch information from the API //
  const getItems = () => {
    fetch('https://api.chimoney.io/v0.2/info/assets', options)
      .then(response => response.json())
      .then(response => setItems(response.data.ecommerce))
      .catch(err => console.error(err))
  }

  //Used to set loading spinner, fetch information, and count items
  //from LocalStorage and states on the first render.
  useEffect(() => {
    setLoading(true)
    getItems()
    countItems()
    const data = localStorage.getItem('cart')
    setMycart(JSON.parse(data))
    setLoading(false)
  }, [])

  useEffect(() => {
    calculateTotalSpent()
  }, [total])

  //Used to increase quantity information to localStorage//
  const handleIncrease = (productId, price) => {
    cartFromLocalStorage.map(element => {
      if (productId === element[0]) {
        element[2]++
        element[3] = element[2] * price
      }
      if (productId === element[0] && element[2] === 0) {
        element[2]++
        element[3] = currentProductPrice
      }
    })
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
    setMycart(JSON.parse(localStorage.getItem('cart')))
  }

  //Used to decrease quantity information to localStorage//
  const handleDecrease = (productId, price) => {
    cartFromLocalStorage.map(element => {
      if (productId === element[0] && element[2] > 0) {
        element[2]--
        element[3] = element[2] * price
      }
    })
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage))
    setMycart(JSON.parse(localStorage.getItem('cart')))
  }

  //Used to delete an item from shopping cart and update localStorage//
  const handleDelete = product => {
    let data = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === product) {
        data.splice(i, 1)
        break
      }
    }
    localStorage.setItem('cart', JSON.stringify(data))
    setMycart(JSON.parse(localStorage.getItem('cart')))
    setIsPopUp(false)
    calculateTotalSpent()
  }

  //Used to fetch how many items are inside teh cart//
  const countItems = () => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setQty(data.length)
  }

  //Used to calculate the total amount of the cart.
  const calculateTotalSpent = () => {
    let totalSpent = 0
    JSON.parse(localStorage.getItem('cart')).map(element => {
      totalSpent += element[3]
    })
    setTotal(totalSpent.toFixed(2))
  }

  // Used to prevent the user from changing to 0 quantity.
  // A pop message appears asking if the user wants to delete
  // or not. If cancel is selected, the amount returns to 01.
  const deleteAtZero = (product, quantity) => {
    if (quantity === 0) {
      setCurrentProductId(product)
      setCurrentProductPrice(product)
      setIsPopUp(true)
    }
  }

  // Used to update if the user check the mark to delete all items.
  const handleCheck = event => {
    setIsChecked(event.target.checked)
  }

  return (
    <>
      {isPopUp && (
        <Notification
          message={'Do you want to remove this item from the cart?'}
          onConfirm={() => {
            handleDelete(currentProductId)
            countItems()
          }}
          onCancel={() => {
            setIsPopUp(false)
            console.log(currentProductPrice)
            handleIncrease(currentProductId, currentProductPrice)
          }}
          isCart={true}
          classname={'notification-container moveDownAndStay'}
        />
      )}
      <div className="cart-main-container">
        <div className="subtotal-box">
          <span className="subtotal-span"> Subtotal</span>
          <span className="totalprice-span">{total}</span>
          <span className="close-cart-btn" onClick={props.closeCart}>
            &#215;
          </span>
        </div>

        <hr className="subtotal-hr" />

        <div className="checkout-container">
          <span className="checkout-btn">
            {' '}
            <a href="/checkout"> Proceed to Checkout </a>
            <span className="quantity-span">&nbsp;({qty} items)</span>{' '}
          </span>
        </div>

        <hr className="checkout-hr" />

        <div className="checkbox-container">
          <input type="checkbox" onChange={handleCheck}></input>
          <span>Delete all Items and start from the beggining.</span>
        </div>
        {isChecked && (
          <>
            <span className="delete-all-confirmation-message">
              Do you really want to delete all the items?
            </span>
            <span
              className="delete-all-confirmation"
              onClick={props.resetLocalStorage}
            >
              I really do!
            </span>
          </>
        )}

        <hr className="item-hr" />

        {!loading && qty > 0 && <div className="loading-icon"></div>}
        {items
          .filter(item => item.category.includes('Sports & Outdoors'))
          .map(element => {
            if (cartFromLocalStorage.length !== 0) {
              for (let product of cartFromLocalStorage) {
                if (element.productId === product[0]) {
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
                      productPage={false}
                      quantity={product[2]}
                      onDelete={() => {
                        setIsPopUp(true)
                        setCurrentProductId(element.productId)
                        setCurrentProductPrice(element.price)
                        countItems()
                        calculateTotalSpent()
                      }}
                      onIncrease={() => {
                        handleIncrease(
                          element.productId,
                          element.price,
                          element.price
                        )
                        calculateTotalSpent()
                      }}
                      onDecrease={() => {
                        handleDecrease(element.productId, element.price)
                        calculateTotalSpent()
                        deleteAtZero(product[0], product[2])
                        setCurrentProductPrice(element.price)
                      }}
                    />
                  )
                }
              }
            }
          })}
      </div>
    </>
  )
}
