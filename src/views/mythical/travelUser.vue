<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @row-update="rowUpdate"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageMythicalUser} from "@/api/mythical/mythical";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import {eventTypeMap,eventEnumsMap,eventModeMap} from "@/const/mythical/mythical";
import {yesMap} from "@/const/account/account";
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
            label: "ID",
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
            label: "游历次数",
            prop: "travelTotalNum",
            span: 8,
            row: true
          },
          {
            label: "游历开启时间",
            prop: "travelStartTime",
            span: 8,
            row: true
          },
          {
            label: "游历结束时间",
            prop: "travelEndTime",
            span: 8,
            row: true
          },
          {
            label: "游历消耗的能量",
            prop: "travelHp",
            span: 8,
            row: true
          },
          {
            label: "游历消耗的食物",
            prop: "travelFood",
            span: 8,
            row: true
          },
          {
            label: "游历产生的ZCoin",
            prop: "travelCurrency1",
            span: 8,
            row: true
          },
          {
            label: "能量销毁次数",
            prop: "destroyNum",
            span: 8,
            row: true
          },
          {
            label: "上次销毁时间",
            prop: "preDestroyTime",
            span: 8,
            row: true
          },
          {
            label: "销毁能量数量",
            prop: "destroyEnergyAmount",
            span: 8,
            row: true
          },
          {
            label: "食物奖励次数",
            prop: "foodNum",
            span: 8,
            row: true
          },
          {
            label: "总共食物奖励",
            prop: "totalFoodAmount",
            span: 8,
            row: true
          },
          {
            label: "上次奖励食物时间",
            prop: "preCalcShieldTime",
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
      pageMythicalUser(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },

  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
