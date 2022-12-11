import React from 'react'
import { axiosInstance } from '../../../config'

const GoCheckOut = () => {
  const emptyCart = ()=>{
    axiosInstance.delete('/api/ShoppingCart/',{ withCredentials: true })
  }
  return (
    <div className='flex checkout-buttons'>
        <button>
            Go To Checkout
        </button>
        <button onClick={emptyCart}>
            Empty Cart
        </button>
    </div>
  )
}

export default GoCheckOut