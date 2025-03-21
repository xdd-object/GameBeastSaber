<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="ZCoin" name="1"></el-tab-pane>
      <el-tab-pane label="精灵石" name="2"></el-tab-pane>
    </el-tabs>
    <el-descriptions title="今日数据统计">
      <el-descriptions-item label="今日共开期数">{{todayData.totalNum}}</el-descriptions-item>
      <el-descriptions-item label="今日总参与云/精灵石">{{todayData.totalAmount}}</el-descriptions-item>
      <el-descriptions-item label="今日总被杀云/精灵石">{{todayData.killTotal}}</el-descriptions-item>
      <el-descriptions-item label="今日总稀释云/精灵石">{{todayData.totalCommission}}</el-descriptions-item>
      <el-descriptions-item label="今日最高投入云/精灵石场次">{{todayData.maxTotalNum}}</el-descriptions-item>
      <el-descriptions-item label="今日参与人数最多场次">{{todayData.maxPeopleNum}}</el-descriptions-item>
      <el-descriptions-item label="今日纯收益最高人员ID前三名(ID：收益)">
        <div v-if="todayData.topIncomeUsers && todayData.topIncomeUsers.length">
          <span v-for="(i, index) in JSON.parse(todayData.topIncomeUsers)" :key="index"><el-tag size="small" type="success">{{ i.memberId + "：" + i.income }}</el-tag>&nbsp;&nbsp;&nbsp;</span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <br>
    <el-descriptions title="今日异常与数据">
      <el-descriptions-item label="被杀没有扣除(ID：期数)">
        <div v-if="todayData.alarmRecord1 && todayData.alarmRecord1.length">
          <span v-for="(i, index) in JSON.parse(todayData.alarmRecord1)" :key="index"><el-tag size="small" type="danger">{{ i.memberId + "：" + i.num }}</el-tag></span>
        </div>
        <div v-if="!(todayData.alarmRecord1 && todayData.alarmRecord1.length)">无</div>
      </el-descriptions-item>
      <el-descriptions-item label="躲避成功收入小于投入(ID：期数)">
        <div v-if="todayData.alarmRecord2 && todayData.alarmRecord2.length">
          <span v-for="(i, index) in JSON.parse(todayData.alarmRecord2)" :key="index"><el-tag size="small" type="danger">{{ i.memberId + "：" + i.num }}</el-tag></span>
        </div>
        <div v-if="!(todayData.alarmRecord2 && todayData.alarmRecord2.length)">无</div>
      </el-descriptions-item>
    </el-descriptions>

    <br>
    <br>
    <br>
    <br>
    <el-descriptions title="总数据统计">
      <el-descriptions-item label="共开期数">{{totalData.totalNum}}</el-descriptions-item>
      <el-descriptions-item label="总参与云/精灵石">{{totalData.totalAmount}}</el-descriptions-item>
      <el-descriptions-item label="总被杀云/精灵石">{{totalData.killTotal}}</el-descriptions-item>
      <el-descriptions-item label="总稀释云/精灵石">{{totalData.totalCommission}}</el-descriptions-item>
      <el-descriptions-item label="最高投入云/精灵石场次">{{totalData.maxTotalNum}}</el-descriptions-item>
      <el-descriptions-item label="参与人数最多场次">{{totalData.maxPeopleNum}}</el-descriptions-item>
    </el-descriptions>

  </basic-container>
</template>

<script>

import {todayStatistics, totalStatistics} from "@/api/kill/config";
import {mapGetters} from "vuex";

export default {
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      activeName: 1,
      drawer: false,
      direction: 'rtl',
      search: {
      },
      query: {
        type: 1,
      },
      todayData: {
        totalNum: "",
        totalAmount: "",
        killTotal: "",
        totalCommission: "",
        maxTotalNum: "",
        maxPeopleNum: "",
        topIncomeUsers: [],
        alarmRecord1: [],
        alarmRecord2: [],
      },
      totalData: {
        totalNum: "",
        totalAmount: "",
        killTotal: "",
        totalCommission: "",
        maxTotalNum: "",
        maxPeopleNum: "",
      }
    };
  },
  computed: {},
  created() {
    this.onLoad();
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
      this.query.type = this.activeName;
      this.loadTodayStatistics(this.query);
      this.loadTotalStatistics(this.query);
    },
    onLoad() {
      this.loading = true;
      this.loadTodayStatistics(this.query);
      this.loadTotalStatistics(this.query);
      this.loading = false;
    },
    loadTodayStatistics(row) {
      todayStatistics(row).then(res => {
        const data = res.data.data;
        // console.info(data)
        this.todayData = data
      })
    },
    loadTotalStatistics(row) {
      totalStatistics(row).then(res => {
        const data = res.data.data;
        // console.info(data)
        this.totalData = data
      })
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
