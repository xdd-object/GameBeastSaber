import request from '@/router/axios';

export const recordList = (params) => {
    return request({
      url: '/api/blade-game-admin/admin/user/exp/recordList',
      method: 'post',
      data: params
    })
}