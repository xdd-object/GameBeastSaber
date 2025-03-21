import request from '@/router/axios';

//
export const pageUser = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/pageUser',
    method: 'post',
    data: row
  })
}

export const pageUserMember = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/pageUserMember',
    method: 'post',
    data: row
  })
}

export const pageVipOrder = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/pageVipOrder',
    method: 'post',
    data: row
  })
}

export const listGradeConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/listGradeConfig',
    method: 'post',
    data: row
  })
}

export const updateGradeConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateGradeConfig',
    method: 'post',
    data: row
  })
}

export const disableUser = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/disableUser',
    method: 'post',
    data: row
  })
}

export const enableUser = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/enableUser',
    method: 'post',
    data: row
  })
}

export const realName = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/realName',
    method: 'post',
    data: row
  })
}

export const pageUserLevel = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/pageUserLevel',
    method: 'post',
    data: row
  })
}

export const register = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/register',
    method: 'post',
    data: row
  })
}

export const replaceBinding = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/replaceBinding',
    method: 'post',
    data: row
  })
}

export const listVipConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/listVipConfig',
    method: 'post',
    data: row
  })
}

export const updateVipConfig = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateVipConfig',
    method: 'post',
    data: row
  })
}

export const listVersion = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/listVersion',
    method: 'post',
    data: row
  })
}

export const updateVersion = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateVersion',
    method: 'post',
    data: row
  })
}

export const multipleInvitees = (row) => {
  return request({
    url: '/api/blade-ranch-user/admin/user/multipleInvitees',
    method: 'post',
    data: row
  })
}


export const updateUserGrade = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateUserGrade',
    method: 'post',
    data: row
  })
}

export const updateUserNickname = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateUserNickname',
    method: 'post',
    data: row
  })
}


export const updateUserPhone = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateUserPhone',
    method: 'post',
    data: row
  })
}


export const updateUserPassword = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateUserPassword',
    method: 'post',
    data: row
  })
}


export const updateUserPayPassword = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateUserPayPassword',
    method: 'post',
    data: row
  })
}

export const resetUserFreeze = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/resetUserFreeze',
    method: 'post',
    data: row
  })
}

export const updateAnchor = (row) => {
  return request({
    url: '/api/blade-game-admin/admin/web/user/updateAnchor',
    method: 'post',
    data: row
  })
}
