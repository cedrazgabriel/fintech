import axios from 'axios'
import { localStorageKeys } from '../config/localStorageKeys'
import { sleep } from '../utils/sleep'

export const httpClient = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
})

httpClient.interceptors.request.use( config => {
   const acessTokenJWT = localStorage.getItem(localStorageKeys.ACESS_TOKEN_JWT)

   if (acessTokenJWT){
      config.headers.Authorization = `Bearer ${acessTokenJWT}`
   }

   return config
})

httpClient.interceptors.response.use(async data => {
   await sleep(500)
   return data
})



