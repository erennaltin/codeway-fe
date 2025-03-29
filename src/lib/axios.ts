import { AuthService } from '@/services/AuthService'
import axios from 'axios'

const setDefaultAxios = () => {
  axios.defaults.headers.get['Pragma'] = 'no-cache'
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true
  setAuthorizeInterceptor()
}

const setAuthorizeInterceptor = () => {
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      if (error.status === 401) {
        AuthService.logoutUser()
      }
    }
  )
}

const setAxiosAuthorizationToken = (accessToken: string, userId: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  axios.defaults.headers.common['x-user-id'] = userId
}

export { setDefaultAxios, setAuthorizeInterceptor, setAxiosAuthorizationToken }
