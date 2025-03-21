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

import {listLandConfig,updateLandConfig} from "@/api/farm/farm";
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
            label: "地块编号",
            prop: "number",
            editDisplay: false,
            span: 14,
            row: true,
          },
          {
            label: "解锁条件",
            prop: "unlock",
            span: 14,
            row: true,
          },
          {
            label: "解锁条件描述",
            prop: "unlockDesc",
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
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permission.farm_land_config_edit, false),
      };
    },
  },
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      listLandConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateLandConfig(row).then(() => {
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
