import React from 'react'
import BackBtn from '../HeaderMenu/ButtonHeader/BackBtn';
import SettingsBtn from '../HeaderMenu/ButtonHeader/SettingsBtn';
import { motion } from "framer-motion";

const HeaderMenu = ({RestaruantName,valText,val}) => {
  return (
    <div 
    className='buttons-div-restaruant'>
        <BackBtn val={val}/>
        <motion.h2 
        style ={{
            opacity: valText
        }}
        className='title-restaruant'>{RestaruantName}</motion.h2>
        <SettingsBtn val={val}/>
        </div>
    )
}

export default HeaderMenu