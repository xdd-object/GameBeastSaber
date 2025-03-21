<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad"
    @row-save="rowSave" @row-update="rowUpdate" />

</template>

<script>

import { reqRedpacketrVoteOptionsPage, reqRedpacketrVoteOptionsCreate, reqRedpacketrVoteOptionsUpdate } from "@/api/redPacket/index";
import dayjs from 'dayjs'

const typeMap = {
  1: '开启',
  2: '关闭',
}
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
        roomId: null,
        num: null,
        type: null,
        killRoom: null,
        status: null,
      },
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: true,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        addBtn: true,
        menu: true,

        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            editDisplay: false,
            addDisplay: false,

          },
          {
            label: "状态",
            prop: "status",
            span: 8,
            row: true,
            type: 'select',

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '开启',
                value: 1,
              },
              {
                label: '关闭',
                value: 2,
              },
            ]
          },
          {
            label: "积分",
            prop: "num",
            span: 8,
            row: true
          },

        ]
      }
    };
  },
  computed: {},

  methods: {
    // 菜单管理模块
    rowSave(row, done, loading) {
      reqRedpacketrVoteOptionsCreate(row).then(() => {
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
    rowUpdate(row, index, done, loading) {
      reqRedpacketrVoteOptionsUpdate(row).then(() => {
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
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    sizeChange(pageSize) {
      this.query.pageSize = pageSize;
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done()

    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done()
    },
    onLoadRecord() {
      this.loading = true;
      reqRedpacketrVoteOptionsPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>