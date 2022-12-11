import React,{useRef,useState, lazy, Suspense} from 'react'
import { useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useRestaruantIdData } from '../../hooks/useRestaruantIdData';
import { useAllRestaruantsData } from '../../hooks/useAllRestaruantsData'
import {useImgByIdData} from '../../hooks/useImgByIdData'
import { AnimatePresence, motion,useScroll } from "framer-motion";
import CardProduct from './CardProduct/CardProduct';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import {axiosInstance} from '../../../config'
import PopUpCartInfo from '../PopUpCart/PopUpCartInfo'

// on interaction - import cart for pop up
const Cart = lazy(
  () => import('../Cart/Cart')
);
const Menu = () => {
  const [quantity,setQuantity] = useState(0)
  const [popUpCart,isPopUpCart] = useState(false)
  const ref = useRef(null);
    const onSuccess = (data) => {
      console.log(data)
    }

    const onError = (error) => {
        console.log("Error: ", error)
    }
      let {restaruant} = useParams()
      const RestaruantName = restaruant.replaceAll('_', ' ');
      const { data: RestaruantIdData , isError: IdisError , error: IdError, isLoading : loadingDataID } = useRestaruantIdData(RestaruantName,onSuccess,onError);
     
      if(RestaruantIdData != undefined)
        var RestaruantId = Object.values(RestaruantIdData)[0].id
      
      const { data: RestaruantProducts , isError: NameIsError , error: NameError } = useAllRestaruantsData(RestaruantId,onSuccess,onError,!!RestaruantId)
      const { data: RestaruantImage , isError: ImageIsError , error: ImageError } = useImgByIdData(RestaruantId,onSuccess,onError)

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

      const DeleteAll = () =>{
        axiosInstance.delete(`api/ShoppingCart/${product.name}`,{ withCredentials: true })
      }
      return (
        <>
        {!popUpCart &&    
        <>
        <div className='div-img-restaruant only-flex'>
          <motion.img
            ref={ref}
            style ={{
              filter: `brightness(${val})`}}
            src={`http://192.168.19.226:4000/api/dashboard/image/${RestaruantImage}`}/>
          <HeaderMenu
          valText={valText} val={val}/>
        </div>
      <div className='background-black-menu'>
      {/* <button className="addCart" onClick={DeleteAll}>delete all</button> */}
        <AdditionalInfo RestaruantName={RestaruantName} RestaruantIdData={RestaruantIdData}/>
          <div className='list-items'>
            {RestaruantProducts &&
              RestaruantProducts.map((product,index)=>(
                <CardProduct key={index} product={product} quantity={quantity} setQuantity={setQuantity}/>
              ))
            }
          </div>
        </div>
        </>
        }
        <PopUpCartInfo count={quantity} money="100" popUpCart={popUpCart} setPopUpCart={isPopUpCart}/>
        {popUpCart  && (
        <Suspense fallback={<div>Loading...</div>}>
          <Cart/>
        </Suspense>
        )}
       </> 
  )
}

export default Menu