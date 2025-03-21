import request from '@/router/axios';

//分页查询场次信息
export const pageRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/tree/room/pageRoom',
    method: 'post',
    data: row
  })
}

//分页查询游戏记录
export const pageRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/tree/room/pageRecord',
    method: 'post',
    data: row
  })
}


//处理记录
export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-tree/admin/web/tree/room/handlePlayRecord',
    method: 'post',
    data: row
  })
}



