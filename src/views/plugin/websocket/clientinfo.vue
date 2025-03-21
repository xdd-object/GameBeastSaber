<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               ref="crud"
               :permission="permissionList"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <!-- 列表左侧按钮 -->
      <template slot="menuLeft">
<!--        <el-button plain icon="el-icon-setting" size="small" @click="handleParamSettingMessageOpenDialog">
          参数设置
        </el-button>-->
        <el-button type="danger" plain icon="el-icon-user" size="small"
                   v-if="permission.plugin_websocket_clientinfo_force_logout" @click="handleForceLogoutMessage">
          强制下线
        </el-button>
      </template>
    </avue-crud>

    <!-- 参数设置 框体内容 -->
    <el-dialog title="参数设置" append-to-body :visible.sync="paramSettingDialogVisible" width="30%">
      <avue-form :option="paramSettingOption" v-model="paramSettingForm" @submit="handleParamSettingMessage"></avue-form>
    </el-dialog>

  </basic-container>
</template>

<script>
import {mapGetters} from "vuex";
import website from "@/config/website";
import {getList, paramSettingMessage, forceLogoutMessage} from "@/api/plugin/websocket/clientinfo";

export default {
  data() {
    return {
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        dialogWidth: 950,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        menu: false,
        menuWidth: 80,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
        selection: true,
        excelBtn: false,
        dialogClickModal: false,
        column: [
          {
            label: "所属租户",
            prop: "tenantId",
            type: "tree",
            dicUrl: "/api/blade-system/tenant/select",
            props: {
              label: "tenantName",
              value: "tenantId"
            },
            hide: !website.tenantMode,
            search: website.tenantMode,
            display: false,
          },
          {
            label: "系统主键",
            prop: "id",
            hide: true,
            display: false,
          },
          {
            label: "用户ID",
            prop: "userId",
            display: false,
          },
          {
            label: "用户名称",
            prop: "userName",
            search: true,
            display: false,
          },
          {
            label: "会话数量",
            prop: "sessionNum",
            type: "select",
            display: false,
          },
          {
            label: "在线状态",
            prop: "status",
            type: "select",
            dataType: "number",
            dicUrl: "/api/blade-websocket/client-info/dict/online",
            display: false,
          },
          {
            label: "更新时间",
            prop: "updateTime",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            display: false,
          }
        ],
      },
      data: [],
      paramSettingDialogVisible: false,
      paramSettingForm: {},
      paramSettingOption: {
        labelPosition: 'top',
        column: [
          {
            label: "参数内容",
            prop: "content",
            tip: "请严格输入 JSON 字符串",
            span: 24,
            minRows: 2,
            type: "textarea",
            rules: [{
              required: false,
              message: "请输入 参数内容",
              trigger: "blur"
            }]
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: false
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },

    /** 强制下线 */
    handleForceLogoutMessage() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确认强制用户下线?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        return forceLogoutMessage(this.ids);
      }).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.$refs.crud.toggleSelection();
      }).catch(() => {
      });
    },

    /** 打开参数设置弹窗 */
    handleParamSettingMessageOpenDialog(){
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.paramSettingDialogVisible = true;
    },
    /** 参数设置 */
    handleParamSettingMessage(form, done) {
      paramSettingMessage(this.ids, this.paramSettingForm.content).then(res => {
        this.$message.success(res.data.msg);
        this.paramSettingDialogVisible = false;
      }, error => {
        window.console.log(error);
      }).finally(() => {
        done();
      });
    },
  }
};
</script>

<style>
</style>
