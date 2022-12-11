import React,{useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
const PopUpCartInfo = ({count,money,PopUpCart,setPopUpCart}) => {
    const openCart = ()=>{
        setPopUpCart(true)
    }

  return (
    <AnimatePresence>
        {count != 0 &&
        <motion.div
        key="pop-cart"
        initial={{opacity:0}}
        animate = {{opacity:1}}
        exit={{opacity: 0}}
        className='popup-cartInfo width-100'
        onClick={openCart}>
        <div className='background-cartInfo'>
            <div className='flex'>
                <div className='circle-count'>
                    <span>{count}</span>
                </div>
                <h2 className='view-order'>View Order</h2>
            </div>
            <div className='money-cart'>{money}₪</div>
        </div>
        </motion.div>
        }
        </AnimatePresence>

  )
}

export default PopUpCartInfo