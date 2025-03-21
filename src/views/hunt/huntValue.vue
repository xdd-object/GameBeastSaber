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

import {pageHuntValue} from "@/api/hunt/hunt";
import {mapGetters} from "vuex";
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
            label: "时间",
            prop: "date",
            span: 8,
            row: true
          },
          {
            label: "平台总弓箭数",
            prop: "totalBow",
          },

          {
            label: "参与狩猎总弓箭数",
            prop: "totalHuntBow",
          },
          {
            label: "狩猎场奖池",
            prop: "totalAmount",
          },
          {
            label: "当前可分数",
            prop: "num",
          },
          {
            label: "当前弓箭价值",
            prop: "value",
          },
          {
            label: "弓箭每秒价值",
            prop: "valueEverySecond",
          },
          {
            label: "创建时间",
            prop: "createTime",
            span: 8,
            row: true,
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
      pageHuntValue(this.query).then(res => {
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
