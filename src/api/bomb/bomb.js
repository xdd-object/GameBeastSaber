import request from '@/router/axios';

export const pageRoom = (row) => {
  return request({
    url: '/go/api/v1/bomb/room/page',
    method: 'post',
    data: row
  })
}

export const pageRecord = (row) => {
  return request({
    url: '/go/api/v1/bomb/seat/page',
    method: 'post',
    data: row
  })
}
export const setNowBombSeat = (id, seat) => {
  return request({
    url: '/go/api/v1/bomb/set_seat',
    method: 'post',
    data: {
      id : id,
      seat : seat,
    }
  })
}

export const pageMoveLogRecord = (row) => {
  return request({
    url: '/go/api/v1/bomb/move_log/page',
    method: 'post',
    data: row
  })
}

export const getConfigList = (row) => {
  return request({
    url: '/go/api/v1/bomb/config',
    method: 'post',
    data: row
  })
}

export const updateConfig = (row) => {
  return request({
    url: '/go/api/v1/bomb/upConfig',
    method: 'post',
    data: row
  })
}
