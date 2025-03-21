/*
 * @author: Liu
 * @LastEditors: Liu
 * @Date: 2021-09-22 15:44:50
 * @LastEditTime: 2022-01-10 16:54:34
 * @FilePath: \yidina_houtai\src\api\oss.js
 */
import request from '@/router/axios'

export function policy() {
  return request({
    url:'/api/blade-game-admin/aliyun/oss/policy',
    method:'get',
  })
}
export function policy_single(data){
  return request({
    url:"/api/blade-game-admin/aliyun/oss/simpleFileUpload",
    method:'post',
    data:data
  })
}
export function policys(data) {
  return request({
    url:'/api/blade-game-admin/aliyun/oss/multiFileUpload',
    method:'post',
    data:data
  })
}
