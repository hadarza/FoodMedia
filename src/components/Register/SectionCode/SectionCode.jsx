import React,{useRef} from 'react'
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../../config';
import { getPhoneNumber,getCode } from '../../../Redux/features/Phone/PhoneNum';
import ButtonNextStep from '../ButtonNextStep/ButtonNextStep';
import CodeDiv from './CodeDiv';
import InfoSectionCode from './InfoSectionCode';

const SectionCode =  ({refProgressBar,currentStep,setcurrentStep}) => {
  const refWrongCode = useRef()
  const Phone = useSelector(getPhoneNumber)
  const code = useSelector(getCode);


  function Verify(){
    axiosInstance.post("/api/Phone/Verify",{Phone,code})
    .then(res => { 
        console.log("phone "+ Phone + " code "+ code)
        if(currentStep < 4 && res.data.valid == true){
         refWrongCode.current.classList.add("visibility-hide")
          setcurrentStep(currentStep + 1);
          refProgressBar.current.style.width = (25 * (currentStep+1)) + '%';
        }else {
         refWrongCode.current.classList.remove("visibility-hide")
        }
    }).catch((error) => {
     console.log("we have error here in verify")
   })
  }

  function resend(){
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


  return (
    <section className='section-code'>
        <InfoSectionCode/>
        <CodeDiv/>
        <button className='resend' onClick={()=>{resend()}}>Send me a new Code</button>
        <p className='wrong-code visibility-hide' ref={refWrongCode}>Code Is Wrong</p>
        <ButtonNextStep text="Continue" func={Verify}/>
    </section>
  )
}

export default SectionCode