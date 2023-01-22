
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
          <div className='quantity-add-action'>

          <div className="quantity-container">
          <button className='increase-count'>-</button>
            <div className='item-count'>{props.quantity}</div>            
            <button className='decrease-count'>+</button>
        
          </div>  

            <button className='add-to-cart-btn' onClick={props.addItem}>Add to Cart</button>
          </div>
          <div className="delete-item-box" >
            
            <button className='delete-item' onClick={props.onDelete}>Delete</button>
           
          </div>
        </div>
      </div>
  )
}
