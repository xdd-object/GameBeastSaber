import request from '@/router/axios';

//分页查询场次信息
export const pageRoom = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/wall/room/pageRoom',
    method: 'post',
    data: row
  })
}

//分页查询游戏记录
export const pageRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/wall/room/pageRecord',
    method: 'post',
    data: row
  })
}

//分页查询道具记录
export const pagePropRecord = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/wall/room/pagePropRecord',
    method: 'post',
    data: row
  })
}

//处理记录
export const handlePlayRecord = (row) => {
  return request({
    url: '/api/blade-wall/admin/web/wall/room/handlePlayRecord',
    method: 'post',
    data: row
  })
}



//分页查询道具配置
export const pagePropConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/wall/room/pagePropConfig',
    method: 'post',
    data: row
  })
}


//机器人加入最新房间
export const robotEnterRoom = (row) => {
  return request({
    url: '/api/blade-wall/admin/web/wall/room/robotEnterRoom',
    method: 'post',
    data: row
  })
}

//机器人自动购买
export const robotBuyProp = (row) => {
  return request({
    url: '/api/blade-wall/admin/web/wall/room/robotBuyProp',
    method: 'post',
    data: row
  })
}

//机器人列表
export const pageRobotInfo = (row) => {
  return request({
    url: '/api/blade-wall/admin/web/wall/room/pageRobotInfo',
    method: 'post',
    data: row
  })
}



