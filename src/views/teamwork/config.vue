<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-update="rowUpdate"
    @refresh-change="onLoad">
  </avue-crud>
</template>
<script>
  import {
    getConfigList,
    configUpdate
  } from "@/api/teamwork/config";
  const openMap = {
    1: '开启',
    0: '关闭',
  }
  export default {
    name: "wel",
    data() {
      return {
        page: {
          total: 10
        },
        data: [],
        option: {
          addBtn: false,
          delBtn: false,
          editBtn: true,
          menu: true,
          column: [{
              label: "ID",
              prop: "id",
              span: 14,
              editDisplay: false,
              row: true
            },
            {
              label: "规则说明",
              prop: "rule",
              component: "AvueUeditor",
              options: {
                action: "/api/blade-game-admin/aliyun/oss/multiFileUpload",
                props: {
                  res: "data",
                  url: "0",
                },
              },
              span: 24,
            },

            {
              label: "状态",
              prop: "status",
              span: 14,
              editDisplay: true,
              row: true,
              type: 'select',
              formatter: (_row, value) => {
                return openMap[value] || '未知'; //
              },
              dicData: [{
                  label: '开启',
                  value: 1,
                },
                {
                  label: '关闭',
                  value: 0,
                },
              ]
            },
            {
              label: "自动开团",
              prop: "autoJoin",
              span: 14,
              editDisplay: true,
              row: true,
              type: 'select',
              formatter: (_row, value) => {
                return openMap[value] || '未知'; //
              },
              dicData: [{
                  label: '开启',
                  value: 1,
                },
                {
                  label: '关闭',
                  value: 0,
                },
              ]
            },
            {
              label: "开始时间",
              prop: "startTime",
              editDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "结束时间",
              prop: "endTime",
              editDisplay: true,
              span: 14,
              row: true,
            },

          ]
        }
      };
    },
    computed: {},
    created() {},
    methods: {
      onLoad(page, params = {}) {
        this.loading = true;
        getConfigList(1, 10, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.data = data;
          this.loading = false;
          // this.selectionClear();
        });
      },
      rowUpdate(row, index, done, loading) {
        configUpdate(row).then(() => {
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
