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

import {pageTravelEventConfig, updateTravelEventConfig} from "@/api/mythical/mythical";
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
        editBtn: true,
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
            editDisplay: false,
            row: true
          },
          {
            label: "事件名称",
            prop: "name",
            span: 8,
            row: true
          },
          {
            label: "事件处理器",
            prop: "eventEnums",
            span: 8,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return eventEnumsMap[value] ||'未知'; //
            },
            dicData: mapToOptions(eventEnumsMap)
          },
          {
            label: "正/负事件",
            prop: "type",
            span: 8,
            row: true,
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return eventTypeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(eventTypeMap)
          },
          {
            label: "大/小事件",
            prop: "mode",
            span: 8,
            row: true,
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return eventModeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(eventModeMap)
          },
          {
            label: "是否开启",
            prop: "enable",
            span: 8,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap)
          },
          {
            label: "事件描述",
            prop: "desc",
            span: 8,
            row: true
          },
          {
            label: "事件权重",
            prop: "weight",
            span: 8,
            row: true
          },
          {
            label: "排序",
            prop: "sort",
            span: 8,
            row: true
          },
          {
            label: "参数1",
            prop: "param1",
            span: 8,
            row: true
          },
          {
            label: "参数2",
            prop: "param2",
            span: 8,
            row: true
          },
          {
            label: "参数3",
            prop: "param3",
            span: 8,
            row: true
          },
          {
            label: "参数4",
            prop: "param4",
            span: 8,
            row: true
          },
          {
            label: "参数5",
            prop: "param5",
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
      pageTravelEventConfig(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateTravelEventConfig(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
