import React,{useRef,useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SectionCode from './SectionCode/SectionCode'
import SectionPassword from './SectionPassword/SectionPassword'
import SectionPhone from './SectionPhone/SectionPhone'
import SectionProfile from './SectionProfile/SectionProfile'
import {GrFormPrevious} from 'react-icons/gr'
const Register = ({setAuth}) => {
    const refProgressBar = useRef(null)
    const [currentStep, setcurrentStep] = useState(1)

    const next = ()=>{
      if(currentStep < 4 ){
        setcurrentStep(currentStep + 1);
        refProgressBar.current.style.width = (25 * (currentStep+1)) + '%';
      }
    }
  return (
    <div>
        <div className='progress-div'>
          {currentStep > 1 &&
          <div className='prev' onClick={()=>{
            setcurrentStep(currentStep-1);
            refProgressBar.current.style.width = (25 * (currentStep-1)) + '%';
          }}> 
            <GrFormPrevious size={30}/>
          </div>
          }
            <div className='progress'> 
                <div className='progress-color' ref={refProgressBar}></div>
            </div>
            <div className='step-progress'>Step {currentStep}/4</div>
        </div>
        
    {currentStep == 1 &&< SectionPhone refProgressBar={refProgressBar} currentStep={currentStep} setcurrentStep={setcurrentStep} />}
    {currentStep == 2 && <SectionCode refProgressBar={refProgressBar} currentStep={currentStep} setcurrentStep={setcurrentStep}/>}
    {currentStep == 3 && <SectionPassword next={next}/>}
    {currentStep == 4 && <SectionProfile setAuth={setAuth}/>}
    {/* SectionPhone refProgressBar={refProgressBar} currentStep={currentStep} setcurrentStep={setcurrentStep} */}
        
    </div>
  )
}

export default Register