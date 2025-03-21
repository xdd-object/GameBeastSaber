import request from '@/router/axios'

export function getTodayCrystalReport(){
  return request({
    url:'/api/blade-game-admin/admin/web/crystalHouse/getTodayCrystalReport',
    method:'get'
  })
}

export function listProperty(){
  return request({
    url:'/api/blade-game-admin/admin/web/crystalHouse/listProperty',
    method:'get'
  })
}

export function endListProperty(){
  return request({
    url:'/api/blade-game-admin/admin/web/crystalHouse/endListProperty',
    method:'get'
  })
}
