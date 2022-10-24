import React from 'react'
import {images} from '../../../constants/index'
const CardProduct = ({product}) => {
  return (
    <div className='flex-col'>
        <div>
            <h3>{product.name}</h3>
            <h4>{product.price}</h4>
            <div>
                {product.isvegan && <img src={images.vegan} alt="vegan"/>}
                {product.isgluten && <img src = {images.Gluten} alt="gluten"/>}
                {product.isnutallergy && <img src = {images.nuts} alt= "nuts" />}
                {product.iskosher &&  <img src = {images.kosher} alt = "kosher"/>}
                {product.isseafood &&  <img src = {images.seaFood} alt="seaFood"/>}
                {product.vegetarian && <img src = {images.vegetarian} alt = "vegetrain"/>}
                {product.islowsugar && <img src = {images.drink} alt="lowsugar"/>}
            </div>
        </div>
        <div>
            <img src={images.vegan}/>
        </div>
    </div>
  )
}

export default CardProduct