<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />

</template>

<script>
  import {
    room
  } from "@/api/teamwork/config";

  // 状态：1拼团中 2 已结束
  const statusMap = {
    1: '拼团中',
    2: '已结束',
    3: '拼团失败'
  }
  const typeMap = {
    0: '普通拼团',
    1: '金豆拼团',
    2: 'ZCoin礼包',
  }
  const autoTypeMap = {
    1: '满人开团',
    2: '凌晨开团',
  }
  export default {
    name: "wel",
    data() {
      return {
        page: {
          total: 0
        },
        query: {
          pageNum: 1,
          pageSize: 10,
          ruleId: null,
          num: null,
          status: null,
        },
        data: [],
        option: {
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          addBtn: false,
          column: [{
              label: "场次ID",
              prop: "id",
              span: 8,
              search: true,
              row: true
            },{
              label: "规则ID",
              prop: "ruleId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "拼团类型",
              prop: "type",
              editDisplay: false,
              addDisplay: false,
              span: 14,
              row: true,
              search: true,
              type: 'select',
              formatter: (_row, value) => {
                return typeMap[value] || '未知'; //
              },
              dicData: [{
                  label: '普通拼团',
                  value: 0,
                },
                {
                  label: '金豆拼团',
                  value: 1,
                },
                {
                  label: 'ZCoin礼包',
                  value: 2,
                },
              ]
            },
            {
              label: "开团类型",
              prop: "autoType",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
              search: true,
              type: 'select',
              formatter: (_row, value) => {
                return autoTypeMap[value] || '未知'; //
              },
              dicData: [{
                  label: '满人开团',
                  value: 1,
                },
                {
                  label: '凌晨开团',
                  value: 2,
                },
              ]
            },
            {
              label: "商品ID",
              prop: "productId",
              search: true,
              span: 8,
              row: true
            }, {
              label: "期数",
              prop: "num",
              search: true,
              span: 8,
              row: true
            }, {
              label: "拼团金额",
              prop: "amount",
              search: false,
              span: 8,
              row: true
            }, {
              label: "总拼团人数",
              prop: "totalNumber",
              span: 8,
              row: true
            }, {
              label: "已拼团人数",
              prop: "joinNumber",
              span: 8,
              row: true
            },
            {
              label: "中奖人数",
              prop: "winnersNumber",
              span: 8,
              row: true,
            },
            {
              label: "产出天数",
              prop: "day",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },{
              label: "状态",
              prop: "status",
              span: 8,
              row: true,
              search: true,
              type: 'select',
              formatter: (_row, value) => {
                return statusMap[value] || '未知'; //
              },
              dicData: [{
                  label: '拼团中',
                  value: 1,
                },
                {
                  label: '已结束',
                  value: 2,
                },
                {
                  label: '拼团失败',
                  value: 3,
                }
              ]
            },
            {
              label: "开始时间",
              prop: "createTime",
              span: 8,
              row: true
            },
            {
              label: "最后修改时间",
              prop: "updateTime",
              span: 8,
              row: true
            }
          ]
        }
      };
    },
    computed: {},
    created() {
      this.onLoadRecord()
    },
    methods: {
      onLoad(page, params = {}) {
        this.onLoadRecord();
      },
      searchRecord(params, done) {
        this.query = params;
        this.query.pageNum = 1;
        this.query.pageSize = 10;
        this.onLoad(this.query);
        done();
      },
      searchPageRecord(currentPage, done) {
        this.query.pageNum = currentPage;
        this.onLoadRecord(this.query);
        done();
      },
      onLoadRecord() {
        this.loading = true;
        room(this.query).then(res => {
          const data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
          // this.selectionClear();
        });
      }
    },

  };
</script>

<style scoped="scoped" lang="scss">
</style>
