import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'
const BackBtn = ({val}) => {
    const navigate = useNavigate()
  return (
    <motion.div 
    onClick={()=>{navigate('/store')}}
        style ={{
        "&::before":{
            filter: `brightness(${val})`}
        }}
        className='circle-btn'>
        <BiArrowBack color='white'/>
    </motion.div>
    )
}

export default BackBtn