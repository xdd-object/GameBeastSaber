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

import {pageNotice,saveNotice,updateNotice,deleteNotice} from "@/api/common/common";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
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
            label: "标题",
            prop: "title",
            row: true
          },
          {
            label: "预览",
            prop: "preview",
            row: true
          },
          {
            label: "内容",
            prop: "content",
            type: "textarea",
            row: true,
            overHidden: true,
            minRows: 10,
            maxRows: 20,
          },
          {
            label: "发布时间",
            prop: "releaseTime",
            type: "datetime",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            row: true,
          },
          {
            label: "是否显示",
            prop: "status",
            type: "select",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap)
          },
          {
            label: "创建时间",
            prop: "createTime",
            span: 8,
            addDisplay:false,
            editDisplay:false,
            row: true,
          },
          {
            label: "修改时间",
            prop: "updateTime",
            span: 8,
            addDisplay:false,
            editDisplay:false,
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
      pageNotice(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateNotice(row).then(() => {
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
      saveNotice(row).then(() => {
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
      deleteNotice(row).then(() => {
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
