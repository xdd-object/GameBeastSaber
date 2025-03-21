import request from '@/router/axios';

export const pageByGoodNumberConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/pageByGoodNumberConfig',
    method: 'post',
    data: row
  })
}

export const saveConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/saveConfig',
    method: 'post',
    data: row
  })
}

export const updateConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/updateConfig',
    method: 'post',
    data: row
  })
}

export const deleteConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/deleteConfig',
    method: 'post',
    data: row
  })
}

export const selectConfigList = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/selectConfigList',
    method: 'post',
    data: row
  })
}

export const settingConfigPrice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/settingConfigPrice',
    method: 'post',
    data: row
  })
}

