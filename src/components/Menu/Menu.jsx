import React,{useRef,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRestaruantIdData } from '../../hooks/useRestaruantIdData';
import { useAllRestaruantsData } from '../../hooks/useAllRestaruantsData'
import {useRestaruantImgByIdData} from '../../hooks/useRestaruantImgByIdData'
import {BiArrowBack,BiDotsVerticalRounded} from 'react-icons/bi'
import { motion,useScroll } from "framer-motion";
import CardProduct from './CardProduct/CardProduct';

const Menu = () => {
  const ref = useRef(null);

    const onSuccess = (data) => {
      toast.success('🦄 We are open!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });    
      }

    const onError = (error) => {
        console.log("Error: ", error)
    }
      let {restaruant} = useParams()
      const RestaruantName = restaruant.replaceAll('_', ' ');
      const { data: RestaruantIdData , isError: IdisError , error: IdError, isLoading : loadingDataID } = useRestaruantIdData(RestaruantName,onSuccess,onError);
      const RestaruantId = RestaruantIdData;
      const { data: RestaruantProducts , isError: NameIsError , error: NameError } = useAllRestaruantsData(RestaruantId,onSuccess,onError,!!RestaruantId)
      const { data: RestaruantImage , isError: ImageIsError , error: ImageError } = useRestaruantImgByIdData(RestaruantId,onSuccess,onError,!!RestaruantId)

      const { scrollYProgress: background } = useScroll({
        target: ref,
        offset: ["end start", "start start"]
      });

      const { scrollYProgress: name } = useScroll({
        target: ref,
        offset: [ "start start","end start"]
      });
      const [val,setVal] = useState(0)
      const [valText,setValText] = useState(0)
      background.onChange((value) => setVal(value));
      name.onChange((value)=>{setValText(value)})



      return (
    <div>
        {/* <ToastContainer /> */}
        {/* {loadingDataID && <h2>Loading..</h2>} */}
        {/* {IdisError && <h2>{IdError.message}</h2>} */}
       <div>
        <div className='div-img-restaruant only-flex'>
        <motion.img
          ref={ref}
          style ={{
            filter: `brightness(${val})`}}
          src={`http://10.100.102.33:4000/api/dashboard/image/${RestaruantImage}`}/>
        <div 
        
        className='buttons-div-restaruant'>
            <motion.div 
              style ={{
                "&::before":{
                  filter: `brightness(${val})`}
                }}
              className='circle-btn'>
                <BiArrowBack color='white'/>
            </motion.div>
            <motion.h2 
            style ={{
              opacity: valText
            }}
            className='title-restaruant'>{RestaruantName}</motion.h2>
            <motion.div 
            style ={{
            "&::before":{
              filter: `brightness(${val})`}
            }}
            className='circle-btn'>
              <BiDotsVerticalRounded color='white'/>
            </motion.div>
          </div>
        </div>
       
        <div className='huge'>
          {console.log(RestaruantProducts)}
          {RestaruantProducts &&
            RestaruantProducts.map((product,index)=>(
              <CardProduct key={index} product={product}/>
            ))
          }

        </div>

       </div>
    </div>
  )
}

export default Menu