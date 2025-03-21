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

import {listGradeConfig, updateGradeConfig} from "@/api/account/account";
import {yesMap, boolMap} from "@/const/account/account";
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
            label: "名称",
            prop: "name",
          },
          {
            label: "logo",
            type: 'img',
            editDisplay: false,
            prop: "logo",
          },
          {
            label: "需要累计的现金收益",
            prop: "totalIncome",
          },
          {
            label: "需要的vip人数",
            prop: "needVip",
          },
          {
            label: "需要的等级",
            prop: "needLevel",
          },
          {
            label: "需要等级的人数",
            prop: "needLevelNum",
          },
          {
            label: "级差奖励百分比",
            prop: "rewardRatio",
          },
          {
            label: "荣耀奖池奖励分红金额",
            prop: "honourRatio",
          },
          {
            label: "荣耀奖池奖励分红金额",
            prop: "honourNum",
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
      listGradeConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateGradeConfig(row).then(() => {
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
