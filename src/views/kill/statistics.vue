<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="currentChange"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageStatistics} from "@/api/kill/config";
import {mapGetters} from "vuex";
import {typeMap} from "@/const/kill/kill"

export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 10
      },
      query: {
        "type": "",
        "date": "",
        "pageNum": 1,
        "pageSize": 10
      },
      data: [
      ],
      option: {
        addBtn: false,
        menu: false,
        column: [
          {
            label: "ID",
            prop: "id",
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
            search: true,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
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
          },
          {
            label: "日期",
            prop: "date",
            search: true,
            type:'date',
            valueFormat: 'yyyy-MM-dd',
            row: true,
          },
          {
            label: "当日共开期数",
            prop: "totalNum",
            row: true
          },
          {
            label: "当日总投注金额",
            prop: "totalAmount",
            minRows: 8,
            row: true
          },
          {
            label: "当日总被杀金额",
            prop: "killTotal",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "当日总佣金",
            prop: "totalCommission",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "当日最高投注额场次",
            prop: "maxTotalNum",
            minRows: 8,
            row: true
          },
          {
            label: "当日参与人数最多场次",
            prop: "maxPeopleNum",
            minRows: 8,
            row: true
          },
          {
            label: "当日纯利润最高人员ID",
            prop: "topIncomeUsers",
            minRows: 18,
            row: true,
            formatter: (_row, value)=> {
              if (value) {
                var arr = JSON.parse(value);
                let len = arr.length
                let res = "";
                for (let i = 0; i < len; i++) {
                  res = res + arr[i].memberId + ",";
                }
                return res;
              }
              return '无';
            }
          },
          {
            label: "异常：被杀没有扣除",
            prop: "alarmRecord1",
            minRows: 18,
            row: true,
            formatter: (_row, value)=> {
              if (value) {
                var arr = JSON.parse(value);
                let len = arr.length
                let res = "";
                for (let i = 0; i < len; i++) {
                  res = res + arr[i].memberId + ",";
                }
                return res;
              }
              return '无';
            }
          },
          {
            label: "异常：躲避成功收入小于投入",
            prop: "alarmRecord2",
            minRows: 18,
            row: true,
            formatter: (_row, value)=> {
              if (value) {
                var arr = JSON.parse(value);
                let len = arr.length
                let res = "";
                for (let i = 0; i < len; i++) {
                  res = res + arr[i].memberId + ",";
                }
                return res;
              }
              return '无';
            }
          },
          {
            label: "入库时间",
            prop: "createTime",
            minRows: 8,
            row: true
          }
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      pageStatistics(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
