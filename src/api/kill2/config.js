import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill2/config/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const pageRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill2/config/pageRoom',
    method: 'post',
    data: row
  })
}


export const pageRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill2/config/pageRecord',
    method: 'post',
    data: row
  })
}

export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-kill2/admin/web/game/kill2/config/handlePlayRecord',
    method: 'post',
    data: row
  })
}


export const reqPageWeight = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill2/config/pageWeight',
    method: 'post',
    data: row
  })
}
export const reqUpdateWeight = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill2/config/updateWeight',
    method: 'post',
    data: row
  })
}