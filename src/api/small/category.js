import request from '@/router/axios';

//分页查询分类
export const pageCategory = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/listPage',
    method: 'post',
    data: row
  })
}

//添加或修改分类
export const saveOrUpdate = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/saveOrUpdate',
    method: 'post',
    data: row
  })
}

//修改分类开关状态
export const updateStatus = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/updateStatus',
    method: 'post',
    data: row
  })
}

//删除分类
export const categoryDelete = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/delete',
    method: 'post',
    data: row
  })
}

//根据id查询分类
export const query = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/query',
    method: 'post',
    data: row
  })
}

//根据parentId查询分类
export const listNoPage = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/listNoPage',
    method: 'post',
    data: row
  })
}
// 查询parentId列表
export const reqparentIdList = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/mall/category/queryAll',
    method: 'get',

  })
}