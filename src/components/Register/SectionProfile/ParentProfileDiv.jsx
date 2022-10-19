import React,{useReducer,useEffect} from 'react'
import {ProfileSettings} from './JSON/ProfileSettings'
import ProfileDiv from './ProfileDiv'
import { useDispatch } from 'react-redux'
import { setSetting } from '../../../Redux/features/Phone/PhoneNum'
const ParentProfileDiv = () => {
  const dispatchSetting = useDispatch()
  const Settings = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  }
  
  const [ValSettings, dispatch] = useReducer(reducer, Settings);
    useEffect(() => {
      dispatchSetting(setSetting(ValSettings))
      console.log(ValSettings)
    }, [ValSettings])

  function reducer(state, action) {
    switch (action.type) {
      case 'Gluten-free':
        return { ...state, 1: action.payload };
      case 'Vegan':
        return { ...state, 2: action.payload };
      case 'Vegetarian':
        return { ...state, 3: action.payload };
      case 'Nut allergy':
        return { ...state, 4: action.payload };
      case 'Sea food allergy':
        return { ...state, 5: action.payload };
      case 'Low sugar':
        return { ...state, 6: action.payload };
      case 'Kosher food':
        return { ...state, 6: action.payload };
      default:
        throw new Error();
    }
  }   

  return (
    <div className='flex wrap'>
        {ProfileSettings.map((setting,index)=>(
            <ProfileDiv key={index} setting={setting} dispatch={dispatch}/>
        ))}
    </div>
  )
}

export default ParentProfileDiv