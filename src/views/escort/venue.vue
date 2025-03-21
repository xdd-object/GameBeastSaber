<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { venuePage } from "@/api/escort/escort";

// 1：等待中，2：已开始，3：已结束
const statusMap = {
  0: '未知',
  1: '等待中',
  2: '已开始',
  3: '已结束',
}


export default {
  name: "escortVenue",
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
            label: "id",
            prop: "id",
            span: 8,
            row: true
          },
          {
            label: "开始时间",
            prop: "startAt",
            span: 8,
            width: 140,
            row: true
          },
          {
            label: "被打劫船号",
            prop: "kill",
            span: 8,
            row: true
          },
          {
            label: "被杀执行的权重id",
            prop: "robberyId",
            span: 8,
            row: true
          },
          {
            label: "总人数",
            prop: "totalPeople",
            span: 8,
            row: true
          },
          {
            label: "宝石总金额",
            prop: "gemTotalNum",
            span: 8,
            row: true
          },
          {
            label: "贝壳总金额",
            prop: "shellTotalNum",
            span: 8,
            row: true
          },
          {
            label: "总奖励",
            prop: "totalReward",
            span: 8,
            row: true
          },
          {
            label: "游戏状态",
            prop: "status",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return statusMap[value] || '未知'; //
            },
          },
          {
            label: "宝石-1号船",
            prop: "gemSeat1",
            span: 8,
            row: true
          },
          {
            label: "宝石-2号船",
            prop: "gemSeat2",
            span: 8,
            row: true
          },
          {
            label: "贝壳-1号船",
            prop: "shellSeat1",
            span: 8,
            row: true
          },
          {
            label: "贝壳-2号船",
            prop: "shellSeat2",
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
      venuePage(this.query).then(res => {
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
