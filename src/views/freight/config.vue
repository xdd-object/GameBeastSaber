<template>
  <basic-container>
    <avue-crud :option="option" :data="data" @row-update="rowUpdate" @row-del="rowDelete" @on-load="onLoad"
      @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  list,
  update,
} from "@/api/freight/config";
export default {
  name: "freightConfig",
  data() {
    return {
      data: [],
      option: {
        addBtn: false,
        menu: true,
        delBtn: true,
        align: "center",
        column: [{
          label: "ID",
          width: 100,
          prop: "id",
          row: true,
          addDisplay: false,
          editDisplay: true,
          dataType: 'number',
          editDisabled: true,
        },
        {
          label: "配置项",
          width: 300,
          prop: "key",
          row: true,
          editDisabled: true,
        },
        {
          label: "配置值",
          prop: "value",
          row: true,
        },
        {
          label: "名称",
          prop: "name",
          row: true,
        },
        {
          label: "描述",
          prop: "desc",
          row: true,
        },
        {
          label: "创建时间",
          prop: "createdAt",
          row: true,
          addDisplay: false,
          editDisplay: false,
        },
        {
          label: "更新时间",
          prop: "updatedAt",
          row: true,
          addDisplay: false,
          editDisplay: false,
        },
        ]
      }
    };
  },
  computed: {},
  created() { },
  methods: {
    onLoad() {
      this.loading = true;
      list().then(res => {
        const data = res.data;
        this.data = data.data;
        this.loading = false;
      });
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(() => {
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

<style scoped="scoped" lang="scss"></style>
