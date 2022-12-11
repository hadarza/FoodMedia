import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'http://192.168.19.226:4000'
})