import request from '@/router/axios';

export const page = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/team/page',
    method: 'post',
    data: params
  })
}

export const listTeam = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/team/list',
    method: 'post',
    data: params
  })
}

export const saveTeam = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/team/saveTeam',
    method: 'post',
    data: params
  })
}
