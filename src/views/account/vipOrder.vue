<template>
  <avue-crud :option="option"
             :table-loading="loading"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageVipOrder} from "@/api/account/account";
import {boolMap, yesMap, vipMap} from "@/const/account/account";
import dayjs from "dayjs";
import {mapToOptions} from "@/util/common";
import {openMap} from "@/const/farm/farm";

export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 0
      },
      loading: true,
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: false,
        column:[
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "订单金额",
            prop: "num",
          },
          {
            label: "商品数量",
            prop: "goodsNum",
          },
          {
            label: "商品单价",
            prop: "goodsPrice",
          },
          {
            label: "订单编号",
            prop: "orderNo",
          },
          {
            label: "是否支付",
            prop: "payStatus",
            search: true,
            type: 'select',
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap),
          },
          {
            label: "vip类型",
            prop: "vipId",
            search: true,
            type: 'select',
            formatter: (_row, value)=> {
              return vipMap[value] ||'未知'; //
            },
            dicData: mapToOptions(vipMap),
          },
          {
            label: "下单时间",
            prop: "createdAt",
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
      pageVipOrder(this.query).then(res => {
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
