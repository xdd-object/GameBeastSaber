import request from '@/router/axios'

export function getYangTypeFinanceList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/finance/getYangTypeFinanceList',
    method:'get',
    params:params
  })
}

export function getYangTypeFinanceSmsList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/finance/getYangTypeFinanceSmsList',
    method:'get',
    params:params
  })
}

export function addYangTypeFinanceSms(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/finance/addYangTypeFinanceSms',
    method:'post',
    data:ppl
  })
}
