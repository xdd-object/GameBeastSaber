import request from '@/router/axios';

//房间信息
export const reqRedpacketRoom = (params) => {
    return request({
        url: '/go/v1/redpacket/room',
        method: 'get',
        params: params
    })
}
//用户积分

export const reqRedpacketUserPoint = (params) => {
    return request({
        url: '/go/v1/redpacket/userPoint/page',
        method: 'get',
        params: params
    })
}
//用户积分记录
export const reqRedpacketUserPointRecord = (params) => {
    return request({
        url: '/go/v1/redpacket/userPointRecord/page',
        method: 'get',
        params: params
    })
}
//场次记录
export const reqRedpacketPeriod = (params) => {
    return request({
        url: '/go/v1/redpacket/period/page',
        method: 'get',
        params: params
    })
}
//红包记录
export const reqRedpacketPage = (params) => {
    return request({
        url: '/go/v1/redpacket/packet/page',
        method: 'get',
        params: params
    })
}
//红包领取详情
export const reqRedpacketrReceiveInfo = (params) => {
    return request({
        url: '/go/v1/redpacket/packet/receiveInfo',
        method: 'get',
        params: params
    })
}
//每日排行榜
export const reqRedpacketrDailyRank = (params) => {
    return request({
        url: '/go/v1/redpacket/dailyRank/page',
        method: 'get',
        params: params
    })
}
//每周排行榜
export const reqRedpacketrWeekRank = (params) => {
    return request({
        url: '/go/v1/redpacket/weekRank/page',
        method: 'get',
        params: params
    })
}
//新增投票选项
export const reqRedpacketrVoteOptionsCreate = (row) => {
    return request({
        url: '/go/v1/redpacket/vote/options/create',
        method: 'post',
        data: row
    })
}
//更新投票选项
export const reqRedpacketrVoteOptionsUpdate = (row) => {
    return request({
        url: '/go/v1/redpacket/vote/options/update',
        method: 'post',
        data: row
    })
}
//投票选项列表
export const reqRedpacketrVoteOptionsPage= (params) => {
    return request({
        url: '/go/v1/redpacket/vote/options/page',
        method: 'get',
        params: params
    })
}
//投票结果列表
export const reqRedpacketrVotePage= (params) => {
    return request({
        url: '/go/v1/redpacket/vote/page',
        method: 'get',
        params: params
    })
}
//用户投票记录
export const reqRedpacketrVoteRecordPage= (params) => {
    return request({
        url: '/go/v1/redpacket/vote/record/page',
        method: 'get',
        params: params
    })
}
//奖池记录
export const reqRedpacketRewardPool= (params) => {
    return request({
        url: '/go/v1/redpacket/rewardPool/list',
        method: 'get',
        params: params
    })
}
//机器人资金池记录
export const reqRedpacketRobotPool= (params) => {
    return request({
        url: '/go/v1/redpacket/robotPool/list',
        method: 'get',
        params: params
    })
}
//机器人资金池记录
export const reqRedpacketStatistics= (params) => {
    return request({
        url: '/go/v1/redpacket/statistics',
        method: 'get',
        params: params
    })
}
