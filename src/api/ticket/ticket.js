import request from '@/router/axios';

export const pageTicketStatistics = (params) => {
  return request({
    url: '/cms/ticketStatistics/page',
    method: 'get',
    params: params
  })
}

export const pageTicketLotteryStatistics = (params) => {
  return request({
    url: '/cms/ticketLotteryStatistics/page',
    method: 'get',
    params: params
  })
}
