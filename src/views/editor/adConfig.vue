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

import {listAdConfig,updateAdConfig} from "@/api/property/property";
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
            label: "平台",
            prop: "platform",
            editDisplay: false,
            span: 14,
            row: true,
          },
          {
            label: "appKey",
            prop: "appKey",
            span: 14,
            row: true,
          },
          {
            label: "appSecret",
            prop: "appSecret",
            span: 14,
            row: true
          },
          {
            label: "激励广告位",
            prop: "rewardAd",
            span: 14,
            row: true
          },
          {
            label: "创建时间",
            prop: "createTime",
            minRows: 8,
            span: 24,
            editDisplay: false,
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
      listAdConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateAdConfig(row).then(() => {
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
