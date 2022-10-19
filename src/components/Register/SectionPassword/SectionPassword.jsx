import React from 'react'
import CodeDiv from './CodeDiv';
import InfoSectionPass from './InfoSectionPass';
import ButtonNextStep from '../ButtonNextStep/ButtonNextStep'

const SectionPassword =  ({next}) => {
  return (
    <section className='section-code'>
        <InfoSectionPass/>
        <CodeDiv/>
        <ButtonNextStep text="Continue" func={next}/>
    </section>
  )
}

export default SectionPassword