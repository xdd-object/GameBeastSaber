import request from '@/router/axios';

//分组查询购买和喂养记录
export const pageMeatRecordGroupByMemberId = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/mythical/pageMeatRecordGroupByMemberId',
    method: 'post',
    data: row
  })
}


export const pageTravelEventConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageTravelEventConfig',
    method: 'post',
    data: row
  })
}

export const updateTravelEventConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/updateTravelEventConfig',
    method: 'post',
    data: row
  })
}

export const pageMythicalUser = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageMythicalUser',
    method: 'post',
    data: row
  })
}

export const pageTravelRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageTravelRecord',
    method: 'post',
    data: row
  })
}

export const listBattleConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/listBattleConfig',
    method: 'post',
    data: row
  })
}

export const updateBattleConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/updateBattleConfig',
    method: 'post',
    data: row
  })
}

export const pageBattleRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageBattleRoom',
    method: 'post',
    data: row
  })
}

export const pageBattleRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageBattleRecord',
    method: 'post',
    data: row
  })
}

export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-mythical/admin/mythical/battle/handlePlayRecord',
    method: 'post',
    data: row
  })
}

export const pageBattleUser = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageBattleUser',
    method: 'post',
    data: row
  })
}

export const pageTravelLog = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/game/mythical/pageTravelLog',
    method: 'post',
    data: row
  })
}