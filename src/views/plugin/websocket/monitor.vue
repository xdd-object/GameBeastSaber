<template>
  <basic-container>
    <div class="operate-area">
      <span>
        <el-button icon="el-icon-monitor" size="small" type="primary" v-if="!monitorStatus" @click="handleChangeMonitorStatus">
          开启监控
        </el-button>
        <el-button icon="el-icon-monitor" size="small" type="primary"  v-else @click="handleChangeMonitorStatus">
          关闭监控
        </el-button>
        <el-button plain icon="el-icon-delete" size="small" type="danger" :disabled="data.length<=0" @click="handleClearMonitorData">
          清空数据
        </el-button>
      </span>

      <span style="display:inline-block; margin-bottom: 5px; margin-left: 10px;">
        <el-input size="small" clearable placeholder="租户ID"
                  v-model="currentTenantId" v-if="userInfo['tenant_id'] === '000000'"
                  style="width: 100px; margin-right: 10px;"></el-input>
        <el-input size="small" clearable placeholder="输入后按<回车>检索关键词"
                  style="width: 210px;"
                  v-model="currentEnterVal" @keyup.enter.native="handleAddKeyword"></el-input>
        <el-tag v-for="key in keywords" :key="key" closable @close="handleDeleteKeyword(key)">{{key}}</el-tag>
      </span>

    </div>
    <div class="monitor-area">
      <el-scrollbar>
        <div v-for="(item, index) in viewData" :key="index" v-html="item"></div>
      </el-scrollbar>
    </div>
  </basic-container>
</template>

<script>
import {mapGetters} from "vuex";
import {sendWebsocketMessage} from "@/util/websocket";
import {EventBus, EventBusType} from "@/util/event-bus";
export default {
  data() {
    return {
      currentEnterVal: "",
      currentTenantId: "",
      data: [],
      viewData: [],
      keywords: [],
      maxCount: 10000,
      monitorStatus: false,
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
    'keywords'() {
      console.log("keyword changes, The value", this.keywords);
      if (this.keywords.length>0) {
        this.viewData = [];
        this.data.forEach((item) => this.viewData.push(this.heightLightText(item)));
      } else {
        this.viewData = this.data;
      }
    }
  },
  created() {
    console.log("userInfo", this.userInfo)
    this.currentTenantId = this.userInfo["tenant_id"];
    // 先$off注销事件，否避免导致多次监听问题
    EventBus.$off(EventBusType.WEBSOCKET_MONITOR).$on(EventBusType.WEBSOCKET_MONITOR, data => {
      if (this.data.length >= this.maxCount) {
        this.data.shift()
        this.viewData.shift()
      }
      this.data.push(data.body);
      this.viewData.push(this.heightLightText(data.body));
    });
  },
  methods: {
    /** 切换监控状态 */
    handleChangeMonitorStatus(){
      this.monitorStatus = !this.monitorStatus;

      sendWebsocketMessage( Date.now(), "monitor", {"targetStatus": this.monitorStatus, "tenantId": this.currentTenantId});
      this.$message.success("操作成功")
    },
    /** 清空数据 */
    handleClearMonitorData(){
      this.data = [];
      this.viewData = [];
    },
    /** 增加关键词 */
    handleAddKeyword(){
      if (!this.currentEnterVal) {
        return;
      }
      // 验证长度
      if (this.currentEnterVal.length > 20) {
        this.$message.warning('关键词长度不能超过20个字符！')
      }
      if (this.keywords.length > 5) {
        this.$message.warning('关键词数量不能超过5个！')
      }
      // 验证是否重复
      if (this.keywords && this.keywords.filter(item => item === this.currentEnterVal).length>0) {
        return;
      }
      //添加tag
      this.keywords.push(this.currentEnterVal);
      //清空输入框
      this.currentEnterVal = "";
    },
    /** 删除关键词 */
    handleDeleteKeyword(tag){
      this.keywords = this.keywords.filter(item => item !== tag);
    },
    /** 关键词 高亮 */
    heightLightText (text) {
      let content = JSON.stringify(text);
      this.keywords.forEach(key => {
        const reg = new RegExp(key, 'gi')// 动态正则表达式
        let replaceString = `<span style="color: #ed4014">`+ key +`</span>`
        content = content.replace(reg, replaceString);
      });
      return content;
    }
  }
};
</script>

<style>
.operate-area .el-tag {
  margin-right: 10px;
}
.monitor-area {
  margin-top: 5px;
  height: 500px;
  line-height: 25px;
  background-color: #d9d9d9;
}
</style>
