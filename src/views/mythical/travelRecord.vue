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

import {pageTravelRecord} from "@/api/mythical/mythical";
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
            label: "第几次游历",
            prop: "travelNum",
            search: true,
            span: 8,
            row: true
          },
          {
            label: "第几次事件",
            prop: "eventNum",
            span: 8,
            row: true
          },
          {
            label: "事件名称",
            prop: "eventName",
            span: 8,
            row: true
          },
          {
            label: "奖励",
            prop: "value",
            span: 8,
            row: true
          },
          {
            label: "是否结算",
            prop: "status",
            span: 8,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap)
          },
          {
            label: "结算时间",
            prop: "useTime",
            span: 8,
            row: true
          },
          {
            label: "事件时间",
            prop: "createTime",
            span: 8,
            row: true
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            search: true,
            hide: true,
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
      pageTravelRecord(this.query).then(res => {
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
