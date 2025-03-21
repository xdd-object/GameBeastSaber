import request from '@/router/axios';

/**
 * 获取在线客户列表
 * @param current
 * @param size
 * @param params
 * @returns {*}
 */
export const getList = (current, size, params) => {
    return request({
        url: '/api/blade-websocket/client-info/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}
/**
 * 强制下线
 * @param ids
 * @returns {*}
 */
export const forceLogoutMessage = (ids) => {
    return request({
        url: '/api/blade-websocket/client-info/send/p2p/force-logout',
        method: 'post',
        params: {
            ids
        }
    })
}

/**
 * 参数设置
 * @param ids
 * @param content
 * @returns {*}
 */
export const paramSettingMessage = (ids, content) => {
    return request({
        url: '/api/blade-websocket/client-info/send/p2p/param-setting',
        method: 'post',
        params: {
            ids,
            content
        }
    })
}

/**
 * 聊天消息
 * @param userId
 * @param content
 * @returns {*}
 */
export const sendChatMessage = (id, content) => {
    return request({
        url: '/api/blade-websocket/client-info/send/p2p/chat',
        method: 'post',
        params: {
            id,
            content
        }
    })
}