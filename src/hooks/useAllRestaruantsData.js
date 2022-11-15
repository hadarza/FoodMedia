
import {useQuery} from 'react-query'
import { axiosInstance } from '../../config'

const fetchRestaruantsData = ({queryKey})=>{
    const id = queryKey[1]
    return axiosInstance.post('/api/dashboard/GetProductsByRestaruants',{Restaruant: id})
}
export const useAllRestaruantsData = (id,onSuccess,onError,isEnabled)=>{

    return useQuery(
        ['RestaruantsData',id],
        fetchRestaruantsData,
        {
            // cacheTime:5000, //5 sec. Default is 5 min
            onSuccess,
            onError,
            enabled: isEnabled,
            refetchOnWindowFocus: 'always',
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
                    idImage: Restaurant.imageproduct,
                    }

                ))
            }
        },
        
    )
}