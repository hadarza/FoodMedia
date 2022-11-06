import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.226:4000'
})