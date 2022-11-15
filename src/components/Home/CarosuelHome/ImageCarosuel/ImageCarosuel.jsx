import React from 'react'
const ImageCarosuel = ({img}) => {
  return (
    <div className='flex'>
    <div className='card-carosuel'>
        <div className='carosuel-img'>
            <img src={`http://192.168.113.226:4000/api/dashboard/image/${img}`}/>
        </div>

        <div className='carosuel-info'>
            <h2>Title</h2>
            <h4>SubTitle</h4>
        </div>
    </div>
</div>
  )
}

export default ImageCarosuel