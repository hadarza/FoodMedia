import React,{useEffect} from 'react'
import { axiosInstance } from '../../../config'
import HeaderCategories from './HeaderCategories/HeaderCategories'
import Location from './Location/Location';
import CarosuelHome from './CarosuelHome/CarosuelHome';
import ScrollFixedPage from '../ScrollFixedPage/ScrollFixedPage';
import Footer from '../Footer/Footer';

const Home = ({setAuth}) => {

async function getNameUser(){
    await axiosInstance.post("/api/dashboard",null,{headers: {
      jwt_token: localStorage.token
    }})
    .then(res => { 
        console.log(res.data)
    }).catch((error) =>{
      console.error(error)
    })
}


useEffect(() => {
  getNameUser()
}, [])


  return (
    <div className='app-height-100'>
      <Location/>
      <CarosuelHome/>
      {['burger','Ice Cream & Sweets','Pizza Time'].map((object,key)=>(
     <HeaderCategories tag={object}/> 

      ))}
      <ScrollFixedPage/>
      <Footer/>
   </div>
   
    )
}

export default Home