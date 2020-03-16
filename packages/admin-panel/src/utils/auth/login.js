//@flow
import axios from 'axios'

axios.defaults.withCredentials = true

export const login = async () => {
  // await axios.get('http://localhost:8000/airlock/csrf-cookie', {
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest'
  //   },
  //   withCredentials: true
  // })

  // await axios.post('http://localhost:8000/login', {
  //   email: 'nickhellemans93@gmail.com',
  //   password: 'admin'
  // })

  const response = await axios.get('http://localhost:8000/api/user')
  console.log(response.data)
}
