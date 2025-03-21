import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/config/list',
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
    url: '/api/blade-game-admin/admin/web/game/kill/config/pageRoom',
    method: 'post',
    data: row
  })
}


export const pageRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/config/pageRecord',
    method: 'post',
    data: row
  })
}

export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-kill/admin/web/game/kill/config/handlePlayRecord',
    method: 'post',
    data: row
  })
}

export const todayStatistics = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/room/todayStatistics',
    method: 'post',
    data: row
  })
}

export const totalStatistics = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/room/totalStatistics',
    method: 'post',
    data: row
  })
}

export const pageStatistics = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/statistics/pageStatistics',
    method: 'post',
    data: row
  })
}

export const pageDefeat = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/defeat/page',
    method: 'post',
    data: row
  })
}

export const saveDefeat = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/defeat/saveDefeat',
    method: 'post',
    data: row
  })
}

export const updateWebGameKillConfig = (row) => {
  return request({
    url: '/api/blade-kill/admin/web/game/kill/config/updateWebGameKillConfig',
    method: 'post',
    data: row
  })
}
export const reqPageWeight = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/config/pageWeight',
    method: 'post',
    data: row
  })
}
export const reqUpdateWeight = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/kill/config/updateWeight',
    method: 'post',
    data: row
  })
}