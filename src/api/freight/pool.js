import request from '@/router/axios';

//
export const periodPoolList = (params) => {
  return request({
    url: '/cms/freight/period/pool',
    method: 'get',
    params
  })
}

export const typePoolList = (params) => {
  return request({
    url: '/cms/freight/type/pool',
    method: 'get',
    params
  })
}
