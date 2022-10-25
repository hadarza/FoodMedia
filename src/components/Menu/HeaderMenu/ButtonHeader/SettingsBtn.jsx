import React from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { motion } from "framer-motion";

const SettingsBtn = ({val}) => {
  return (
    <motion.div 
    style ={{
    "&::before":{
      filter: `brightness(${val})`}
    }}
    className='circle-btn'>
      <BiDotsVerticalRounded color='white'/>
    </motion.div>
    )
}

export default SettingsBtn