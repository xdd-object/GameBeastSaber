<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @row-update="rowUpdate"
             @row-save="rowSave"
             @row-del="rowDel"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {listMoveRule} from "@/api/pull/pull";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {orderStatusMap} from "@/const/mall/order";
import {saveShop, update} from "@/api/small/shop";

const typeMap = {
  1: 'ZCoin场',
  2: '金豆场',
}
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
        menu: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            addDisplay:false,
            editDisplay:false,
            row: true
          },
          {
            label: "最小拉力差值",
            prop: "minPull",
            span: 14,
            row: true,

          },
          {
            label: "最大拉力差值（不包括）",
            prop: "maxPull",
            span: 14,
            row: true
          },
          {
            label: "移动速度",
            prop: "moveRate",
            minRows: 8,
            span: 24,
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
      listMoveRule(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateRule(row).then(() => {
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
      saveRule(row).then(() => {
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
      deleteRule(row).then(() => {
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
