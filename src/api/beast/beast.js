import request from '@/router/axios';

//
export const saveLuckyDrawConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/saveLuckyDrawConfig',
    method: 'post',
    data: row
  })
}

export const updateLuckyDrawConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/updateLuckyDrawConfig',
    method: 'post',
    data: row
  })
}

export const pageLuckyDrawConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/pageLuckyDrawConfig',
    method: 'post',
    data: row
  })
}

export const deleteLuckyDrawConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/deleteLuckyDrawConfig',
    method: 'post',
    data: row
  })
}


export const saveAchievementsConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/saveAchievementsConfig',
    method: 'post',
    data: row
  })
}

export const updateAchievementsConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/updateAchievementsConfig',
    method: 'post',
    data: row
  })
}

export const pageAchievementsConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/pageAchievementsConfig',
    method: 'post',
    data: row
  })
}

export const deleteAchievementsConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/beast/deleteAchievementsConfig',
    method: 'post',
    data: row
  })
}














