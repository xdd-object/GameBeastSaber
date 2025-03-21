import request from '@/router/axios';

//新增商户
export const saveMerchant = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/merchant/saveMerchant',
    method: 'post',
    data: row
  })
}

//修改商户
export const merchantUpdate = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/merchant/update/{id}',
    method: 'post',
    data: row
  })
}

//商户详情
export const merchantDetail = (row) => {
  return request({
    url: '/api/blade-game-admin//admin/web/mall/merchant/{id}',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

//商户分页
export const merchantPage = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/merchant/page',
    method: 'post',
    data: row
  })
}

//更新商户启用状态
export const disabled = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/merchant/disabled/{id}',
    method: 'post',
    data: row
  })
}

//新增店铺选择商家
export const listMerchant = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/merchant/listMerchant',
    method: 'post',
    data: row
  })
}
