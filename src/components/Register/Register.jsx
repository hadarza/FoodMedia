import React,{useRef,useState,lazy,Suspense} from 'react'
import 'react-phone-input-2/lib/style.css'
import {GrFormPrevious} from 'react-icons/gr'

const Register = ({setAuth}) => {

  const SectionPhone = lazy(()=>{
    import('./SectionPhone/SectionPhone')
  })
  const SectionProfile = lazy(()=>{
    import('./SectionProfile/SectionProfile')
  })
  const SectionCode = lazy(()=>{
    import('./SectionCode/SectionCode')
  })
  const SectionPassword = lazy(()=>{
    import('./SectionPassword/SectionPassword')
  })
  
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
        
        <Suspense fallback={<p id="loading">Loading...</p>}>
    {currentStep == 1 && <SectionPhone refProgressBar={refProgressBar} currentStep={currentStep} setcurrentStep={setcurrentStep} />}
    {currentStep == 2 && <SectionCode refProgressBar={refProgressBar} currentStep={currentStep} setcurrentStep={setcurrentStep}/>}
    {currentStep == 3 && <SectionPassword next={next}/>}
    {currentStep == 4 && <SectionProfile setAuth={setAuth}/>}
    </Suspense>
        
    </div>
  )
}

export default Register