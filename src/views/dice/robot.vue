<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />


</template>

<script>

import { diceRobotPage } from "@/api/dice/dice";
const robotStatusMap = {
  1: '空闲',
  2: '对局中',
}
export default {
  name: "level",
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
      option: {
        addBtn: false,
        border: true,
        align: 'center',
        menuAlign: 'center',
        menu: false,
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            dataType: 'number',
          },
          {
            label: "用户id",
            prop: "userId",
            span: 8,
            dataType: 'number',
            row: true,
            search: true
          },
          {
            label: "房间ID",
            prop: "roomId",
            span: 8,
            dataType: 'number',
            row: true,
            search: true
          },
          {
            label: "昵称",
            prop: "nickname",
            span: 8,
            row: true,
          },
          {
            label: "状态",
            prop: "status",
            span: 8,
            dataType: 'number',
            row: true,
            formatter: (_row, value) => {
              return robotStatusMap[value] || '未知'; //
            },
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
      diceRobotPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
