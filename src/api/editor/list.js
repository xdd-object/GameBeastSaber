import request from '@/router/axios';

//查询富文本列表
export const reqPageRichText = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/pageRichText',
    method: 'post',
    data: row
  })
}

//添加富文本
export const reqSaveRichText = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/saveRichText',
    method: 'post',
    data: row
  })
}
//修改富文本
export const reqUpdateRichText = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/property/updateRichText',
    method: 'post',
    data: row
  })
}
