import request from '@/router/axios';

export const accountBookLog = (params) => {
    return request({
      url: '/api/blade-game-admin/admin/accountBook/accountBookLog',
      method: 'post',
      data: params
    })
}

export const accountBookType = () => {
  return request({
    url: '/api/blade-game-admin/admin/accountBook/accountBookType',
    method: 'get'
  })
}
