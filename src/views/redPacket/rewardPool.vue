<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { reqRedpacketRewardPool } from "@/api/redPacket/index";

const typeMap = {
  1: '收入',
  2: '支出',
}


const statusRecordMap = {
  1: '发出红包',
  3: '手续费',
  4: '发放排行榜奖励',
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
            label: "收支类型",
            prop: "transactionType",
            span: 8,
            row: true,
            type: 'select',
            search: true,

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '收入',
                value: 1,
              },
              {
                label: '支出',
                value: 2,
              },
            ]
          },
          {
            label: "业务类型",
            prop: "entityType",
            span: 8,
            search: true,

            row: true,
            type: 'select',

            formatter: (_row, value) => {
              return statusRecordMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '发出红包',
                value: 1,
              },
              {
                label: '手续费 ',
                value: 3,
              },
              {
                label: '发放排行榜奖励',
                value: 4,
              },
             
            ]
          }, 
          {
            label: "操作前数量",
            prop: "after",
            span: 8,
            row: true
          },
          
          {
            label: "操作数量",
            prop: "num",
            span: 8,
            row: true
          },
          {
            label: "操作后数量",
            prop: "before",
            span: 8,
            row: true,
          },  {
            label: "关联id",
            prop: "relationId",
            span: 8,
            row: true,
          },
          {
            label: "内容",
            prop: "content",
            span: 8,
            row: true
          },
          {
            label: "备注",
            prop: "remark",
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
      reqRedpacketRewardPool(this.query).then(res => {
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