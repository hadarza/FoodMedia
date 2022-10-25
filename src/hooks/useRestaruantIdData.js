import {useQuery} from 'react-query'
import { axiosInstance } from '../../config'

const fetchRestaruantid = ({queryKey})=>{
    const restaruantName = queryKey[1]
    return axiosInstance.post('/api/dashboard/GetInfoRestaurant',{restaruant: restaruantName})
}
export const useRestaruantIdData = (RestaruantName,onSuccess,onError)=>{

    return useQuery(
    ['DashBoardMenu',RestaruantName],
        fetchRestaruantid,
        {
            // cacheTime:5000, //5 sec. Default is 5 min
            staleTime: 30000, //default is 0
            onSuccess,
            onError,
            select: (data)=>{
                return data?.data.map((restaruant)=>(
                    {
                    id: restaruant.id,
                    name : restaruant.restarunt,
                    info : restaruant.info,
                    priceshipment: restaruant.priceshipment,
                    timeshipment: restaruant.timeshipment,
                    tag: restaruant.tag,
                    addressrestaruant: restaruant.addressrestaruant,
                    rate: restaruant.rate
                    }
                ))
            }
        }
    )
}