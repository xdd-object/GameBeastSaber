import request from '@/router/axios';

//分页查询报名列表
export const pageSignup = (params) => {
  return request({
    url: '/cms/recruitSignup/page',
    method: 'get',
    params: params
  })
}

