import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'http://10.100.102.33:4000'
})