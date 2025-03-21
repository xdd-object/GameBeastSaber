import request from '@/router/axios';

//分页查询场次信息
export const pageRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/pull/room/pageRoom',
    method: 'post',
    data: row
  })
}

//分页查询游戏记录
export const pageRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/pull/room/pageRecord',
    method: 'post',
    data: row
  })
}

//分页查询道具记录
export const pagePropRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/pull/room/pagePropRecord',
    method: 'post',
    data: row
  })
}

//处理记录
export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-pull/admin/web/pull/room/handlePlayRecord',
    method: 'post',
    data: row
  })
}

//移动规则
export const listMoveRule = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/pull/room/listMoveRule',
    method: 'post',
    data: row
  })
}


//分页查询道具配置
export const pagePropConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/pull/room/pagePropConfig',
    method: 'post',
    data: row
  })
}



