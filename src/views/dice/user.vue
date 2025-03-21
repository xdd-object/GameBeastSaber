<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />


</template>

<script>

import { diceUserPage } from "@/api/dice/dice";

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
          }, {
            label: "用户id",
            prop: "userId",
            span: 8,
            dataType: 'number',
            row: true,
            search: true
          },
          {
            label: "等级",
            prop: "level",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "经验",
            prop: "exp",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "醉酒值",
            prop: "drunk",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "房间ID",
            prop: "roomId",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "牌桌ID",
            prop: "tableId",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "是否机器人",
            prop: "robot",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true
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
      diceUserPage(this.query).then(res => {
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
