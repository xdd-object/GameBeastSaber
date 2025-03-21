import request from '@/router/axios';

export const levelConfig = (params) => {
  return request({
    url: '/go-api/cms/dice/levelConfig/page',
    method: 'get',
    params: params
  })
}

export const levelConfigSave = (data) => {
  return request({
    url: '/go-api/cms/dice/levelConfig/save',
    method: 'post',
    data: data
  })
}

export const diceUserPage = (params) => {
  return request({
    url: '/go-api/cms/dice/user/page',
    method: 'get',
    params: params
  })
}

export const roomConfigPage = (params) => {
  return request({
    url: '/go-api/cms/dice/room/page',
    method: 'get',
    params: params
  })
}

export const roomConfigSave = (data) => {
  return request({
    url: '/go-api/cms/dice/room/save',
    method: 'post',
    data: data
  })
}

export const tablePage = (params) => {
  return request({
    url: '/go-api/cms/dice/table/page',
    method: 'get',
    params: params
  })
}

export const tableUserPage = (params) => {
  return request({
    url: '/go-api/cms/dice/table/user',
    method: 'get',
    params: params
  })
}

export const gamePage = (params) => {
  return request({
    url: '/go-api/cms/dice/game/page',
    method: 'get',
    params: params
  })
}

export const gameRecord = (params) => {
  return request({
    url: '/go-api/cms/dice/game/record',
    method: 'get',
    params: params
  })
}

export const robotConfigPage = (params) => {
  return request({
    url: '/go-api/cms/dice/robot/config',
    method: 'get',
    params: params
  })
}

export const robotConfigSave = (data) => {
  return request({
    url: '/go-api/cms/dice/robot/config/save',
    method: 'post',
    data: data
  })
}

export const diceRobotPage = (params) => {
  return request({
    url: '/go-api/cms/dice/robot/page',
    method: 'get',
    params: params
  })
}

export const probabilityConfigPage = (params) => {
  return request({
    url: '/go-api/cms/dice/probabilityConfig/page',
    method: 'get',
    params: params
  })
}

export const probabilityConfigSave = (data) => {
  return request({
    url: '/go-api/cms/dice/probabilityConfig/save',
    method: 'post',
    data: data
  })
}

export const tableInfo = (params) => {
  return request({
    url: '/go-api/cms/dice/table/info',
    method: 'get',
    params: params
  })
}
