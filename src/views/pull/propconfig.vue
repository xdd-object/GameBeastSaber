<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @row-update="rowUpdate"
             @row-save="rowSave"
             @row-del="rowDel"
             @on-load="onLoad"
             @refresh-change="onLoad"
             @search-change="searchChange"
             @current-change="currentChangeRecord"
  />

</template>

<script>

import {pagePropConfig} from "@/api/pull/pull";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {verifyStatusMap} from "@/const/mall/product";


const typeMap = {
  1: '道具',
  2: '喇叭',
}
export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 10
      },
      data: [
      ],
      query: {
        pageNum: 1,
        pageSize: 10,
        type: null,
      },
      option: {
        addBtn: false,
        delBtn: false,
        menu: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            addDisplay:false,
            editDisplay:false,
            row: true
          },
          {
            label: "道具类型",
            prop: "type",
            span: 14,
            row: true,
            type: 'select',
            search: true,
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(typeMap)
          },
          {
            label: "名称",
            prop: "name",
            span: 14,
            row: true
          },
          {
            label: "图片",
            prop: "img",
            type: "img",
            row: true
          },
          {
            label: "持续时间",
            prop: "second",
            row: true
          },
          {
            label: "拉力值",
            prop: "pull",
            row: true
          },
          {
            label: "每秒增加汗水值",
            prop: "sweatRate",
            row: true
          },
          {
            label: "价格",
            prop: "amount",
            row: true
          },
          {
            label: "排序",
            prop: "sort",
            row: true
          },
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      pagePropConfig(this.query).then(res => {
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
    currentChangeRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done();
    },
    rowUpdate(row, index, done, loading) {
      updateRule(row).then(() => {
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
    rowSave(row, done, loading) {
      saveRule(row).then(() => {
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
    rowDel(row, done, loading) {
      deleteRule(row).then(() => {
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
