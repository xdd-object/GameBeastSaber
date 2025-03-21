<template>
  <avue-crud :option="option" :data="data" @on-load="onLoad" @row-update="rowUpdate" @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import { robberyConfigList, robberyConfigSave } from "@/api/escort/escort";

export default {
  name: "robberyConfig",
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
            label: "权重",
            prop: "weight",
            span: 14,
            row: true,
          },
          {
            label: "附加配置",
            prop: "additional",
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
      robberyConfigList(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.loading = false;
      });
    },
    rowUpdate(row, index, done, loading) {
      robberyConfigSave({ "config": row }).then(() => {
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
