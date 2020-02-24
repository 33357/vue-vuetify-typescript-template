import axios from 'axios'
import { Message } from '@/plugins'
import { UserModule } from '@/store/modules/user'
import { REQUEST_CANCEL, RESOLVED_ERROR } from '@/utils/handleErrors'

// 正在进行的请求列表,用于中断请求
export const requestCancelList: any[] = []

/**
 * 实例化一个http请求
 * @baseURL url = baseURL + request url
 * @timeout 超时时间 ms
 * @withCredentials 是否允许跨域请求携带cookie
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['token'] = UserModule.token
    }
    // 保留正在进行的请求
    config.cancelToken = new axios.CancelToken(cancel => {
      requestCancelList.push({ cancel })
    })

    return config
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(REQUEST_CANCEL)
    }
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    // 根据api实际情况自行判断
    const res = response.data
    const isLogout = [50008, 50012, 50014].includes(res.code)
    if (isLogout) {
      Message.alert(
        '你已被登出，即将跳转到登录页面',
        '提示',
        {
          confirmButtonText: '确定'
        }
      ).finally(() => {
        UserModule.ResetToken()
        location.reload() // To prevent bugs from vue-router
      })
      return Promise.reject(RESOLVED_ERROR)
    }
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(REQUEST_CANCEL)
    }
    return Promise.reject(error)
  }
)

export default service
