import request from '@/router/axios';

//添加商品
export const create = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/create',
    method: 'post',
    data: row
  })
}

//修改商品
export const update = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/update',
    method: 'post',
    data: row
  })
}

//查询商品列表
export const pageProduct = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/pageProduct',
    method: 'post',
    data: row
  })
}

//查看商品详情
export const detail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/detail',
    method: 'post',
    data: row
  })
}

//查看商品sku详情
export const skuList = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/skuList',
    method: 'post',
    data: row
  })
}

//修改商品sku信息
export const updateSku = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/updateSku',
    method: 'post',
    data: row
  })
}

//上下架商品
export const changeStatus = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/changeStatus',
    method: 'post',
    data: row
  })
}

//删除商品
export const deleteProduct = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/delete',
    method: 'post',
    data: row
  })
}

//审核失败，禁售的原因
export const reason = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/reason',
    method: 'post',
    data: row
  })
}

//查看已经被删除的商品（回收站）
export const deletedList = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/deletedList',
    method: 'post',
    data: row
  })
}

//恢复商品
export const restore = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/restore',
    method: 'post',
    data: row
  })
}

//彻底删除
export const thoroughDelete = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/product/thoroughDelete',
    method: 'post',
    data: row
  })
}

//修改商品sku信息
export const updateSkuDetail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/skuStock/update',
    method: 'post',
    data: row
  })
}