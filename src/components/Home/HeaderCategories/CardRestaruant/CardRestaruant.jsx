import React from 'react'
import {BiCycling} from 'react-icons/bi'
const CardRestaruant = ({item,img}) => {
    console.log(item)
    const sliceAddress= item.AddressRestaruant.slice(0,5)
  return (
    <>
    {item ?
    <div className='flex'>
    <div className='card-Restaruant'>
      <div className='card-img'>
          <img src={`http://10.100.102.33:4000/api/dashboard/image/${img}`}/>
      </div>
      <div className='card-info'>
        <h2>{item.name} | {sliceAddress}..</h2>
        <h4>{item.info}</h4>
        
        <div className='only-flex dash-border-top'>
            <div className='flex p-2'>
                <div className='m-r-2'>
                    <BiCycling/>
                </div>
                {item.priceShipment} ₪
            </div>
            <div className='flex p-2'>· {item.timeshipment} min</div></div>
      </div>
      </div>
    </div>
    : <div>Loading</div>
    }
    </>
      )
}

export default CardRestaruant