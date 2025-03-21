import request from '@/router/axios';

//
export const pageConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/config/pageConfig',
    method: 'post',
    data: row
  })
}

export const saveConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/config/saveConfig',
    method: 'post',
    data: row
  })
}

export const updateConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/config/updateConfig',
    method: 'post',
    data: row
  })
}

export const deleteConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/config/deleteConfig',
    method: 'post',
    data: row
  })
}

export const listConfigModule = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/config/listConfigModule',
    method: 'post',
    data: row
  })
}


export const listAppletMenu = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/listAppletMenu',
    method: 'post',
    data: row
  })
}

export const updateAppletMenu = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/updateAppletMenu',
    method: 'post',
    data: row
  })
}


export const pageNotice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/pageNotice',
    method: 'post',
    data: row
  })
}

export const saveNotice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/saveNotice',
    method: 'post',
    data: row
  })
}

export const updateNotice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/updateNotice',
    method: 'post',
    data: row
  })
}

export const deleteNotice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/common/deleteNotice',
    method: 'post',
    data: row
  })
}

export function listTeam(params){
  return request({
    url:'/api/blade-game-admin/admin/web/loan/team/listTeam',
    method:'post',
    params:params
  })
}
