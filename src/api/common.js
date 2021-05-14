import request from '@/utils/request'

import { commonApi } from './index'
// axios

// 上传图片
export function uploadImage(data) {
  return request({
    url: commonApi.UploadImage,
    method: 'post',
    data
  })
}

// 根据图片获取智能信息
export function getImageAiInfo(data) {
  return request({
    url: commonApi.ImageAiInfo,
    method: 'post',
    data
  })
}

// 获取案件分类
export function getCaseType(params) {
  return request({
    url: commonApi.EventTypes,
    method: 'get',
    params
  })
}
