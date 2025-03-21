<template>
  <basic-container>

  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @row-update="rowUpdate"
             @row-save="rowSave"
             @row-del="rowDel"
             @on-load="onLoad"
             @refresh-change="onLoad"/>
  </basic-container>
</template>

<script>

import {pageConfig, saveConfig, updateConfig, deleteConfig, listConfigModule} from "@/api/common/common";
import {mapGetters} from "vuex";
import {} from "@/const/common/common";
import {yesMap} from "@/const/account/account";
import {mapToOptions} from "@/util/common";

export default {
  name: "wel",
  props: {
    module: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        module: "",
      },
      moduleMap:{},
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
            label: "id",
            prop: "id",
            span: 8,
            addDisplay: false,
            editDisplay: false,
            row: true,
          },
          {
            label: "模块",
            prop: "module",
            type: "select",
            search: true,
            row: true,
            formatter: (_row, value)=> {
              return this.moduleMap[value] ||'未知'; //
            },
            // dicData: mapToOptions(this.moduleMap),
            dicData:[{label:1,value:"1"}],
            rules: [
              {
                required: true,
                message: "请选择模块",
                trigger: "blur"
              }
            ],
          },
          {
            label: "名称",
            prop: "name",
            search: true,
            row: true,
            rules: [
              {
                required: true,
                message: "请输入名称",
                trigger: "blur"
              }
            ],
          },
          {
            label: "key",
            prop: "key",
            row: true,
            search: true,
            rules: [
              {
                required: true,
                message: "请输入key",
                trigger: "blur"
              }
            ],
          },
          {
            label: "值",
            prop: "value",
            type: "textarea",
            row: true,
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入值",
                trigger: "blur"
              }
            ],
          },
          {
            label: "是否app展示",
            prop: "show",
            type: "select",
            row: true,
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap),
            rules: [
              {
                required: true,
                message: "选择是否app展示",
                trigger: "blur"
              }
            ],
          },
          {
            label: "排序",
            prop: "sort",
            row: true,
          },
          {
            label: "备注",
            prop: "remark",
            row: true,
          },
          {
            label: "创建时间",
            prop: "createTime",
            row: true,
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: "修改时间",
            prop: "updateTime",
            row: true,
            addDisplay: false,
            editDisplay: false,
          }
        ]
      }
    };
  },
  computed: {

  },
  created() {
    this.onLoadRecord()
    this.getTypeOptionFromApi();
  },
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    searchRecord(params, done) {
      if (!params.module) {
        params.module = this.module
      }
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
      pageConfig(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateConfig(row).then(() => {
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
      saveConfig(row).then(() => {
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
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            return deleteConfig(row);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
    },
    getTypeOptionFromApi(){
      listConfigModule().then(res => {
        this.moduleMap = res.data.data
        this.option.column[1].dicData=mapToOptions(this.moduleMap)
      });
      if (this.module) {
        this.query.module = this.module;
        this.option.column[1].search=false;
      }
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
