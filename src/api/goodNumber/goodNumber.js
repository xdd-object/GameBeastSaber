import request from '@/router/axios';

export const pageByGoodNumber = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/pageByGoodNumber',
    method: 'post',
    data: row
  })
}

export const saveGoodNumber = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/saveGoodNumber',
    method: 'post',
    data: row
  })
}

export const updateGoodNumber = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/updateGoodNumber',
    method: 'post',
    data: row
  })
}

export const deleteGoodNumber = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/deleteGoodNumber',
    method: 'post',
    data: row
  })
}

export const settingPrice = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/goodNumber/settingPrice',
    method: 'post',
    data: row
  })
}
