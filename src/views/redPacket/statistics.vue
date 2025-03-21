<template>
  <el-descriptions direction="vertical" :column="3" border v-if="goodsDetail">
        <el-descriptions-item label="机器人资金池">{{ goodsDetail.robotPool }}</el-descriptions-item>
        <el-descriptions-item label="系统奖池">{{ goodsDetail.rewardPool }}</el-descriptions-item>
        <el-descriptions-item label="累计红包发送金额">{{ goodsDetail.totalRedPacketAmount }}</el-descriptions-item>
        <el-descriptions-item label="累计红包手续费金额">{{ goodsDetail.totalRedPacketFeeAmount }}</el-descriptions-item>
        <el-descriptions-item label="累计红包领取金额">{{ goodsDetail.totalRedPacketReceiveAmount }}</el-descriptions-item>
        <el-descriptions-item label="累计发出排行榜奖励">{{ goodsDetail.totalRankReward }}</el-descriptions-item>
        <el-descriptions-item label="累计领取排行榜奖励">{{ goodsDetail.totalRankReceiveReward }}</el-descriptions-item>
      </el-descriptions>
</template>

<script>

import { reqRedpacketStatistics } from "@/api/redPacket/index";


export default {
  name: "wel",
  data() {
    return {
      goodsDetail:{}
    };
  },
  computed: {},
mounted(){
  this.onLoad()
},
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    
    onLoadRecord() {
      this.loading = true;
      reqRedpacketStatistics(this.query).then(res => {
        console.log(res, "resres");
        const data = res.data.data;
        this.goodsDetail = data;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>