import React from 'react'
const ProfileDiv = ({setting,dispatch}) => {

  // toggle select/diselect allergic/kosher etc
  const toggleSelect = (event) =>{
    if(event.currentTarget.classList.contains("selectProfile")){
      event.currentTarget.classList.remove("selectProfile")
      dispatch({type: setting.title, payload: false})
    } else{    
      event.currentTarget.classList.add("selectProfile")
      dispatch({type: setting.title, payload: true})
    }
    console.log(setting.title)
  }

  return (
    <div className='Profile-btn' onClick={(event)=>{toggleSelect(event)}}>
      <div className='button-img'>
        <img src={setting.img}/>
      </div>
      <div className='button-text'>
          {setting.title}
      </div>
    </div> 
  )
}

export default ProfileDiv