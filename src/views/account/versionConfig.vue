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

import {listVersion, updateVersion} from "@/api/account/account";
import {versionMap} from "@/const/account/account";
import dayjs from "dayjs";

export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 10
      },
      data: [
      ],
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
            editDisplay: false,
            row: true
          },
          {
            label: "类型",
            editDisplay: false,
            prop: "type",
            formatter: (_row, value)=> {
              return versionMap[value] ||'未知'; //
            },
            row: true,
          },
          {
            label: "整包版本号",
            prop: "version",
            row: true
          },
          {
            label: "热更新版本号",
            prop: "hotVersion",
            row: true
          },
          {
            label: "审核开关:1=开,2=关",
            prop: "isRelease",
            row: true
          },
          {
            label: "下载地址",
            prop: "url",
            row: true
          },
          {
            label: "整包说明",
            type: "textarea",
            prop: "description",
            row: true
          },
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      listVersion(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateVersion(row).then(() => {
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
