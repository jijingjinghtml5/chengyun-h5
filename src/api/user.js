import { userApi } from './index'
// axios
import request from '@/utils/request'

// 登录
export function fetchLogin(data) {
  return request({
    url: userApi.Login,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    data
  })
}

// 用户名称 get 方法
export function getUserName(params) {
  return request({
    url: userApi.UserName,
    method: 'get',
    params,
    hideloading: true
  })
}
