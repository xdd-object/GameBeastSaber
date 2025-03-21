<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @row-save="rowSave"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import { listTeam,saveTeam } from "@/api/team/index";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";

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
        addBtn: true,
        delBtn: false,
        editBtn: false,
        menu: true,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            addDisplay: false,
            row: true
          },
          {
            label: "团队id",
            prop: "userId",
            span: 14,
            row: true,
          },
          {
            label: "团队名称",
            prop: "teamName",
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
    onLoad(page, params = {}) {
      this.loading = true;
      listTeam(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowSave(row, done, loading) {
      saveTeam(row).then(() => {
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
