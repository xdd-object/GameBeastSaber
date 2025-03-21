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

import {pageBattleUser} from "@/api/mythical/mythical";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import {eventTypeMap, eventEnumsMap, eventModeMap, battleTypeMap} from "@/const/mythical/mythical";
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
            prop: "memberId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
            span: 8,
            row: true,
            search: true,
            type: 'select',
            formatter: (_row, value)=> {
              return battleTypeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleTypeMap)
          },
          {
            label: "游戏次数",
            prop: "gameNum",
            span: 8,
            row: true
          },
          {
            label: "累积投入",
            prop: "amount",
            span: 8,
            row: true
          },
          {
            label: "累积收益",
            prop: "income",
            span: 8,
            row: true
          },
          {
            label: "累积食物收益",
            prop: "foodIncome",
            span: 8,
            row: true
          },
          {
            label: "累积总收益",
            prop: "totalAmount",
            span: 8,
            row: true
          },
          {
            label: "创建时间",
            prop: "createTime",
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
      pageBattleUser(this.query).then(res => {
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
