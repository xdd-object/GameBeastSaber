<template>
  <basic-container>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @search-change="searchChange"
             @row-save="rowSave"
             :permission="permissionList"
             @current-change="currentChange"
             @refresh-change="onLoad">

      <template #menu="{size, row,index}">
<!--        <el-button @click="tip(row,index)"-->
<!--                   text-->
<!--                   type="primary"-->
<!--                   :size="size">参与人列表</el-button>-->
      </template>

  </avue-crud>
  </basic-container>
</template>

<script>

import {pageDefeat, saveDefeat} from "@/api/kill/config";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";
import {typeMap, openMap, killRoomRuleMap} from "@/const/kill/kill"
// 0:新建，1:完成
const statusMap = {
  0: '新建',
  1: '完成',
}
const defeatTypeMap = {
  1: '自己',
  2: '团队',
}

export default {
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        num: null,
        type: null,
        killRoom: null,
        status: null,
      },
      data: [
      ],
      option: {
        searchShow: false,
        searchMenuSpan: 6,
        menuWidth: 150,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 8,
            search: true,
            addDisplay: false,
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
            span: 8,
            row: true,
            type: 'select',
            rules: [{
              required: true,
              trigger: "blur"
            }],
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(typeMap)
          },
          {
            label: "类型",
            prop: "defeatType",
            span: 8,
            row: true,
            type: 'select',
            rules: [{
              required: true,
              trigger: "blur"
            }],
            formatter: (_row, value)=> {
              return defeatTypeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(defeatTypeMap)
          },
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            rules: [{
              required: true,
              trigger: "blur"
            }],
            row: true
          },
          {
            label: "被杀总金额",
            prop: "defeatAmount",
            span: 8,
            addDisplay: false,
            row: true
          },
          {
            label: "状态",
            prop: "status",
            minRows: 8,
            span: 8,
            row: true,
            formatter: (_row, value)=> {
              return statusMap[value] ||'未知'; //
            },
            addDisplay: false,
            dicData: mapToOptions(statusMap)
          },
          {
            label: "开始时间",
            prop: "startTime",
            type: 'datetime',
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            minRows: 8,
            span: 8,
            rules: [{
              required: true,
              trigger: "blur"
            }],
            row: true
          },
          {
            label: "结束时间",
            prop: "endTime",
            minRows: 8,
            type: 'datetime',
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            span: 8,
            rules: [{
              required: true,
              trigger: "blur"
            }],
            row: true
          },
          {
            label: "创建时间",
            prop: "createTime",
            minRows: 8,
            span: 8,
            addDisplay: false,
            row: true
          },
          {
            label: "更新时间",
            prop: "updateTime",
            minRows: 8,
            span: 8,
            addDisplay: false,
            row: true
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.kill_defeat_add, false),
      };
    },
  },
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      pageDefeat(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    searchChange(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    queryRecord(params, done) {
      done();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    rowSave(row, done, loading) {
      saveDefeat(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
