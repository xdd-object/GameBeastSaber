<template>
  <div class="padding-bottom:40px !important">
    <avue-crud
      :option="option"
      :page.sync="page"
      :data="data"
      @search-change="searchRecord"
      @current-change="searchPageRecord"
      @on-load="onLoad"
      @refresh-change="onLoad"
    />
  </div>
</template>

<script>
import { page } from "@/api/team/index";
import dayjs from "dayjs";
import { mapGetters } from "vuex";

// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
  0: "未开始",
  1: "进行中",
  2: "结算中",
  3: "已结束",
};
const statusRecordMap = {
  0: "未处理",
  1: "已处理",
};

const typeMap = {
  1: "ZCoin场",
  2: "金豆场",
};
export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 0,
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        userId: null
      },
      data: [],
      option: {
        border: true,
        delBtn: false,
        editBtn: false,
        menu: false,
        menuWidth: 150,
        align: "center",
        menuAlign: "center",
        addBtn: false,
        column: [
          {
            label: "日期",
            prop: "day",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            span: 12,
            search: true,
            row: true,
          },
          {
            label: "用户id",
            prop: "userId",
            span: 12,
            search: true,
            row: true,
          },{
            label: "团队名称",
            prop: "teamName",
            span: 12,
            search: true,
            row: true,
          },
          {
            label: "今日新增用户",
            prop: "todayUser",
            span: 8,
            row: true,
          },
          {
            label: "昨日新增用户",
            prop: "yesterdayUser",
            span: 8,
            row: true,
          },
          {
            label: "一周新增用户",
            prop: "weekUser",
            span: 8,
            row: true,
          },
          {
            label: "今日新增VIP",
            prop: "todayVip",
            span: 8,
            row: true,
          },
          {
            label: "昨日新增VIP",
            prop: "yesterdayVip",
            span: 8,
            row: true,
          },
          {
            label: "一周新增VIP",
            prop: "weekVip",
            span: 8,
            row: true,
          },
          {
            label: "今日转入人数",
            prop: "todayInUser",
            span: 8,
            row: true,
          },
          {
            label: "今日转入数量",
            prop: "todayInAmount",
            span: 8,
            row: true,
          },
          {
            label: "昨日转入人数",
            prop: "yesterdayInUser",
            span: 8,
            row: true,
          },
          {
            label: "昨日转入数量",
            prop: "yesterdayInAmount",
            span: 8,
            row: true,
          },
          {
            label: "一周转入人数",
            prop: "weekInUser",
            span: 8,
            row: true,
          },
          {
            label: "一周转入数量",
            prop: "weekInAmount",
            span: 8,
            row: true,
          },
          {
            label: "今日转出人数",
            prop: "todayOutUser",
            span: 8,
            row: true,
          },
          {
            label: "今日转出数量",
            prop: "todayOutAmount",
            span: 8,
            row: true,
          },
          {
            label: "昨日转出人数",
            prop: "yesterdayOutUser",
            span: 8,
            row: true,
          },
          {
            label: "昨日转出数量",
            prop: "yesterdayOutAmount",
            span: 8,
            row: true,
          },
          {
            label: "一周转出人数",
            prop: "weekOutUser",
            span: 8,
            row: true,
          },
          {
            label: "一周转出数量",
            prop: "weekOutAmount",
            span: 8,
            row: true,
          },
          {
            label: "今日聚宝阁转入数量",
            prop: "todayInJubaoAmount",
            span: 8,
            row: true,
          },

          {
            label: "昨日聚宝阁转入数量",
            prop: "yesterdayInJubaoAmount",
            span: 8,
            row: true,
          },
          {
            label: "一周聚宝阁转入数量",
            prop: "weekInJubaoAmount",
            span: 8,
            row: true,
          },
          {
            label: "今日聚宝阁转出数量",
            prop: "todayOutJubaoAmount",
            span: 8,
            row: true,
          },
          {
            label: "昨日聚宝阁转出数量",
            prop: "yesterdayOutJubaoAmount",
            span: 8,
            row: true,
          },
          {
            label: "一周聚宝阁转出数量",
            prop: "weekOutJubaoAmount",
            span: 8,
            row: true,
          },
          {
            label: "团队总ZCoin余额",
            prop: "totalYunAmount",
            span: 8,
            row: true,
          },
          {
            label: "团队总金豆余额",
            prop: "totalJinAmount",
            span: 8,
            row: true,
          },
          {
            label: "代理库余额",
            prop: "agentAmount",
            span: 8,
            row: true,
          },
          {
            label: "KK牧场当日预约人数",
            prop: "todayMakeUserNumber",
            span: 8,
            row: true,
          },
          {
            label: "KK牧场当日抢购人数",
            prop: "todayPushUserNumber",
            span: 8,
            row: true,
          },
          {
            label: "KK牧场团队当日抢购金额",
            prop: "todayKKTeamPushAmount",
            span: 8,
            row: true,
          },
          {
            label: "KK牧场总人数",
            prop: "kkUserNumber",
            span: 8,
            row: true,
          },
          {
            label: "KK牧场总资产",
            prop: "kkAmount",
            span: 8,
            row: true,
          },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.onLoadRecord();
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
      page(this.query).then((res) => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss"></style>
