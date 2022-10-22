import React,{useState,useEffect} from 'react'
import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../../config'

const Menu = () => {
    let {restaruant} = useParams()
    const RestaruantName = restaruant.replaceAll('_', ' ');

    const fetchRestaruantid = ()=>{
        console.log(RestaruantName)
        return axiosInstance.post('/api/dashboard/GetIdRestaurant',{restaruant: RestaruantName})
    }
    const {isLoading,data,isError,error} = useQuery(
        'DashBoardMenu',
        fetchRestaruantid,
        {
            // cacheTime:5000, //5 sec. Default is 5 min
            staleTime: 30000 //default is 0
        }
    )

    const idRestaruant = data?.data[0].id;



    // const fetchRestaruantImage = () =>{
    //     return axiosInstance.post('/api/dashboard/GetIdRestaurant',{idRestaruant})

    // }
    
  return (
    <div>
        {isLoading && <h2>Loading..</h2>}
        {isError && <h2>{error.message}</h2>}
        {data?.data[0].id}
       <h1>{RestaruantName}</h1>
    </div>
  )
}

export default Menu