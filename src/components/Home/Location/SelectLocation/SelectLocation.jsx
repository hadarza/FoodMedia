import React,{useState} from 'react'
import {MdOutlineMyLocation} from 'react-icons/md'
import {AiOutlinePlus,AiOutlineCheck} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import Divider from '@mui/material/Divider';
import {images} from '../../../../constants/index'
import { useDispatch } from 'react-redux';
import { setOpen } from '../../../../Redux/features/Phone/OpenDrawer';
const SelectLocation = () => {
    const dispatch = useDispatch()
    const [Select,setSelect] = useState("CurrentLocation")
  return (
    <>
    <div className='relative div-x' onClick={()=>{dispatch(setOpen(false))}}>
        <div className="circle-close">
            <IoMdClose size={30}/>
        </div>
    </div>
    <div className='title-location'>Location</div>

        <div className='flex-col'>
            <div className='width-90'>
            <button className='btn-current-location' onClick={()=>{setSelect("CurrentLocation")}}>
                <div className='flex'>
                <div className="circle-svg">
                    <MdOutlineMyLocation size={30}/>
                </div>
                    
                    <div>Use my current location</div>
                </div>
                <div className='select'>
                    {Select == "CurrentLocation" && <img className='select-v' src={images.selectv}/>}
                </div>
            </button>
            <Divider/>
            <button className='btn-current-location' onClick={()=>{setSelect("newLocation")}}>
                <div className='flex'>
                    <div className="circle-svg">
                        <AiOutlinePlus size={30}/>
                    </div>
                    <div>Add new address</div>
                </div>
                <div className='select'>
                {Select == "newLocation" && <img className='select-v' src={images.selectv}/>}
                </div>
            </button>
            <Divider/>

        </div>
    </div>
    </>
  )
}

export default SelectLocation