import React from 'react'
import {RiLinkedinFill} from 'react-icons/ri'
import {AiOutlineHome} from 'react-icons/ai'
import {BsPhone} from 'react-icons/bs'
import {SiGmail} from 'react-icons/si'
const Footer = () => {
  return (
    <div className='footer'>
        <h2 className='footer-contact'>Contact</h2>
        <div>
            <div className='only-flex div-info-contact'>
                <RiLinkedinFill className='icon-footer'size={25}/>
                <a href="https://www.linkedin.com/in/hadar-zaguri-097487220/">Hadar Zaguri</a>
            </div>
            <div className='only-flex div-info-contact'>
                <AiOutlineHome className='icon-footer' size={25}/>
                <p>Rishon Lezion</p>
            </div>
            <div className='only-flex div-info-contact'>
                <BsPhone className='icon-footer' size={25}/>
                <a href="tel:972525299433">0525299433</a>
            </div>
            <div className='only-flex div-info-contact'>
                <SiGmail className='icon-footer' size={25}/>
                <a href="mailto:zagurihadar@gmail.com">Zagurihadar@gmail.com</a>
            </div>
        </div>
    </div>
  )
}

export default Footer