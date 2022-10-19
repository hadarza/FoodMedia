import React from 'react'
import InfoSectionProfile from './InfoSectionProfile';
import ParentProfileDiv from './ParentProfileDiv';
import ButtonNextStep from '../ButtonNextStep/ButtonNextStep'
import { axiosInstance } from '../../../../config';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {getPhoneNumber,getInputPassword, getSettings} from '../../../Redux/features/Phone/PhoneNum'

const SectionProfile =  ({setAuth}) => {
  const settings = useSelector(getSettings)
  const phone = useSelector(getPhoneNumber)
  const password = useSelector(getInputPassword)
  const navigate = useNavigate();


  function register(){
    // user details
    const User ={
      "phone":"+"+ phone,
      "passwordUser": password,
      "isGluten": Object.values(settings)[0],
      "isVegan": Object.values(settings)[1],
      "isVegetarian": Object.values(settings)[2],
      "isNutAllergy": Object.values(settings)[3],
      "isSeafood": Object.values(settings)[4],
      "isLowsugar": Object.values(settings)[5],
      "isKosher": Object.values(settings)[6]
    }
    axiosInstance.post("/api/user/Register",{User})
    .then(res => { 
        console.log(res.data)
        localStorage.setItem("token",res.data.tokenMessage)
        setAuth(true);

        navigate('/store')
    }).catch((error) => {
        console.log(error.message)
    })  
  }

  return (
    <section className='section-code'>
        <InfoSectionProfile/>
        <ParentProfileDiv/>
        <ButtonNextStep text="Finish" func={register}/>

    </section>
  )
}

export default SectionProfile