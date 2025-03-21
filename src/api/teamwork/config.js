import request from '@/router/axios';

export const getRuleList = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/rule/list',
    method:'get',
    params:params
  })
}

export const ruleUpdate = (row) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/rule/edit',
    method: 'post',
    data: row
  })
}

export const getConfigList = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/config/list',
    method:'get',
    params:params
  })
}

export const configUpdate = (row) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/config/edit',
    method: 'post',
    data: row
  })
}

export const record = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/record',
    method:'get',
    params:params
  })
}

export const room = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/room',
    method:'get',
    params:params
  })
}

export const addRoom = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/room/add',
    method:'get',
    params:params
  })
}

export const getPackList = (params) => {
  return request({
    url: '/api/blade-mall/admin/web/mall/teamwork/pack',
    method:'get',
    params:params
  })
}
