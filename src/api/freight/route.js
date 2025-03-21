import request from '@/router/axios';

//
export const list = (params) => {
  return request({
    url: '/cms/freight/route/list',
    method: 'get',
    params
  })
}

export const add = (data) => {
  return request({
    url: '/cms/freight/route/add',
    method: 'post',
    data: data
  })
}

//更新配置
export const update = (data) => {
  return request({
    url: '/cms/freight/route/update',
    method: 'post',
    data: data
  })
}

