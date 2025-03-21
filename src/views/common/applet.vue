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

import {listAppletMenu,updateAppletMenu} from "@/api/common/common";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {openMap, targetMap} from "@/const/common/common";

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
            span: 14,
            row: true,
          },
          {
            label: "开启状态",
            prop: "open",
            span: 14,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return openMap[value] ||'未知'; //
            },
            dicData: mapToOptions(openMap),
          },
          {
            label: "待开放提示",
            prop: "openTips",
            span: 14,
            row: true,
          },
          {
            label: "跳转类型",
            prop: "targetType",
            span: 14,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return targetMap[value] ||'未知'; //
            },
            dicData: mapToOptions(targetMap),
          },
          {
            label: "跳转路径",
            prop: "targetUrl",
            span: 14,
            row: true,
          },
          {
            label: "排序",
            prop: "sort",
            span: 14,
            row: true,
          },
          {
            label: "创建时间",
            prop: "createTime",
            minRows: 8,
            span: 24,
            editDisplay: false,
            row: true
          },
          {
            label: "修改时间",
            prop: "updateTime",
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
      listAppletMenu(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateAppletMenu(row).then(() => {
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
