/**
 * 事件总线处理
 */
import Vue from 'vue'

/** 定义BUS组件 */
export const EventBus = new Vue();

/** 事件类型常量 */
export const EventBusType = {
    //  p2p 聊天消息
    P2P_CHAT: "p2p_chat",
    // 数据监控
    WEBSOCKET_MONITOR: "monitor",
    // 站内公告
    WEBSOCKET_NOTICE: "notice",
    WEBSOCKET_BIG_SCREEN: "bigScreen",
}