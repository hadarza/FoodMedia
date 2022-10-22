import React from 'react'
import {MdFavoriteBorder, MdRestaurant,MdSearch} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
const ScrollFixedPage = () => {
  return (
    <div className='fix-scroller-div'>
        <div className='width-80'>
            <div className='flex-col'>
                <MdRestaurant className='icon-select' size={25}/>
                <p className='title-sidebar'>Restaurants</p>
            </div>
            <div className='flex-col'>
                <MdSearch size={25}/>
                <p className='title-sidebar'>Search</p>
            </div>
            <div className='flex-col'>
                <MdFavoriteBorder size={25}/>
                <div><p className='title-sidebar'>Favourite</p></div>
            </div>
            <div className='flex-col'>
                <CgProfile size={25}/>
                <div><p className='title-sidebar'>Profile</p></div>
            </div>
        </div>


    </div>
  )
}

export default ScrollFixedPage