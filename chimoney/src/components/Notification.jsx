import React from 'react'
import "../style/notification.scss";


export default function Notification(props) {
  return (
    <div className='notification-container'>

    <span>{props.message}</span>
    {props.isCart &&
      <div className='btn-container'>
    <button onClick={props.confirm}>OK</button>
    <button onClick={props.confirm}>NO</button>
      </div>
    }
      
    </div>
  )
}
