<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />

</template>

<script>
  import {
    getPackList
  } from "@/api/teamwork/config";
  import dayjs from 'dayjs'
  import {
    mapGetters
  } from "vuex";

  // 状态：1释放中 2 已释放
  const statusMap = {
    1: '释放中',
    2: '已释放',
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
          roomId: null,
          orderNo: null,
          userId: null,
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
              label: "用户ID",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            }, {
              label: "规则ID",
              prop: "ruleId",
              search: true,
              span: 8,
              row: true
            }, {
              label: "场次ID",
              prop: "roomId",
              search: true,
              span: 8,
              row: true
            }, {
              label: "记录ID",
              prop: "recordId",
              search: true,
              span: 8,
              row: true
            },{
              label: "总产量",
              prop: "totalAmount",
              span: 8,
              row: true
            }, {
              label: "已产出",
              prop: "alreadyAmount",
              span: 8,
              row: true
            }, {
              label: "剩余数量",
              prop: "surplusAmount",
              span: 8,
              row: true
            }, {
              label: "总天数",
              prop: "totalDay",
              span: 8,
              row: true
            },{
              label: "已产天数",
              prop: "alreadyDay",
              span: 8,
              row: true
            },{
              label: "剩余天数",
              prop: "surplusDay",
              span: 8,
              row: true
            }, {
              label: "状态",
              prop: "status",
              span: 8,
              search: true,
              type: 'select',
              row: true,
              formatter: (_row, value) => {
                return statusMap[value] || '未知'; //
              },
              dicData: [{
                  label: '释放中',
                  value: 1,
                },
                {
                  label: '已释放',
                  value:2,
                }
              ]
            },
            {
              label: "时间",
              prop: "update_time",
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
        getPackList(this.query).then(res => {
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
