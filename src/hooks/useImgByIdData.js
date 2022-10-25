import {useQuery} from 'react-query'
import { axiosInstance } from '../../config'

const fetchImage = ({queryKey})=>{
    const id = queryKey[1]
    return axiosInstance.post('/api/dashboard/GetImage',{id: id})
}
export const useImgByIdData = (id,onSuccess,onError)=>{

    return useQuery(
    ['ImageRestaruant',id],
    fetchImage,
        {
            // cacheTime:5000, //5 sec. Default is 5 min
            staleTime: 30000, //default is 0
            onSuccess,
            onError,
            select: (data) =>{
                return data?.data[0].filenameimage
            }
        }
    )
}