<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @row-save="rowUpdate" @row-update="rowUpdate" @refresh-change="onLoad">



    <template slot="menu" slot-scope="{ row }">
      <el-button type="text" size="small" @click="addRoomEdit(row)">开启新场次
      </el-button>
    </template>

  </avue-crud>

</template>
<script>
  import {
    getRuleList,
    ruleUpdate,
    addRoom
  } from "@/api/teamwork/config";
  const openMap = {
    1: '开启',
    0: '关闭',
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
          total: 10
        },
        query: {
          pageNum: 1,
          pageSize: 10,
          status: null,
        },
        data: [],
        option: {
          addBtn: true,
          delBtn: false,
          editBtn: true,
          menu: true,
          column: [{
              label: "ID",
              prop: "id",
              span: 14,
              editDisplay: false,
              addDisplay: false,
              row: true
            },
            {
              label: "拼团类型",
              prop: "type",
              editDisplay: true,
              addDisplay: true,
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
              label: "规则名称",
              prop: "name",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "商品图片",
              prop: "icon",
              editDisplay: false,
              addDisplay: false,
              listType: 'picture-img',
              type:"upload",
              span: 14,
              align: 'center',
              row: true
            },
            {
              label: "拼团人数",
              prop: "totalNumber",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "中奖人数",
              prop: "winnersNumber",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "返还比例",
              prop: "rate",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "返还金豆",
              prop: "jindouAmount",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "产出天数",
              prop: "day",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "商品ID",
              prop: "productId",
              editDisplay: true,
              addDisplay: true,
              span: 14,
              row: true,
            },
            {
              label: "状态",
              prop: "status",
              span: 14,
              editDisplay: true,
              addDisplay: true,
              row: true,
              search: true,
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
        getRuleList(this.query).then(res => {
          const data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
          // this.selectionClear();
        });
      },
      rowUpdate(row, index, done, loading) {
        row.icon = null;
        ruleUpdate(row).then(() => {
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
      addRoomEdit(row, index, done, loading) {
        addRoom(row).then(() => {
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
