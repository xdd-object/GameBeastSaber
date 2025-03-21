import request from '@/router/axios';

export const page = (params) => {
  return request({
    url: '/cms/freight/period/page',
    method: 'get',
    params
  })
}
