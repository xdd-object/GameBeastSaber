<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-update="rowUpdate"
    @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import { reqConfig, reqUpdateConfig } from "@/api/trade/trade";



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
            label: "交易所开关",
            prop: "enableTrade",
            span: 14,
            row: true,
            type: 'select',
            dicData: [
              {
                label: '开',
                value: true,
              },
              {
                label: '关',
                value: false,
              },
            ],
            formatter: (_row, value) => {
              return value ? '开' : '关' || '未知'; //
            },
          },
          {
            label: "普通用户手续费",
            prop: "tradeRate",
            span: 14,
            row: true,
            formatter: (_row, value) => {
              return Number(value).toFixed(4) + '%' || '未知'; //
            },
          },
          {
            label: "vip用户手续费",
            prop: "vipTradeRate",
            span: 14,
            row: true,
            formatter: (_row, value) => {
              return Number(value).toFixed(4) + '%' || '未知'; //
            },
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
      reqConfig().then(res => {
        console.log(res, "000000");
        const data = res.data.data;
        this.data.push(data)
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      reqUpdateConfig(row).then(() => {
        this.data=[]
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
