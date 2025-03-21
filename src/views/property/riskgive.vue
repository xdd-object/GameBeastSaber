<template>
  <basic-container>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @search-change="searchChange"
             @current-change="currentChange"
             @refresh-change="onLoad">
    <template #status="{row,status}">
      <el-tag v-if="row.status == 101" type="danger">{{abc(row.status)}}</el-tag>
      <el-tag v-else-if="row.status == 102" type="success">{{abc(row.status)}}</el-tag>
      <el-tag v-else>{{abc(row.status)}}</el-tag>
    </template>

      <template #menu="{size, row,index}">
        <el-button @click="updateStatus(row,index)"
                   v-if="row.status == 101"
                   text
                   type="primary"
                   :size="size">恢复正常</el-button>
      </template>

  </avue-crud>
  </basic-container>
</template>

<script>

import {pageRiskGive, updateStatus} from "@/api/property/property";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {statusMap} from "@/const/property/riskgive";


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
        memberId: null,
        phone: "",
        toMemberId: null,
        status: null,
      },
      data: [
      ],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        menuWidth: 150,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 8,
            row: true
          },
          {
            label: "用户id",
            prop: "memberId",
            span: 14,
            search: true,
            row: true
          },
          {
            label: "用户名称",
            prop: "name",
            span: 14,
            row: true
          },
          {
            label: "手机号",
            prop: "phone",
            search: true,
            row: true
          },
          {
            label: "交易金额",
            prop: "currentNum",
            row: true
          },
          {
            label: "对方用户id",
            prop: "toMemberId",
            row: true
          },
          {
            label: "对方用户名称",
            prop: "toMemberName",
            row: true
          },
          {
            label: "状态",
            prop: "status",
            search: true,
            // fixed: true,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return statusMap[value] ||'未知'; //
            },
            dicData: mapToOptions(statusMap)
          },
          {
            label: "账本id",
            prop: "accountbookId",
            row: true
          },
          {
            label: "转赠冻结id",
            prop: "giveFreezeId",
            row: true
          },
          {
            label: "处理时间",
            prop: "handleTime",
            row: true
          },
          {
            label: "入库时间",
            prop: "createTime",
            row: true
          }
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      pageRiskGive(this.query).then(res => {
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
    updateStatus (row) {
      this.$confirm('确认恢复正常？')
          .then(_ => {
            updateStatus(row).then(res => {
              this.onLoad();
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            })
          })
          .catch(_ => {});
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    abc(value) {
      return statusMap[value] ||'未知'; //
    }
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
