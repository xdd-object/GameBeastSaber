import request from '@/router/axios';

//分页查询订单
export const pageByOrder = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/orderQuery/pageByOrder',
    method: 'post',
    data: row
  })
}

//统计订单数量
export const countPageByOrder = (row) => {
  return request({
    url: '/api/blade-game-admin/orderQuery/countPageByOrder',
    method: 'post',
    data: row
  })
}

//查询订单详情
export const getById = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/orderQuery/getById',
    method: 'post',
    data: row
  })
}

//查询订单商品
export const getProductByOrderId = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/orderQuery/getProductByOrderId',
    method: 'post',
    data: row
  })
}

//查询订单收货地址
export const getOrderAddress = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/orderQuery/getOrderAddress',
    method: 'post',
    data: row
  })
}

export const delivery = (queryParam) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/orderQuery/delivery',
    method: 'post',
    data: queryParam
  })
}