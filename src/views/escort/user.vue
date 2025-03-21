<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { userPage } from "@/api/escort/escort";



export default {
  name: "escortUser",
  data() {
    return {
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        userId: 0,
      },
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        addBtn: false,
        menu: false,
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true
          },
          {
            label: "用户id",
            prop: "userId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "宝石总下注数",
            prop: "gemTotalNum",
            span: 8,
            row: true
          },
          {
            label: "贝壳总下注数",
            prop: "shellTotalNum",
            span: 8,
            row: true
          },
          {
            label: "宝石总奖励数(包含本金)",
            prop: "gemWinAmount",
            span: 8,
            row: true
          },
          {
            label: "贝壳总奖励数(包含本金)",
            prop: "shellWinAmount",
            span: 8,
            row: true
          },
          {
            label: "失败获得的弓箭数",
            prop: "losAmount",
            span: 8,
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

  methods: {
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
      userPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
