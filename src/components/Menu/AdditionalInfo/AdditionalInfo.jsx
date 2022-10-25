import React,{useRef,useState} from 'react'
import {IoMdBicycle} from 'react-icons/io'
import {HiOutlineEmojiSad,HiOutlineEmojiHappy} from 'react-icons/hi'
import {ImHappy} from 'react-icons/im'
import {motion, useScroll } from "framer-motion";

const AdditionalInfo = ({RestaruantName,RestaruantIdData}) => {
    const [HeaderVal,setHeaderVal] = useState(0)
    const Headerref = useRef(null)

    const { scrollYProgress: header } = useScroll({
        target: Headerref,
        offset: ["end end", "start start"]
    });


      header.onChange((value)=>{setHeaderVal(value)})


    const Iconrate = (rate) =>{
        if(rate >= 0 && rate <= 4)
            icon = "sad"
        else if(rate > 4 && rate <=6)
            icon = "ok"
        else if(rate > 6 && rate <= 8)
            rate="good"
        else if (rate > 8 && rate<=10)
            rate="best"
        return rate;
    }
    if(RestaruantIdData)
        var rate = Iconrate(Object.values(RestaruantIdData)[0].rate)
        console.log(rate)
  return (
    <div className='restaruant-info-section'>
    {RestaruantIdData &&
    <div className='width-100'>
        <div className='width-100 flex'>
            <div className='infoexplantion'>
                <motion.h1 className='restaruant-name'
                style={{opacity: HeaderVal}}>{RestaruantName} | {Object.values(RestaruantIdData)[0].addressrestaruant }</motion.h1>
                <p className='explantion'>{Object.values(RestaruantIdData)[0].info}</p>  
            </div>
        </div>
    

     <div className='additiona-info'>     
     <div className='iconinforestaruant'>
        <IoMdBicycle/>
        <p>Delievery in {Object.values(RestaruantIdData)[0].timeshipment} min</p>
     </div>

     <div className='iconinforestaruant'>
        {rate == "sad" && <HiOutlineEmojiSad/>}
        {rate == "ok" && <CiFaceMeh/>}
        {rate == "good" && <HiOutlineEmojiHappy/>}
        {rate == "best" && <ImHappy/>}
        <p>{Object.values(RestaruantIdData)[0].rate}</p>
      </div>
     </div>

    </div>

     }
    </div>
    )
}

export default AdditionalInfo