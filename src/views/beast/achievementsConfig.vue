<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @row-update="rowUpdate"
             @row-save="rowSave"
             @row-del="rowDel"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageAchievementsConfig,saveAchievementsConfig,updateAchievementsConfig,deleteAchievementsConfig} from "@/api/beast/beast";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import {typeMap, pointsMap} from "@/const/beast/beast";
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
        delBtn: true,
        editBtn: true,
        menuWidth: 150,
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: true,
        column:[
          {
            label: "ID",
            prop: "id",
            span: 8,
            addDisplay:false,
            editDisplay:false,
            row: true
          },
          {
            label: "类型",
            prop: "type",
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(typeMap)
          },
          {
            label: "类型对应要求",
            prop: "points",
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return pointsMap[value] ||'未知'; //
            },
            dicData: mapToOptions(pointsMap)
          },
          {
            label: "奖励数量",
            prop: "rewardQuantity",
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
      pageAchievementsConfig(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateAchievementsConfig(row).then(() => {
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
    rowSave(row, done, loading) {
      saveAchievementsConfig(row).then(() => {
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
    rowDel(row, done, loading) {
      deleteAchievementsConfig(row).then(() => {
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
