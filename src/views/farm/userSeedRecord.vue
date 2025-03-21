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

import {pageUserSeedRecord} from "@/api/farm/farm";
import {seedIdMap, useMap} from "@/const/farm/farm";
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
            label: "种子名称",
            prop: "seedName",
          },
          {
            label: "状态",
            prop: "status",
            formatter: (_row, value)=> {
              return useMap[value] ||'未知'; //
            }
          },
          {
            label: "种植id",
            prop: "landId",
          },
          {
            label: "种植时间",
            prop: "useTime",
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
      pageUserSeedRecord(this.query).then(res => {
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
