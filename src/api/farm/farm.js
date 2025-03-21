import request from '@/router/axios';

//
export const farmConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/farmConfig',
    method: 'post',
    data: row
  })
}

//
export const listLandConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/listLandConfig',
    method: 'post',
    data: row
  })
}

//
export const listSeedConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/listSeedConfig',
    method: 'post',
    data: row
  })
}

//
export const pageUserLand = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/pageUserLand',
    method: 'post',
    data: row
  })
}

export const pageUserSeed = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/pageUserSeed',
    method: 'post',
    data: row
  })
}

export const pageUnlockSeed = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/pageUnlockSeed',
    method: 'post',
    data: row
  })
}

export const pageUserLandRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/pageUserLandRecord',
    method: 'post',
    data: row
  })
}

export const pageUserSeedRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/pageUserSeedRecord',
    method: 'post',
    data: row
  })
}

export const updateFarmConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/updateFarmConfig',
    method: 'post',
    data: row
  })
}

//
export const updateLandConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/updateLandConfig',
    method: 'post',
    data: row
  })
}

//
export const updateSeedConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/farm/updateSeedConfig',
    method: 'post',
    data: row
  })
}



