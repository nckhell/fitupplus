//@flow
import axios from 'axios'

export const api_client = axios.create({
  baseURL: process.env.API_DOMAIN,
  withCredentials: true
})

// api_client.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response.status === 401) {
//       console.log('UNAUTHORIZED')
//     }
//     return error
//   }
// )
