<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageUserLand} from "@/api/farm/farm";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import {openMap, seedIdMap} from "@/const/farm/farm";
import {mapToOptions} from "@/util/common";

// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
  0: '未开始',
  1: '进行中',
  2: '结算中',
  3: '已结束',
}
const statusRecordMap = {
  0: '未处理',
  1: '已处理',
}

const typeMap = {
  1: 'ZCoin场',
  2: '金豆场',
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
        menu: false,
        column:[
          {
            label: "用户id",
            prop: "userId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "地块编号",
            prop: "number",
            span: 8,
            row: true
          },
          {
            label: "种子id",
            prop: "seedId",
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return seedIdMap[value] ||'未知'; //
            },
            dicData: mapToOptions(seedIdMap)
          },
          {
            label: "领取次数",
            prop: "collectNum",
          },
          {
            label: "奖励基数",
            prop: "rewardAmount",
          },
          {
            label: "当前已领取收益",
            prop: "curIncome",
          },
          {
            label: "每次领取收益",
            prop: "everyIncome",
          },
          {
            label: "总共可领取收益",
            prop: "totalIncome",
          },
          {
            label: "作物种植时间",
            prop: "plantTime",
          },
          {
            label: "作物收取时间",
            prop: "collectTime",
          },
          {
            label: "作物下次收取时间",
            prop: "nextCollectTime",
          },
          {
            label: "作物到期时间",
            prop: "expireTime",
          },
          {
            label: "收取土地收益次数",
            prop: "landCollectNum",
          },
          {
            label: "土地当前已领取收益",
            prop: "landCurIncome",
          },
          {
            label: "收取土地收益时间",
            prop: "landCollectTime",
          },
          {
            label: "下一次收取土地收益时间",
            prop: "nextLandCollectTime",
          },
          {
            label: "土地收益到期时间",
            prop: "landExpireTime",
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
      pageUserLand(this.query).then(res => {
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
