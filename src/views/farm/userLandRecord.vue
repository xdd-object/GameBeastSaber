<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageUserLandRecord} from "@/api/farm/farm";
import {mapGetters} from "vuex";
import {seedIdMap} from "@/const/farm/farm";
import {mapToOptions} from "@/util/common";

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
      },
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: false,
        column:[
          {
            label: "用户id",
            prop: "userId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "地块编号",
            prop: "number",
            span: 8,
            row: true
          },
          {
            label: "种子id",
            prop: "seedId",
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return seedIdMap[value] ||'未知'; //
            },
            dicData: mapToOptions(seedIdMap)
          },
          {
            label: "领取次数",
            prop: "collectNum",
          },
          {
            label: "奖励基数",
            prop: "rewardAmount",
          },
          {
            label: "当前已领取收益",
            prop: "curIncome",
          },
          {
            label: "每次领取收益",
            prop: "everyIncome",
          },
          {
            label: "总共可领取收益",
            prop: "totalIncome",
          },
          {
            label: "种植时间",
            prop: "plantTime",
          },
          {
            label: "收取时间",
            prop: "collectTime",
          },
          {
            label: "到期时间",
            prop: "expireTime",
          },
          {
            label: "时间",
            prop: "createTime",
            span: 8,
            row: true,
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
      pageUserLandRecord(this.query).then(res => {
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

<style scoped="scoped" lang="scss">
</style>
