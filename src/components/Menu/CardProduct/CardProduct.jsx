import React,{useEffect} from 'react'
import { axiosInstance } from '../../../../config'
import {images} from '../../../constants/index'
import {useImgByIdData} from '../../../hooks/useImgByIdData'
const CardProduct = ({product,quantity,setQuantity}) => {

    const onSuccess = (data) => {
        console.log(data)  
    }
  
    const onError = (error) => {
        console.log("Error: ", error)
    }

    const AddToCart = async ()=>{
        setQuantity(quantity + 1)
        var nameProduct = (product.name).replaceAll(" ","-");
        console.log(nameProduct)
        // {withCredentials: true}
        await axiosInstance.put(`api/ShoppingCart/${nameProduct}`,{quantity: quantity, incrementBy:1})
        .then(response =>{
            console.log(response.data)
            console.log("good")
        }).catch(err =>{
            console.log(err)
        })
    }

    const { data: ProductImage , isError: ImageIsError , error: ImageError } = useImgByIdData(product != undefined ? product.idImage : "",onSuccess,onError)

  return (
    <div className='flex-around-row product-card'>
        <div className='title-product'>
            <div className='info-product'>
                <h3>{product.name}</h3>
                <div className='flex-align'>
                    <h4>{product.price} ₪</h4>
                    <div className='allergy-product'>
                        {product.isvegan && <div className='circle-allergy'><img className='info-img-product' src={images.vegan} alt="vegan"/></div>}
                        {product.isgluten && <div className='circle-allergy'><img className='info-img-product' src = {images.Gluten} alt="gluten"/></div>}
                        {product.isnutallergy && <div className='circle-allergy'><img className='info-img-product' src = {images.nuts} alt= "nuts" /></div>}
                        {product.iskosher &&  <div className='circle-allergy'><img className='info-img-product' src = {images.kosher} alt = "kosher"/></div>}
                        {product.isseafood &&  <div className='circle-allergy'><img className='info-img-product' src = {images.seaFood} alt="seaFood"/></div>}
                        {product.vegetarian && <div className='circle-allergy'><img className='info-img-product' src = {images.vegetarian} alt = "vegetrain"/></div>}
                        {product.islowsugar && <div className='circle-allergy'><img className='info-img-product' src = {images.drink} alt="lowsugar"/></div>}
                    </div>
                </div>
            </div>
        
        <button className="addCart" onClick={AddToCart}>ADD TO CART</button>

        </div>

        <div className='product-div-image'>
            <img className='product-img' alt="product" src={`http://10.100.102.33:4000/api/dashboard/image/${ProductImage}`}/>
        </div>
    </div>
  )
}

export default CardProduct