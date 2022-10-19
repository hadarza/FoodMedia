import React from 'react'

const Category = ({category}) => {
  return (
    <div className='category'>
        <div className='img-category'>
            <img  style={{
                width: '100%',
                objectFit: 'contain',
                }} src={category.img} alt="img-category"/>
        </div>
        <div className='title-category'>
            <h2>{category.title}</h2>
        </div>
    </div>
  )
}

export default Category