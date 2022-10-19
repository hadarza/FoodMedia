import React from 'react'
import { useSelector } from 'react-redux'
import {getPhoneNumber} from '../../../Redux/features/Phone/PhoneNum'

const InfoSectionCode = () => {
    const Phone = useSelector(getPhoneNumber)
  return (
    <div className='flex-col'>
        <section className='flex-col width-65'>
            <div className='title-register'>
                <h2>Verify your number</h2>
            </div>
            <div className='subTitle-register'>
                <h4>we just send the code to +{Phone}</h4>
            </div>
        </section>
    </div>
  )
}

export default InfoSectionCode