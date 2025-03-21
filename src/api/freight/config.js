import request from '@/router/axios';

//
export const list = () => {
  return request({
    url: '/cms/freight/config',
    method: 'get',
  })
}

//更新配置
export const update = (data) => {
  return request({
    url: '/cms/freight/config/update',
    method: 'post',
    data: data
  })
}

