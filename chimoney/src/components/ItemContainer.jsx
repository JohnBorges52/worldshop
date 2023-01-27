
import '../style/ItemContainer.scss'

export default function ItemContainer(props) {

  return (
    <div className="item-container">
      <div className="top-container">
        <div className="left-side-box">
          <div className="item-img-container">
            <img className="item-img" src={props.image} alt={props.imgalt}  />
          </div>
        </div>
        <div className="right-size-box">
          <div className="item-description">
            <span> {props.name}</span> 
          </div>
          <div className="item-price"> 
          <span>{props.currency}: </span> <span>{props.price}</span>
          </div>
          <div className="item-category-box">
            <span>{props.type}</span>
          </div>
          <div className="soldby-box">
            <span>Sold by: {props.soldby}</span>
            <span className='type-span'>{props.type}</span>
          </div>
       

          {props.productPage &&
          <>
              <span className='add-to-cart-btn' onClick={props.addItem}>Add to Cart</span>
              <span className='see-more' onClick={props.seeMore}>See more</span>
              
          </>
          }

        </div>
        </div>
          {!props.productPage && 
        <div className='bottom-box'>
          <div className='quantity-action'>
          <div className="quantity-container">
            <button className='decrease-count'onClick={props.onDecrease}>-</button>
            <div className='item-count'>{props.quantity}</div>            
            <button className='increase-count' onClick={props.onIncrease}>+</button>
          </div>  
           </div>
          
          <div className="delete-item-box" >
            <span className='delete-item' onClick={props.onDelete}>Delete</span>
          </div>
           
        </div>
        }
    </div>
  )
}
