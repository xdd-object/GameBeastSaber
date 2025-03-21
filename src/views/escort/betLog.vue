<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { betLogPage } from "@/api/escort/escort";

// 1：等待中，2：已开始，3：已结束
const typeMap = {
  0: '未知',
  1: '宝石',
  2: '贝壳',
}


export default {
  name: "escortBetLog",
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
            label: "场次ID",
            prop: "venueId",
            span: 8,
            row: true,
            search: true
          },
          {
            label: "用户ID",
            prop: "userId",
            span: 8,
            width: 140,
            row: true,
            search: true
          },
          {
            label: "席位",
            prop: "seat",
            span: 8,
            row: true,
            search: true
          },
          {
            label: "下注类型",
            prop: "type",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
          },
          {
            label: "下注数量",
            prop: "num",
            span: 8,
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true,
            width: 140,
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
      betLogPage(this.query).then(res => {
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
