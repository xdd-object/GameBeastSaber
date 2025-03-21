<template>
  <basic-container>
    <el-button type="primary"  @click="handleClick()">加载最新数据</el-button>
    <el-descriptions title="当前数据统计">
      <el-descriptions-item label="今日截止当前借出ZCoin">{{todayData.borrowIn}}</el-descriptions-item>
      <el-descriptions-item label="今日截止当前还入ZCoin">{{todayData.borrowOut}}</el-descriptions-item>
      <el-descriptions-item label="今日截止当前投入ZCoin">{{todayData.investOut}}</el-descriptions-item>
      <el-descriptions-item label="今日截止当前收回ZCoin">{{todayData.investIn}}</el-descriptions-item>
    </el-descriptions>
    <br>
    <br>

  </basic-container>
</template>

<script>

import {queryUserData} from "@/api/loan/loan";
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
        borrowIn: "",
        borrowOut: "",
        investOut: "",
        investIn: "",
        borrowAmount: "",
        investAmount: "",
      },
    };
  },
  computed: {},
  created() {
    this.onLoad();
  },
  methods: {
    handleClick() {
      this.loadTodayStatistics(this.query);
    },
    onLoad() {
      this.loading = true;
      this.loadTodayStatistics(this.query);
      this.loading = false;
    },
    loadTodayStatistics(row) {
      queryUserData(row).then(res => {
        const data = res.data.data;
        this.todayData = data
      })
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
