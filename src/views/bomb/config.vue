<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @row-update="rowUpdate"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import {getConfigList, updateConfig} from "@/api/bomb/bomb";

export default {
  name: "wel",
  data() {
    return {
      loading: false,
      page: {
        total: 20
      },
      data: [],
      query: {
        pageNum: 1,
        pageSize: 20,
      },
      option: {
        addBtn: false,
        delBtn: false,
        editBtn: true,
        menu: true,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            row: true,
            editDisplay: false,
          },
          {
            label: "键名",
            prop: "key",
            span: 14,
            row: true,
            disabled:true
          },
          {
            label: "值",
            prop: "value",
            span: 14,
            row: true,
          },
          {
            label: "注释",
            prop: "desc",
            span: 14,
            row: true,
          },
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      getConfigList(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
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
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
