import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'http://192.168.113.226:4000'
})