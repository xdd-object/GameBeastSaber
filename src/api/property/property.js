import request from '@/router/axios';

export const listProperty = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/listProperty',
    method: 'post',
    data: row
  })
}

export const listPropertyDetail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/listPropertyDetail',
    method: 'post',
    data: row
  })
}

export const pageRiskGive = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/admin/riskGive/pageRiskGive',
    method: 'post',
    data: row
  })
}

export const updateStatus = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/admin/riskGive/updateStatus',
    method: 'post',
    data: row
  })
}

export const pplToday = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/pplToday',
    method: 'post',
    data: row
  })
}

export const listMonitorConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/listMonitorConfig',
    method: 'post',
    data: row
  })
}

export const listAccountBook = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/listAccountBook',
    method: 'post',
    data: row
  })
}

export const pageStatistics = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/ppl/arena/pageStatistics',
    method: 'post',
    data: row
  })
}

export const listAdConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/listAdConfig',
    method: 'post',
    data: row
  })
}


export const updateAdConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/updateAdConfig',
    method: 'post',
    data: row
  })
}

