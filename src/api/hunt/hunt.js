import request from '@/router/axios';

//
export const pageHuntValue = (row) => {
  return request({
    url: '/api/blade-game-admin/web/farm/hunt/pageHuntValue',
    method: 'post',
    data: row
  })
}

export const pageHuntUser = (row) => {
  return request({
    url: '/api/blade-game-admin/web/farm/hunt/pageHuntUser',
    method: 'post',
    data: row
  })
}

export const pageHuntFinance = (row) => {
  return request({
    url: '/api/blade-game-admin/web/farm/hunt/pageHuntFinance',
    method: 'post',
    data: row
  })
}




