import request from '@/router/axios';

export const page = (params) => {
  return request({
    url: '/cms/freight/round/page',
    method: 'get',
    params
  })
}

export const loadPage = (params) => {
  return request({
    url: '/cms/freight/round/load',
    method: 'get',
    params
  })
}

