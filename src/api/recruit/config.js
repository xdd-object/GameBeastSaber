import request from '@/router/axios';

//分页查询拉新配置
export const pageConfig = (params) => {
  return request({
    url: '/cms/recruitConfig/page',
    method: 'get',
    params: params
  })
}

//新增配置
export const saveConfig = (data) => {
  return request({
    url: '/cms/recruitConfig/create',
    method: 'post',
    data: data
  })
}

//删除配置
export const deleteConfig = (data) => {
  return request({
    url: '/cms/recruitConfig/delete',
    method: 'post',
    data: data
  })
}

//更新配置
export const updateConfig = (data) => {
  return request({
    url: '/cms/recruitConfig/update',
    method: 'post',
    data: data
  })
}

