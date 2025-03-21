<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { reqRedpacketrVotePage } from "@/api/redPacket/index";


const statusRecordMap = {
  1: '充值积分',
  2: '提取积分',
  3: '发红包',
  4: '打开红包',
  5: '排行榜奖励',
}

const typeMap = {
  1: '收入',
  2: '支出',
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
            label: "期id",
            prop: "periodId",
            span: 8,
            row: true
          },
          {
            label: "期号",
            prop: "periodNo",
            search: true,
            span: 8,
            row: true
          },
          {
            label: "投票选项",
            prop: "option",
            span: 8,
            row: true,
          }, {
            label: "投票人数",
            prop: "num",
            span: 8,
            row: true,
          
          }, 
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true
          },
          
          {
            label: "更新时间",
            prop: "UpdatedAt",
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
      reqRedpacketrVotePage(this.query).then(res => {
        console.log(res, "resres");
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