import request from '@/router/axios';
export const pageRoom = (row) => {
  return request({
    url: '/api/blade-aircraft/admin/web/game/aircraft/room',
    method: 'post',
    data: row
  })
}
export const pageRecord = (row) => {
  return request({
    url: '/api/blade-aircraft/admin/web/game/aircraft/record',
    method: 'post',
    data: row
  })
}
export const getList = (params) => {
  return request({
    url: '/api/blade-aircraft/admin/web/game/aircraft/config/info',
    method: 'get',
    params: params
  })
}
export const handlePlayRecord = (params) => {
  return request({
    url: '/api/blade-aircraft/admin/web/game/aircraft/handle',
    method: 'get',
    params: params
  })
}
export const updateConfig = (row) => {
  return request({
    url: '/api/blade-aircraft/admin/web/game/aircraft/config/edit',
    method: 'post',
    data: row
  })
}
export const reqStrategyList = (params) => {
  return request({
    url: `/api/blade-aircraft/admin/web/game/aircraft/rule/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'get',
    // params: params
  })
}
export const reqStrategyRuleAdd = (row) => {
  return request({
    url: `/api/blade-aircraft/admin/web/game/aircraft/rule/add`,
    method: 'post',
    data: row
  })
}
export const reqStrategyUppdate = (row) => {
  return request({
    url: `/api/blade-aircraft/admin/web/game/aircraft/rule/edit`,
    method: 'post',
    data: row
  })
}
export const reqJoinRecordList = (params) => {
  return request({
    url: `/api/blade-aircraft/admin/web/game/aircraft/record/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'get',
  })
}
