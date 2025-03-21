<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @row-save="rowSave"
             @row-del="rowDel"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageTransferBlack, saveTransferBlack, deleteTransferBlack} from "@/api/currency/currency";
import {mapGetters} from "vuex";
import {wayMap} from "@/const/currency/currency";
import {mapToOptions} from "@/util/common";
import {accountBookType} from "@/api/accountbook/accountbook";

export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      data: [
      ],
      typeMap: {},
      option: {
        delBtn: true,
        editBtn: false,
        menuWidth: 150,
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: true,
        column:[
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            addDisplay:false,
          },
          {
            label: "用户id",
            prop: "userId",
            span: 8,
            search: true,
            row: true,
            rules: [
              {
                required: true,
                message: "请输入用户id",
                trigger: "blur"
              }
            ]
          },
          {
            label: "类型",
            prop: "way",
            type: 'select',
            formatter: (_row, value) =>{
              return wayMap[value] ||'未知';
            },
            row: true,
            dicData:mapToOptions(wayMap),
            rules: [
              {
                required: true,
                message: "请选择类型",
                trigger: "blur"
              }
            ],
          },
          {
            label: "备注",
            prop: "remark",
            row: true,
          },
          {
            label: "创建时间",
            prop: "createTime",
            addDisplay:false,
          },
        ]
      }
    };
  },
  computed: {},
  created() {
    this.onLoadRecord()
  },
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done();
    },
    onLoadRecord() {
      this.loading = true;
      pageTransferBlack(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowSave(row, done, loading) {
      console.info("fsfsafd", row)
      saveTransferBlack(row).then(res => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: res.data.msg
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            return deleteTransferBlack(row);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
