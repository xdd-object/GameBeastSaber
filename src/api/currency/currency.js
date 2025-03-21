import request from '@/router/axios'

export const pageUserCurrency = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/pageUserCurrency',
    method: 'post',
    data: row
  })
}


export const saveUserCurrency = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/saveUserCurrency',
    method: 'post',
    data: row
  })
}


export const pageTransferBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/pageTransferBlack',
    method: 'post',
    data: row
  })
}

export const saveTransferBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/saveTransferBlack',
    method: 'post',
    data: row
  })
}

export const deleteTransferBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/deleteTransferBlack',
    method: 'post',
    data: row
  })
}


export const pageSmsBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/pageSmsBlack',
    method: 'post',
    data: row
  })
}

export const saveSmsBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/saveSmsBlack',
    method: 'post',
    data: row
  })
}

export const deleteSmsBlack = (row) => {
  return request({
    url:'/api/blade-game-admin/admin/web/user/deleteSmsBlack',
    method: 'post',
    data: row
  })
}

