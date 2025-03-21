import request from '@/router/axios';

export const configList = (query) => {
  return request({
    url: '/go/api/v1/escort/config/list',
    method: 'get',
    params: query
  })
}

export const configSave = (row) => {
  return request({
    url: '/go/api/v1/escort/config/save',
    method: 'post',
    data: row
  })
}

export const robberyConfigList = (query) => {
  return request({
    url: '/go/api/v1/escort/robberyConfig/list',
    method: 'get',
    params: query
  })
}

export const robberyConfigSave = (row) => {
  return request({
    url: '/go/api/v1/escort/robberyConfig/save',
    method: 'post',
    data: row
  })
}

export const userPage = (query) => {
  return request({
    url: '/go/api/v1/escort/user/page',
    method: 'get',
    params: query
  })
}


export const venuePage = (query) => {
  return request({
    url: '/go/api/v1/escort/venue/page',
    method: 'get',
    params: query
  })
}

export const betLogPage = (query) => {
  return request({
    url: '/go/api/v1/escort/betLog/page',
    method: 'get',
    params: query
  })
}
