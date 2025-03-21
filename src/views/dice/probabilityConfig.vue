<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" @row-update="rowUpdate"
    @row-save="rowSave" />

</template>

<script>

import { probabilityConfigPage, probabilityConfigSave } from "@/api/dice/dice";
const typeMap = {
  1: '不斋',
  2: '斋',
}

export default {
  name: "probabilityConfig",
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
        addBtn: true,
        menu: true,
        delBtn: false,
        editBtn: true,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
            dataType: 'number',
            editDisabled: true,
          },
          {
            label: "类型",
            type: "select",
            prop: "type",
            span: 8,
            dataType: 'number',
            row: true,
            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [{
              label: '不斋',
              value: 1,
            },
            {
              label: '斋',
              value: 2,
            },
            ]
          },
          {
            label: "数量",
            prop: "num",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "概率(百分比)",
            prop: "probability",
            span: 8,
            dataType: 'number',
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
    onLoad() {
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
      probabilityConfigPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    rowUpdate(row, index, done, loading) {
      probabilityConfigSave(row).then(() => {
        this.onLoad();
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
      probabilityConfigSave(row).then(() => {
        this.onLoad();
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

<style scoped="scoped" lang="scss"></style>
