import request from '@/router/axios';

//分页查询店铺
export const pageShop = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/shop/pageShop',
    method: 'post',
    data: row
  })
}

//新增店铺
export const saveShop = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/shop/saveShop',
    method: 'post',
    data: row
  })
}

//根据id查询店铺
export const query = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/shop/query',
    method: 'post',
    data: row
  })
}

//根据id更新店铺
export const update = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/shop/update',
    method: 'post',
    data: row
  })
}

//新增商品选择店铺
export const listShop = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/shop/listShop',
    method: 'post',
    data: row
  })
}
