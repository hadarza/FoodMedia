import React,{useEffect} from 'react'
import { axiosInstance } from '../../../config'
import HeaderCategories from './HeaderCategories/HeaderCategories'
import Location from './Location/Location';
import CarosuelHome from './CarosuelHome/CarosuelHome';

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
      {[1,2,3,4].map((object,key)=>(
     <HeaderCategories tag="burger"/> 

      ))}


   </div>
   
    )
}

export default Home