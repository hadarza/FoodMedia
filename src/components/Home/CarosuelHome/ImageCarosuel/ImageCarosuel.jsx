import React,{Suspense} from 'react'
import SkeletonCarosuel from '../SkeletonCarosuel/SkeletonCarosuel'
const ImageCarosuel = ({img}) => {
  return (
    <Suspense fallback={<SkeletonCarosuel/>}>
    <div className='flex'>
      <div className='card-carosuel'>
          <div className='carosuel-img'>
              <img src={`http://10.100.102.33:4000/api/dashboard/image/${img}`}/>
          </div>

          <div className='carosuel-info'>
              <h2>Title</h2>
              <h4>SubTitle</h4>
          </div>
      </div>
    </div>
</Suspense>

  )
}

export default ImageCarosuel