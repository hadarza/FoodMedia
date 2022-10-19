import React from 'react'
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsSearch} from 'react-icons/bs'
const SearchBar = () => {
  return (
    <div className="header-menu">
      <div className='settings'>
        <GiSettingsKnobs size={30}/>
      </div>
      <div className='input-search'>
        <input type="text" placeholder="search food" alt="text"/>
      </div>
      <div className='search'>
        <BsSearch size={23}/>
      </div>
    </div>
  )
}

export default SearchBar