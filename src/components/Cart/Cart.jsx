import React,{useState,useEffect} from 'react'
import HeaderCart from './HeaderCart/HeaderCart'
import {BiPlus,BiMinus} from 'react-icons/bi'
import GoCheckout from '../GoCheckoutBtn/GoCheckOut'
import { axiosInstance } from '../../../config'
const Cart = () => {
    const [showQuantity,setShowQuantity] = useState(-1)
    useEffect(()=>{
        ShowProductsInCart()
    },[])
    useEffect(()=>{
        setInterval(()=>{
            setShowQuantity(-1)
        },5000)
    })
    const ShowProductsInCart = async() =>{
        await axiosInstance.get('/api/ShoppingCart/')
        .then(response =>{
            console.log(response.data)
        }).catch(err =>{
            console.log(err)
        })
    }
  return (
    <div className='cart-comp'>
        <HeaderCart/>
        <div className='order-list'>
            <div className='order-title'>
                <h3>Order items</h3>
            </div>
            <div>
            {[1,2,3].map((product,index)=>(
                <div className='cart-product' key={index}>
                    <div className='div-product-cart-info'>
                        <div className='info-product-cart'>
                            {showQuantity == product && <button className='circle-btn'><BiPlus/></button>}
                            <input alt="quantity-product" type="number" value="1" className='input-quantity' onFocus={()=>{setShowQuantity(product)}} />  
                            {showQuantity == product && <button className='circle-btn'><BiMinus/></button>}

                        <div className='info-product'>
                            <h1>IceCream</h1>
                            <span>50₪</span>
                        </div>
                        </div>
                    </div>
                    <div className='cart-product-image'>
                        <img src='http://192.168.19.226:4000/api/dashboard/image/1666204000180_golda.avif'/>
                    </div>
                </div>
            ))}
            </div>
        </div>
        <GoCheckout/>

    </div>
  )
}

export default Cart