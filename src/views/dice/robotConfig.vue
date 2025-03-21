<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" @row-update="rowUpdate"
    @row-save="rowSave">
    <template #page>
      <el-tag>机器人资金池: {{ pool }}</el-tag>
    </template>
  </avue-crud>

</template>

<script>

import { robotConfigPage, robotConfigSave } from "@/api/dice/dice";

export default {
  name: "robotConfig",
  data() {
    return {
      pool: 0,
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      data: [
      ],
      option: {
        addBtn: true,
        menu: true,
        delBtn: false,
        editBtn: true,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
            dataType: 'number',
            editDisabled: true,
          }, {
            label: "资金池最小值",
            prop: "poolMin",
            span: 8,
            row: true
          },
          {
            label: "资金池最大值",
            prop: "poolMax",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "必胜机器人比例(百分比)",
            prop: "winRate",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "随机机器人比例(百分比)",
            prop: "randRate",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "概率机器人比例(百分比)",
            prop: "probabilityRate",
            span: 8,
            dataType: 'number',
            row: true
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.onLoadRecord()
  },
  methods: {
    onLoad() {
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
      robotConfigPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.pool = data.pool
        this.loading = false;
      });
    },
    rowUpdate(row, index, done, loading) {
      robotConfigSave(row).then(() => {
        this.onLoad();
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
      robotConfigSave(row).then(() => {
        this.onLoad();
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

<style scoped="scoped" lang="scss"></style>
