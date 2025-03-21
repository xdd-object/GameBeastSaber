import request from '@/router/axios';

export const sellList = (params) => {
    return request({
      url: '/api/blade-game-admin/admin/trade/sellList',
      method: 'post',
      data: params
    })
}
export const reqSellOrderDetails = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/sellOrderDetails',
    method: 'post',
    data: params
  })
}
export const reqCancelSellOrder = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/cancelSellOrder',
    method: 'post',
    data: params
  })
}
export const buyList = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/buyList',
    method: 'post',
    data: params
  })
}
export const reqBuyOrderDetails = (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/buyOrderDetails',
    method: 'post',
    data: params
  })
}
export const reqCancelBuyOrder= (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/cancelBuyOrder',
    method: 'post',
    data: params
  })
}
export const reqTypeList= (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/getTypeList',
    method: 'post',
    data: params
  })
}
export const reqConfig= (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/getConfig',
    method: 'post',
    data: params
  })
}
export const reqUpdateConfig= (params) => {
  return request({
    url: '/api/blade-game-admin/admin/trade/updateConfig',
    method: 'post',
    data: params
  })
}