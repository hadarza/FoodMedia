
import {useQuery} from 'react-query'
import { axiosInstance } from '../../config'

const fetchRestaruantsData = ({queryKey})=>{
    const id = queryKey[1]
    console.log(id)
    return axiosInstance.post('/api/dashboard/GetProductsByRestaruants',{Restaruant: id})
}
export const useAllRestaruantsData = (id,onSuccess,onError,isEnabled)=>{

    return useQuery(
        ['RestaruantsData',id],
        fetchRestaruantsData,
        {
            // cacheTime:5000, //5 sec. Default is 5 min
            staleTime: 30000, //default is 0
            onSuccess,
            onError,
            enabled: isEnabled,
            select: (data)=>{
                return data?.data.map((Restaurant)=>(
                    {
                    name : Restaurant.productname,
                    price : Restaurant.price,
                    isgluten: Restaurant.isgluten,
                    isvegan: Restaurant.isvegan,
                    isvegetarian: Restaurant.isvegetarian,
                    isnutallergy: Restaurant.isnutallergy,
                    isseafood : Restaurant.isseafood,
                    islowsugar: Restaurant.islowsugar,
                    iskosher : Restaurant.iskosher,
                    idImage: Restaurant.imageproduct

                    }

                ))
            }
        },
        
    )
}