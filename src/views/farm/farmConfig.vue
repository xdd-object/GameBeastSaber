<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @row-update="rowUpdate"
             :permission="permissionList"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import {farmConfig, updateFarmConfig} from "@/api/farm/farm";
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
        addBtn: false,
        delBtn: false,
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
            label: "土地团队收益基数",
            prop: "landTeamReward",
            span: 14,
            row: true,
          },
          {
            label: "每次土地收益",
            prop: "everyLandIncome",
            span: 14,
            row: true,
          },
          {
            label: "施肥金额",
            prop: "manureAmount",
            span: 14,
            row: true
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permission.farm_edit, false),
      };
    },
  },
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      farmConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateFarmConfig(row).then(() => {
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
