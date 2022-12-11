import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
const HeaderCart = () => {
  return (
    <div className='header-order'>
        <div className='circle-btn'>
            <BsChevronDown color='white' />
        </div>
        <div className='title-order'>
            Your order
        </div>
    </div>
  )
}

export default HeaderCart