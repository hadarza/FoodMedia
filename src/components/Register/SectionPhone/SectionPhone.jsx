import React from 'react'
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
    
    
      const onSubmit = (data) => {
        console.log(data);
      };

    function sendCode(){
      axiosInstance.post("/api/Phone/Message",{Phone})
      .then(res => { 
          console.log(res.data)
          if(currentStep < 4 ){
            setcurrentStep(currentStep + 1);
            refProgressBar.current.style.width = (25 * (currentStep+1)) + '%';
          }
      }).catch((error) => {
          console.log("error")
      })  
    }
  return (
    <section className='section-phone flex-col'>
        <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
            <InfoVerifyPhone/>
            <div className='flex-col'> 
              <div className='width-70'>
                <PhoneInputSms/>
              </div>
            </div>
            <ButtonNextStep text="Continue" func={sendCode}/>
            </form>
    </section>
  )
}

export default SectionPhone