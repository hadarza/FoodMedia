import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BiCycling} from 'react-icons/bi'
const CardRestaruant = ({item,img}) => {
  const navigate = useNavigate()
    const sliceAddress= item.AddressRestaruant.slice(0,5)
    const RestaruantName = item.name.replace(/\s/g, "_");
  return (
    <>
    {item ?
    <div className='flex' onClick={()=>{navigate(`./menu/${RestaruantName}`)}}>
    <div className='card-Restaruant'>
      <div className='card-img'>
          <img alt="card-restaruant-img" src={`http://192.168.19.226:4000/api/dashboard/image/${img}`}/>
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
    : <div>ZZZ</div>
    }
    </>
      )
}

export default CardRestaruant