import request from '@/router/axios';

//分页查询提供的物资
export const pageBorrow = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageBorrow',
    method: 'post',
    data: row
  })
}

//分页查询提供的物资详情
export const pageBorrowDetail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageBorrowDetail',
    method: 'post',
    data: row
  })
}

//分页查询提供的ZCoin
export const pageInvest = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageInvest',
    method: 'post',
    data: row
  })
}

//分页查询提供的ZCoin详情
export const pageInvestDetail = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageInvestDetail',
    method: 'post',
    data: row
  })
}

export const pageEveryDay = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageEveryDay',
    method: 'post',
    data: row
  })
}

export const pageInvestGroupByUserId = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageInvestGroupByUserId',
    method: 'post',
    data: row
  })
}

export const pageBorrowGroupByUserId = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/pageBorrowGroupByUserId',
    method: 'post',
    data: row
  })
}

export const queryUserData = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/loan/borrow/queryUserData',
    method: 'post',
    data: row
  })
}





