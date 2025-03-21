import request from '@/router/axios';

//
export const releaseLog = (params) => {
  return request({
    url: '/cms/freight/releaseLog',
    method: 'get',
    params
  })
}
