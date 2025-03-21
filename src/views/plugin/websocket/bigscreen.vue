<template>
  <basic-container>
    <el-button icon="el-icon-monitor" size="small" type="primary" v-if="!bigScreenStatus" @click="handleBigScreen">订阅数据</el-button>
    <el-button icon="el-icon-monitor" size="small" plain type="primary" v-else @click="handleCloseBigScreen">取消订阅</el-button>
    <el-button icon="el-icon-monitor" size="small" plain type="primary" @click="handle">连接</el-button>
    <el-button icon="el-icon-monitor" size="small" plain type="primary" @click="closeSocket">断开连接</el-button>
    <el-button size="small" type="primary" @click="handleSendOnlineUser">模拟在线人数</el-button>
    <div>
      <div>收到的数据</div>
      <div v-for="(item, index) in data" :key="index">{{item}}</div>
    </div>
  </basic-container>
</template>

<script>
import {mapGetters} from "vuex";
import {sendWebsocketMessage, initSocketConnection, closeWebsocket} from "@/util/websocket";
import {EventBus, EventBusType} from "@/util/event-bus";
import request from "@/router/axios";
export default {
  data() {
    return {
      bigScreenStatus: false,
      data: []
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
      };
    },
  },
  watch: {
  },
  created() {

    // 先$off注销事件，否避免导致多次监听问题
    EventBus.$off(EventBusType.WEBSOCKET_BIG_SCREEN).$on(EventBusType.WEBSOCKET_BIG_SCREEN, data => {
      this.data.push(data);
    });
  },
  methods: {
    /** 订阅大屏数据 */
    handleBigScreen(){
      sendWebsocketMessage( Date.now(), "bigScreen", this.bigScreenStatus);
      this.bigScreenStatus = true;
    },
    handleCloseBigScreen(){
      sendWebsocketMessage( Date.now(), "bigScreen", this.bigScreenStatus);
      this.bigScreenStatus = false;
    },
    handle() {
      console.log("fsadfsaf");
      initSocketConnection();
    },

    openSuccessCallback() {
      console.log("websocket open success callback, exec callback.");
    },
    closeCallback() {
      console.log("websocket close callback, exec callback.");
    },
    notifyMessageCallback(data) {
      let messageContent = JSON.parse(data);
      console.log(messageContent)
      return;
    },
    closeSocket() {
      closeWebsocket();
    },

    /** 测试推送在线用户数 */
    handleSendOnlineUser(){
      request({
        url: '/api/blade-websocket/client-info/test/send/big-screen',
        method: 'post',
      }).then(()=>{
        this.$message.success("操作完成")
      });
    }
  }
};
</script>

<style>
</style>
