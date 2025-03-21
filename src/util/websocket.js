// ************** 注意事项 ************************************************
/*
1. 注意改动此js文件后，请ctrl+f5刷新连接，否则会造成websocket连接异常。
2. 主动调用close关闭后，会留存标识，请主动打开（调用initSocketConnection）或 刷新浏览器

开放方法说明：
a。initSocketConnection，用于 socket连接初始化，及成功/失败/消息回调的设置;
b. closeWebsocket, 关闭socket连接；
c. sendWebsocketMessage 发送消息
d。subscribeTopic，订阅主题
*/
// **************************************************************
import store from "@/store";
import {getToken} from "@/util/auth";
// 此处仅是根据不同环境引入websocket地址，VUE有自身的环境变量控制方式，不一定要从env中配置
// env中配置的方式，参考DOC文件中插件文档，消息插件集成 章节 Saber部分 env文件处理
import {websocketUrl} from "@/config/env";
// 全局使用websocket
let websocket = null;

// 自动检测任务ID
let websocketAutoCheck = {
  initiativeClose: false, // 主动关闭
  taskId: null, // 任务ID
  time: 10, // 单位：秒
  maxCount: 10, // 最大尝试次数
  retryCount: 0, // 当前重试次数
};

// 定时心跳信息
let websocketHeartbeatInfo = {
  taskId: null, // 心跳任务ID
  time: 10 // 单位：秒
};

// 消息事件回调
let callbackEvent = {
  openSuccessCallback: null,
  closeCallback: null,
  messageCallback: null
}
/**
 * 连接socket
 * @param openSuccessCallback 连接成功回调
 * @param closeCallback 连接关闭/断开回调
 * @param messageCallback 消息事件的回调
 */
export function initSocketConnection(openSuccessCallback, closeCallback, messageCallback) {
  // 无token信息，证明未登录
  if (!getToken()) {
    return;
  }

  if (websocket) {
    console.log("The websocket state is connected, not in processing.")
    setConnected(true);
    return;
  }

  console.log("------------------------ websocket connection start --------------------")
  websocketAutoCheck.initiativeClose = false; // 标记当前非主动关闭状态
  websocket = new WebSocket(websocketUrl, ["WebSocket", getToken()]);

  // 设置消息事件回调
  callbackEvent.openSuccessCallback = openSuccessCallback;
  callbackEvent.closeCallback = closeCallback;
  callbackEvent.messageCallback = messageCallback;

  /**
   * 打开连接
   * @param evt
   */
  websocket.onopen = (evt) => {
    console.log("websocket open event callback, event object,", evt)
    setConnected(true);
    if (callbackEvent.openSuccessCallback) {
      callbackEvent.openSuccessCallback();
    }
  };

  /**
   * 关闭连接
   * @param evt
   */
  websocket.onclose = function(evt) {
    console.log("websocket close event callback, event object,", evt)
    setConnected(false);
    console.log("------------------------ websocket connection close over--------------------")
  };
  /**
   * 接收消息
   * @param evt
   */
  websocket.onmessage = function(evt) {
    console.log("websocket received message,", evt);
    if (callbackEvent.messageCallback) {
      callbackEvent.messageCallback(evt.data);
    } else {
      console.log("Websocket message callback is not set and is not processed.");
    }
  };

}

/**
 * 设置连接状态
 * @param status true:已连接，false:已断开
 */
function setConnected(status){
  console.info("websocket setting current connection status:" + status);
  if (!status) { // 断开连接状态
    if (websocket != null) {
      websocket.close();
      websocket = null;
    }
    // 删除心跳
    if(websocketHeartbeatInfo.taskId) {
      console.log("Websocket heart stop to report automatically.")
      clearTimeout(websocketHeartbeatInfo.taskId);
      websocketHeartbeatInfo.taskId = null;
    }

    // 自动检测（任务ID为空，则开启，在状态为true时关闭检测）
    if (!websocketAutoCheck.initiativeClose && !websocketAutoCheck.taskId) {
      console.log("Websocket connection status begin to check automatically.")
      websocketAutoCheck.taskId = setInterval(autoCheckConnection, websocketAutoCheck.time * 1000);
    }
  } else {
    // 根据情况，是否开启心跳
    if (!websocketHeartbeatInfo.taskId) {
      console.log("Websocket heart begin to report automatically.")
      websocketHeartbeatInfo.taskId = setInterval(heartbeatDataReport, websocketHeartbeatInfo.time * 1000);
    }
    if (websocketAutoCheck.taskId) {
      console.log("Websocket connection status stop to check automatically.")
      clearTimeout(websocketAutoCheck.taskId);
      websocketAutoCheck.taskId = null;
      websocketAutoCheck.retryCount = 0;
    }
  }
}

/**
 * 发送心跳包
 */
function heartbeatDataReport(){
  console.debug("Websocket sending heartbeat packets.");
  let userInfo = store.getters.userInfo;
  let heartbeatData = {
    "header": {"tenantId": userInfo['tenant_id'], "userId": userInfo["user_id"], "msgId": "heartbeat", "flowId": new Date().getTime()},
    "body": {}
  };
  websocket.send(JSON.stringify(heartbeatData));
}

/**
 * 自动检测连接状态
 */
function autoCheckConnection(){
  if (websocket) {
    return;
  }
  websocketAutoCheck.retryCount++;
  // 到达最大尝试次数，清理定时任务，并弹窗提醒
  if (websocketAutoCheck.retryCount > websocketAutoCheck.maxCount) {
    console.log("The maximum number of attempts is reached. game over");
    if (websocketAutoCheck.taskId) {
      console.log("Websocket connection status stop to check automatically.")
      clearTimeout(websocketAutoCheck.taskId);
      websocketAutoCheck.taskId = null;
      websocketAutoCheck.retryCount = 0;
      if (callbackEvent.closeCallback) {
        callbackEvent.closeCallback();
      }
    }
    return;
  }

  console.log("The websocket state is not connection, start init processing. The current of retry-count value is " + websocketAutoCheck.retryCount)
  initSocketConnection(callbackEvent.openSuccessCallback, callbackEvent.closeCallback, callbackEvent.messageCallback);
}

/**
 * 关闭连接
 */
export function closeWebsocket(){
  if (websocket) {
    websocket.close();
  }
  websocketAutoCheck.initiativeClose = true; // 标记为主动关闭
  // 清理定时任务（检测和心跳机制）
  if (websocketAutoCheck.taskId) {
    clearTimeout(websocketAutoCheck.taskId);
    websocketAutoCheck.taskId = null;
    websocketAutoCheck.retryCount = 0;
  }

  // 删除心跳
  if(websocketHeartbeatInfo.taskId) {
    clearTimeout(websocketHeartbeatInfo.taskId);
    websocketHeartbeatInfo.taskId = null;
  }
}

/**
 * 发送websocket消息
 * @param flowId 流水号
 * @param msgId 消息ID
 * @param messageBody 消息体
 * @returns {boolean} 发送结果（不代表服务器处理成功，仅说明发送结果）
 */
export function sendWebsocketMessage(flowId, msgId, messageBody){
  if (!websocket) {
    return false;
  }
  let userInfo = store.getters.userInfo;
  if (!flowId) {
    flowId = new Date().getTime();
  }
  // 组装消息体
  let jsonData = {
    "header": {"tenantId": userInfo['tenant_id'], "userId": userInfo["user_id"], "msgId": msgId, "flowId": flowId},
    "body": messageBody
  };
  // 格式化发送
  websocket.send(JSON.stringify(jsonData));
}

/**
 * 订阅主题
 * @param topic
 */
export function subscribeTopic(flowId, topic, isCancel){
  console.log("send subscribeTopic topic message, flowId="+ flowId +" channelId=" + topic);
  sendWebsocketMessage("", "subscribe", {"topic": topic, "cancel": isCancel});
}

