<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />

</template>

<script>
  import {
    record
  } from "@/api/teamwork/config";
  import dayjs from 'dayjs'
  import {
    mapGetters
  } from "vuex";

  // 状态：1待开团 2 拼中 3 未拼中
  const statusMap = {
    1: '待开团',
    2: '拼中',
    3: '未拼中',
    4: '拼团失败',
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
              label: "记录ID",
              prop: "id",
              span: 8,
              search: true,
              row: true
            }, {
              label: "场次ID",
              prop: "roomId",
              search: true,
              span: 8,
              row: true
            },{
              label: "用户ID",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            }, {
              label: "商品ID",
              prop: "productId",
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
              label: "订单编号",
              prop: "orderNo",
              search: true,
              span: 8,
              row: true
            }, {
              label: "收货地址",
              prop: "addressId",
              span: 8,
              row: true
            }, {
              label: "拼团金额",
              prop: "amount",
              span: 8,
              row: true
            }, {
              label: "总拼团人数",
              prop: "totalNumber",
              span: 8,
              row: true
            }, {
              label: "第几个参与",
              prop: "joinNumber",
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
                  label: '待开团',
                  value: 1,
                },
                {
                  label: '拼中',
                  value:2,
                },
                {
                  label: '未拼中',
                  value: 3,
                },
                {
                  label: '拼团失败',
                  value: 4,
                },
              ]
            },
            {
              label: "时间",
              prop: "createTime",
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
        record(this.query).then(res => {
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
