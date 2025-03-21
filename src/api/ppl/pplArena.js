import request from '@/router/axios';

//分页查询竞技场场次信息
export const pageArenaRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/ppl/arena/pageRoom',
    method: 'post',
    data: row
  })
}

//分页查询竞技场游戏记录
export const pageArenaRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/ppl/arena/pageRecord',
    method: 'post',
    data: row
  })
}




