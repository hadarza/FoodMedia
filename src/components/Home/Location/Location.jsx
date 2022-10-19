import React,{useState} from 'react'
import {MdOutlineMyLocation} from 'react-icons/md'
import {BsChevronDown} from 'react-icons/bs'
import TemporaryDrawer from '../Drawer/TemporaryDrawer'
import { useDispatch } from 'react-redux';
import { setOpen } from '../../../Redux/features/Phone/OpenDrawer';
const Location = () => {
  const dispatch = useDispatch()

  return (
    <>
    <button className='btn-location' onClick={()=>{dispatch(setOpen(true))}}>
        <div className='icon-location'>
            <MdOutlineMyLocation size={30}/>
        </div>
        Your current Location 
        <div className='icon-down'>
            <BsChevronDown/>
        </div>
    </button>
    
    <TemporaryDrawer/>
    </>
  )
}

export default Location