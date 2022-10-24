import {useQuery} from 'react-query'
import { axiosInstance } from '../../config'

const fetchRestaruantid = ({queryKey})=>{
    const restaruantName = queryKey[1]
    return axiosInstance.post('/api/dashboard/GetIdRestaurant',{restaruant: restaruantName})
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
                return data.data[0].id
            }
        }
    )
}