import request from '@/router/axios'

export function getpage(params) {
  return request({
    url:'/api/blade-game-admin/admin/web/user/hainan/getpage',
    method:'get',
    params:params
  })
}

export function backAmount(data) {
  return request({
    url:'/api/blade-game-admin/admin/web/user/hainan/backAmount',
    method:'post',
    data:data
  })
}
