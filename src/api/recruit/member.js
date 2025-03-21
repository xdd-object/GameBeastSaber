import request from '@/router/axios';

//分页查询拉新用户列表
export const pageMember = (params) => {
  return request({
    url: '/cms/recruitMember/page',
    method: 'get',
    params: params
  })
}

