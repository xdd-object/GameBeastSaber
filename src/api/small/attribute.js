import request from '@/router/axios';

//查询属性分组列表
export const categoryList = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/categoryList',
    method: 'post',
    data: row
  })
}

//添加或修改商品属性分组
export const saveOrUpdateCategory = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/saveOrUpdateCategory',
    method: 'post',
    data: row
  })
}

//删除商品属性分组
export const deleteCategory = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/deleteCategory',
    method: 'post',
    data: row
  })
}

//查询属性列表
export const list = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/list',
    method: 'post',
    data: row
  })
}

//查询属性详情
export const detail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/detail',
    method: 'post',
    data: row
  })
}

//删除属性
export const deletes = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/delete',
    method: 'post',
    data: row
  })
}

//添加或修改属性
export const saveOrUpdate = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/saveOrUpdate',
    method: 'post',
    data: row
  })
}

//查询属性列表不分页
export const listNoPage = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/productAttr/listNoPage',
    method: 'post',
    data: row
  })
}
