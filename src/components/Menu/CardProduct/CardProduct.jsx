import React from 'react'
import {images} from '../../../constants/index'
import {useImgByIdData} from '../../../hooks/useImgByIdData'
const CardProduct = ({product}) => {

    const onSuccess = (data) => {
        console.log(data)  
    }
  
      const onError = (error) => {
          console.log("Error: ", error)
      }

    const { data: ProductImage , isError: ImageIsError , error: ImageError } = useImgByIdData(product.idImage,onSuccess,onError)

  return (
    <div className='flex-around-row product-card'>
        <div className='title-product'>
            <div className='info-product'>
                <h3>{product.name}</h3>
                <h4>{product.price} ₪</h4>
            </div>
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

        <div className='product-div-image'>
            <img className='product-img' alt="product" src={`http://10.100.102.33:4000/api/dashboard/image/${ProductImage}`}/>
        </div>
    </div>
  )
}

export default CardProduct