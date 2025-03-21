/**
 * websocket 基础连接管理、消息处理
 * 1. 如果需要增加连接成功后处理内容，在此处独立方法添加；
 * 2. 对消息内容做处理，在 replyMessageType、 issuedMessageType 中定义消息的回调处理，建议使用eventbus方式通知其它页面处理；
 * 3. 如果只是发送消息和监听回调，则在其它页面直接引入@/util/websocket 下 sendWebsocketMessage 方法。
 * 4.
 */
import {EventBus, EventBusType} from "@/util/event-bus";
import {closeWebsocket, initSocketConnection, subscribeTopic} from "@/util/websocket";

export default function () {
    return {
        data() {
            return {
                // 右上角弹窗通知标题
                defaultNotifyTitle: "消息通知",
                /**
                 * 当前支持消息类型，未在此处定义的均为无效消息
                 * reply：代表服务回复消息，issued：代表服务器下发消息
                 * 消息对象包括三个属性，name: 消息名称；callback：消息回调事件处理；eventBusType：bus推送事件类型； callback、eventBusType 二选一定义即可
                 */
                replyMessageType: {
                    "subscribe": {
                        name: '频道订阅',
                        callback: this.replySubscribeCallback
                    }
                },
                issuedMessageType: {
                    "notice": {
                        name: "站内通知",
                        callback: this.issuedNoticeCallback
                    },
                    "forbidMCC": {
                        name: "登录互踢",
                        callback: this.issuedForbidMCCCallback
                    },
                    "p2p": {
                        name: "P2P消息",
                        callback: this.issuedP2PCallback
                    },
                    "monitor": {
                        name: "数据监控",
                        eventBusType: EventBusType.WEBSOCKET_MONITOR
                    },
                    "bigScreen": {
                        name: "大屏数据",
                        eventBusType: EventBusType.WEBSOCKET_BIG_SCREEN
                    },
                }
            }
        },
        created() {
            // 绑定页面监听（刷新、关闭）事件，初始化socks链接
            window.addEventListener('beforeunload', e => this.beforeunload(e));
            // 连接 Websocket
            initSocketConnection(this.openSuccessCallback, this.closeCallback, this.notifyMessageCallback);
        },
        destroyed() {
            // 解绑页面监听（刷新、关闭）事件
            window.removeEventListener('beforeunload', e => this.beforeunload(e));
        },
        methods: {
            /** 页面刷新、关闭事件处理 */
            beforeunload(e) {
                console.log('页面刷新或关闭，触发相关事件进行清理', e);
                closeWebsocket();
            },

            /** 连接成功 事件回调 */
            openSuccessCallback() {
                console.log("websocket open success callback, exec callback.");
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: this.defaultNotifyTitle,
                    message: "Websocket 服务连接成功"
                });
                this.sendSubscribeTopic();
            },
            /** 连接关闭 事件回调 */
            closeCallback() {
                console.log("websocket close callback, exec callback.");
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: this.defaultNotifyTitle,
                    message: "Websocket <b style='color:red;'>服务未连接</b>",
                    duration: 0
                });
            },

            /** 消息 事件回调 */
            notifyMessageCallback(data) {
                let messageContent = JSON.parse(data);
                // 根据 replyMsgId 属性 判断 回复还是下发
                if (messageContent.hasOwnProperty("replyMsgId")) {
                    this.replyMessageCallback(messageContent);
                    return;
                }

                // 服务器下发
                this.issuedMessageCallback(messageContent);
                return;
            },
            /** 服务器回复客户端消息 回调处理 */
            replyMessageCallback(data) {
                // 回复内容
                let supportType = this.replyMessageType;
                let msgId = data.replyMsgId;
                if (supportType.hasOwnProperty(msgId)) {
                    console.debug("[" + msgId + ":" + supportType[msgId].name + "]，服务回复，消息内容", data);
                    if (supportType[msgId].callback) {
                        supportType[msgId].callback(data);
                    } else if (supportType[msgId].eventBusType) {
                        EventBus.$emit(supportType[msgId].eventBusType, data);
                    }
                } else {
                    console.warn("[" + msgId + ":未知类型]，服务回复，丢弃，消息内容", data)
                }
            },
            /** 服务器下发消息 回调处理 */
            issuedMessageCallback(data) {
                // 服务器下发
                let supportType = this.issuedMessageType;
                let msgId = data.header.msgId;
                if (supportType.hasOwnProperty(msgId)) {
                    console.debug("[" + msgId + ":" + supportType[msgId].name + "]，服务下发，消息内容", data);
                    if (supportType[msgId].callback) {
                        supportType[msgId].callback(data.header, data.body);
                    } else if (supportType[msgId].eventBusType) {
                        EventBus.$emit(supportType[msgId].eventBusType, data);
                    }
                } else {
                    console.warn("[" + msgId + ":未知类型]，服务下发，丢弃，消息内容", data)
                }
            },

            /** 订阅主题 */
            sendSubscribeTopic() {
                console.log("setting user topic subscribe... ");
                let subscribeList = [];
                // 获取用户信息
                let tenantId = this.userInfo['tenant_id'];
                // 订阅公共主题
                subscribeList.push("/" + tenantId + "/public/1");
                // 循环订阅角色主题
                const roleIds = split(this.userInfo['role_id']);
                for (let i = 0; i < roleIds.length; i++) {
                    let item = roleIds[i];
                    subscribeList.push("/" + tenantId + "/role/" + item);
                }
                // 循环订阅部门主题
                const deptIds = split(this.userInfo['dept_id']);
                for (let i = 0; i < deptIds.length; i++) {
                    let item = deptIds[i];
                    subscribeList.push("/" + tenantId + "/dept/" + item);
                }
                // 循环订阅机构主题
                const postIds = split(this.userInfo['post_id']);
                for (let i = 0; i < postIds.length; i++) {
                    let item = postIds[i];
                    subscribeList.push("/" + tenantId + "/post/" + item);
                }
                // 订阅用户独立主题
                const userId = this.userInfo['user_id'];
                subscribeList.push("/" + tenantId + "/user/" + userId);

                subscribeTopic(new Date().getTime(), subscribeList.join(","));

                /**
                 * 字符串拆分
                 * @param str
                 * @returns {string[]|string}
                 */
                function split(str) {
                    return str ? String(str).split(',') : '';
                }
            },
            /** 订阅结果回调 */
            replySubscribeCallback(content) {
                let html = '用户频道 ' + (content.replyCode == 0 ? '订阅成功' : ('订阅失败，错误码' + content.replyCode + "</ br>"));
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: this.defaultNotifyTitle,
                    message: html
                });
            },

            /** 站内信下发 */
            issuedNoticeCallback(header, body) {
                console.debug(header)
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: this.defaultNotifyTitle,
                    message: '<b>标题：' + body.title + '</b> <br /> 收到一条通知消息，请点击进行查看未读消息。'
                });
                EventBus.$emit(EventBusType.WEBSOCKET_NOTICE, 1);
            },
            
            /**
             * 远程强制退出
             * 弹窗通知，并断开Websocket连接后退出至登录界面
             * @param type 掉线类型， 1：管理员下线； 2. 多端登录互踢；
             */
            remoteForceLogout(type) {
                // 弹窗通知
                let messageTips = "";
                if (type == 1) {
                    // 强制下线
                    messageTips = "管理员强制下线，当前 Websocket 连接<b style='color:red;'>已断开</b>";
                } else if (type == 2) {
                    // 登录互踢
                    messageTips = "其它终端登录，当前 Websocket 连接<b style='color:red;'>已断开</b>";
                }
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: this.defaultNotifyTitle,
                    message: messageTips,
                    duration: 0
                });
                // 关闭 Websocket 连接
                closeWebsocket();
                // 调用退出并跳转至登录界面
                this.$store.dispatch("LogOut").then(() => this.$router.push({path: '/login'}));
            },

            /** 多端登录互踢 */
            issuedForbidMCCCallback() {
                this.remoteForceLogout(2);
            },

            /** P2P 消息回调 */
            issuedP2PCallback(header, body) {
                let messageType = body.messageType;
                if (messageType == 1) {
                    this.remoteForceLogout(1);
                } else if (messageType == 2) {
                    EventBus.$emit(EventBusType.P2P_CHAT, {header, body});
                }
            },
        }
    }
}
