<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />

</template>

<script>

import { pageRecord } from "@/api/kill/config";
import dayjs from 'dayjs'
import { mapGetters } from "vuex";
import { typeMap, statusRecordMap } from "@/const/kill/kill"

// 0:未开始，1:已开始 2：结束中 3：已结束


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
        column: [
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            search: true,
            row: true
          }, {
            label: "用户名",
            prop: "nickname",
            span: 8,
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: 'ZCoin场',
                value: 1,
              },
              {
                label: '金豆场',
                value: 2,
              },
            ]
          }, {
            label: "期数",
            prop: "num",
            span: 8,
            row: true
          }, {
            label: "选择的房间",
            prop: "room",
            span: 8,
            row: true
          }, {
            label: "被杀房间",
            prop: "killRoom",
            span: 8,
            row: true
          }, {
            label: "金额",
            prop: "amount",
            span: 8,
            row: true
          }, {
            label: "收益",
            prop: "totalAmount",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return value || 0; //
            }
          }
          , {
            label: "状态",
            prop: "status",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return statusRecordMap[value] || '未知'; //
            },
          },
          {
            label: "时间",
            prop: "createTime",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return dayjs(Number(value)).format('YYYY-MM-DD HH:mm:ss') || '未知'; //
            },
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
    onLoad(page, params = {}) {
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
      pageRecord(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
