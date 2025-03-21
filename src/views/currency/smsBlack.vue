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

import {pageSmsBlack, saveSmsBlack, deleteSmsBlack} from "@/api/currency/currency";
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
            label: "手机号",
            prop: "phone",
            span: 8,
            search: true,
            row: true,
            rules: [
              {
                required: true,
                message: "请输入手机号",
                trigger: "blur"
              }
            ]
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
      pageSmsBlack(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowSave(row, done, loading) {
      console.info("fsfsafd", row)
      saveSmsBlack(row).then(res => {
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
            return deleteSmsBlack(row);
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
