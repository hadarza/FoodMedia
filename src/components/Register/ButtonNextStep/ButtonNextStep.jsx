import React from 'react'
import { GrFormNextLink } from 'react-icons/gr';

const ButtonNextStep = ({text,func}) => {
  return (
    <div className='flex'>
        <button className='btn-register' onClick={()=>{
          func()
          console.log("click text")}}>{text}
            <div className='flex-col circle-next'>
                <GrFormNextLink size={21}/>
            </div>
        </button>
   </div>
  )
}

export default ButtonNextStep