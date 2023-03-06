import React,{useEffect} from 'react'
import { useForm} from "react-hook-form";
import PhoneInputSms from './PhoneInputSms';
import InfoVerifyPhone from './InfoVerifyPhone';
import {useSelector} from 'react-redux'
import {getPhoneNumber} from '../../../Redux/features/Phone/PhoneNum'
import { axiosInstance } from '../../../../config';
import ButtonNextStep from '../ButtonNextStep/ButtonNextStep'

const SectionPhone = ({refProgressBar,currentStep,setcurrentStep}) => {
  const Phone = useSelector(getPhoneNumber)
    const {
        handleSubmit,
        formState: { errors },
        control
      } = useForm();
    useEffect(()=>{
      console.log(currentStep)
    },[currentStep])

    const sendCode  = ()=>{
      axiosInstance.post("/api/Phone/Message",{Phone})
    .then(res => { 
        if(currentStep < 4 ){
          setcurrentStep(currentStep + 1);
          refProgressBar.current.style.width = (25 * (currentStep+1)) + '%';
        }
    }).catch((error) => {
        console.log("error")
    })
    }
       
    // const onSubmit = (data) => {
    //   console.log(Phone);
    //   sendCode()
    // };

  return (
    <section className='section-phone flex-col'>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="user-info-form"> */}
          <InfoVerifyPhone/>
          <div className='flex-col'> 
            <div className='width-input'>
              <PhoneInputSms/>
            </div>
          </div>
          <ButtonNextStep text="Continue" func={sendCode}/>
            {/* </form> */}
    </section>
  )
}

export default SectionPhone