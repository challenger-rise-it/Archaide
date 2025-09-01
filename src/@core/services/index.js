import axios from 'axios'
import { API_ENDPOINT } from '../config'

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
})

axiosClient.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  },
)
