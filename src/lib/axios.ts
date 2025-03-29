import axios from 'axios'

const setDefaultAxios = () => {
  axios.defaults.headers.get['Pragma'] = 'no-cache'
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true
}

const setAuthorizeInterceptor = () => {
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      if (error?.response?.data?.error === 'INVALID_TOKEN') {
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )
}

const setAxiosAuthorizationToken = (accessToken: string, userId: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  axios.defaults.headers.common['x-user-id'] = userId
}

export { setDefaultAxios, setAuthorizeInterceptor, setAxiosAuthorizationToken }
