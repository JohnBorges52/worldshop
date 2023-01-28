import React from 'react'
import '../style/notification.scss'

export default function Notification(props) {
  return (
    <div className={props.classname} id="animation">
      <span>{props.message}</span>
      {props.isCart && (
        <div className="btn-container">
          <button onClick={props.onConfirm}>OK</button>
          <button onClick={props.onCancel}>NO</button>
        </div>
      )}
    </div>
  )
}
