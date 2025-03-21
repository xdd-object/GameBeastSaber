<template>
  <basic-container>

    <el-descriptions class="margin-top" :title="`${echartsData.date}数据概览（00:05点更新昨日数据）`" column="5" border>
      <template slot="extra">
        <el-date-picker v-model="query2.date" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" size="small" v-on:click="queryData()">操作</el-button>
      </template>
    </el-descriptions>
    <el-descriptions class="margin-top" title="总平台" :column="3" :size="size" border>
      <el-descriptions-item label="平台总ZCoin" class="abc" content-class-name="my-content">
        <div v-on:click="data2('totalAmount', '平台总ZCoin')" class="pro">
          {{ echartsData.totalAmount }}
          <div>较昨日： {{ (echartsData.totalAmount - preEchartsData.totalAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="平台总精灵石" class="abc" content-class-name="my-content">
        <div v-on:click="data2('total3Amount', '平台总精灵石')" class="pro">
          {{ echartsData.total3Amount }}
          <div>较昨日： {{ (echartsData.total3Amount - preEchartsData.total3Amount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="ZCoin" class="abc" content-class-name="my-content">
        <div v-on:click="data2('currency1Amount', 'ZCoin')" class="pro">
          {{ echartsData.currency1Amount }}
          <div>较昨日： {{ (echartsData.currency1Amount - preEchartsData.currency1Amount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="精灵石" class="abc" content-class-name="my-content">
        <div v-on:click="data2('currency3Amount', '精灵石')" class="pro">
          {{ echartsData.currency3Amount }}
          <div>较昨日： {{ (echartsData.currency3Amount - preEchartsData.currency3Amount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="代理库ZCoin" class="abc" content-class-name="my-content">
        <div v-on:click="data2('currency4Amount', '代理库ZCoin')" class="pro">
          {{ echartsData.currency4Amount }}
          <div>较昨日： {{ (echartsData.currency4Amount - preEchartsData.currency4Amount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="代理库精灵石" class="abc" content-class-name="my-content">
        <div v-on:click="data2('currency5Amount', '代理库精灵石')" class="pro">
          {{ echartsData.currency5Amount }}
          <div>较昨日： {{ (echartsData.currency5Amount - preEchartsData.currency5Amount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="牧场保险金" class="abc" content-class-name="my-content">
        <div v-on:click="data2('insuranceAmount', '牧场保险金')" class="pro">
          {{ echartsData.insuranceAmount }}
          <div>较昨日： {{ (echartsData.insuranceAmount - preEchartsData.insuranceAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="牧场锁仓金额" class="abc" content-class-name="my-content">
        <div v-on:click="data2('lockAmount', '牧场锁仓金额')" class="pro">
          {{ echartsData.lockAmount }}
          <div>较昨日： {{ (echartsData.lockAmount - preEchartsData.lockAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <br>
    <el-descriptions class="margin-top" title="销毁" :column="3" :size="size" border>
      <el-descriptions-item label="斗斗场销毁" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyArenaAmount', '斗斗场销毁')" class="pro">
          {{ echartsData.destroyArenaAmount }}
          <div>较昨日： {{ (echartsData.destroyArenaAmount - preEchartsData.destroyArenaAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="大逃杀销毁" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyKillAmount', '大逃杀销毁')" class="pro">
          {{ echartsData.destroyKillAmount }}
          <div>较昨日： {{ (echartsData.destroyKillAmount - preEchartsData.destroyKillAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="飞机销毁" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyAircraftAmount', '飞机销毁')" class="pro">
          {{ echartsData.destroyAircraftAmount }}
          <div>较昨日： {{ (echartsData.destroyAircraftAmount - preEchartsData.destroyAircraftAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="转赠销毁" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyTransferAmount', '转赠销毁')" class="pro">
          {{ echartsData.destroyTransferAmount }}
          <div>较昨日： {{ (echartsData.destroyTransferAmount - preEchartsData.destroyTransferAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="种植ZCoin销毁" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyPlantAmount', '种植ZCoin销毁')" class="pro">
          {{ echartsData.destroyPlantAmount }}
          <div>较昨日： {{ (echartsData.destroyPlantAmount - preEchartsData.destroyPlantAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="解锁玉米种子" class="abc" content-class-name="my-content">
        <div v-on:click="data2('destroyUnlockAmount', '解锁玉米种子')" class="pro">
          {{ echartsData.destroyUnlockAmount }}
          <div>较昨日： {{ (echartsData.destroyUnlockAmount - preEchartsData.destroyUnlockAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <br>
    <el-descriptions class="margin-top" title="产出" :column="3" :size="size" border>
      <el-descriptions-item label="农场今日已领取金额" class="abc" content-class-name="my-content">
        <div v-on:click="data2('increaseCollectAmount', '农场今日已领取金额')" class="pro">
          {{ echartsData.increaseCollectAmount }}
          <div>较昨日： {{ (echartsData.increaseCollectAmount - preEchartsData.increaseCollectAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>

      <el-descriptions-item label="划转" class="abc" content-class-name="my-content">
        <div v-on:click="data2('increaseTransferAmount', '划转')" class="pro">
          {{ echartsData.increaseTransferAmount }}
          <div>较昨日： {{ (echartsData.increaseTransferAmount - preEchartsData.increaseTransferAmount).toFixed(2) }}</div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <br>
    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about" hidden="hidden"></div>

    <br>
    <br>

    <!--    <div id="about2"></div>-->
    <!--    <div id="about3"></div>-->
    <!--    <div id="about4"></div>-->
    <!--    <div id="about5"></div>-->

  </basic-container>
</template>

<script>

import { listProperty, listPropertyDetail } from "@/api/property/property";
import { mapToOptions } from "@/util/common";
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import dayjs from 'dayjs'

export default {
  name: "wel",
  watch: {
    direction(value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      drawer: false,
      value1: null,
      direction: 'rtl',
      vchart: null,
      vchart2: null,
      vchart3: null,
      vchart4: null,
      vchart5: null,
      page: {
        total: 10
      },
      search: {
      },
      query: {
        startDate: '',
        endDate: '',
      },
      query2: {
        date: '',
      },
      echartsData: {}, //表格数据
      preEchartsData: {}, //表格数据
      echartsData1: [], //折线图
      echartsData2: [], //ZCoin消耗看板
      echartsData3: [], //ZCoin产出看板
      echartsData4: [], //金豆收入看板
      echartsData5: [], //金豆支出看板
      data: {},
    };
  },
  computed: {

  },
  mounted() {
    // 图标数据1
    // var vchart = echarts.init(document.getElementById("about"));
    this.vchart = echarts.init(document.getElementById("about"));
    this.vchart2 = echarts.init(document.getElementById("about2"));
    this.vchart3 = echarts.init(document.getElementById("about3"));
    this.vchart4 = echarts.init(document.getElementById("about4"));
    this.vchart5 = echarts.init(document.getElementById("about5"));
    // 3、设置echarts参数

  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.query.startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
      this.query.endDate = dayjs().subtract(0, 'day').format('YYYY-MM-DD')
      this.loading = true;
      listProperty(this.query).then(res => {
        this.echartsData1 = res.data.data;
        this.loading = false;
        this.data1(res.data.data, 'totalAmount', '平台总ZCoin');
        // this.selectionClear();
      });
      var temp = dayjs().subtract(0, 'day')
      listProperty({ endDate: dayjs(temp).format('YYYY-MM-DD'), startDate: dayjs(temp).subtract(1, 'day').format('YYYY-MM-DD') }).then(res => {
        this.echartsData = res.data.data[0];
        this.preEchartsData = res.data.data[1];
      });
      this.data3(dayjs().subtract(0, 'day').format('YYYY-MM-DD'))
    },
    queryData() {
      var temp;
      if (this.query2.date) {
        temp = dayjs(this.query2.date)
      } else {
        temp = dayjs().subtract(0, 'day')
      }
      listProperty({ endDate: dayjs(temp).format('YYYY-MM-DD'), startDate: dayjs(temp).subtract(1, 'day').format('YYYY-MM-DD') }).then(res => {
        this.echartsData = res.data.data[0];
        this.preEchartsData = res.data.data[1];
      });
      this.data3(dayjs(temp).format('YYYY-MM-DD'))
    },
    abc2(params, date) {
      var arr = [];
      for (let i = 0; i < params.length; i++) {
        arr.push(params[i][date])
      }
      return arr;
    },
    data2(field, title) {
      this.data1(this.echartsData1, field, title);
    },
    data3(date) {
      listPropertyDetail({ date: date, detailType: 2, currencyId: 1 }).then(res => {
        console.info("listPropertyDetail2", res.data.data)
        this.echartsData2 = res.data.data;
        this.setEchartsData2(this.echartsData2)
      });
      listPropertyDetail({ date: date, detailType: 1, currencyId: 1 }).then(res => {
        console.info("listPropertyDetail3", res.data.data)
        this.echartsData3 = res.data.data;
        this.setEchartsData3(this.echartsData3)
      });
      listPropertyDetail({ date: date, detailType: 1, currencyId: 3 }).then(res => {
        console.info("listPropertyDetail4", res.data.data)
        this.echartsData4 = res.data.data;
        this.setEchartsData4(this.echartsData4)
      });
      listPropertyDetail({ date: date, detailType: 2, currencyId: 3 }).then(res => {
        console.info("listPropertyDetail5", res.data.data)
        this.echartsData5 = res.data.data;
        this.setEchartsData5(this.echartsData5)
      });
    },
    data1(params, field, title) {
      this.vchart.setOption({
        title: {
          text: title
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.abc2(params, 'date').reverse()
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            data: this.abc2(params, field).reverse(),
            type: 'line'
          }
        ]
      })
    },
    handleEchartsData(params) {
      var arr = [];
      for (let i = 0; i < params.length; i++) {
        arr.push({ name: params[i].desc, value: params[i].amount })
      }
      return arr;
    },
    sumAmount(params) {
      var res = 0;
      for (let i = 0; i < params.length; i++) {
        res = res + Number(params[i].amount)
      }
      return res.toFixed(2);
    },
    setEchartsData2(params) {
      this.vchart2.setOption({
        title: {
          text: 'ZCoin消耗看板（' + params[0].date + '）'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sumAmount(params), name: '总计(' + this.sumAmount(params) + ")" }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.handleEchartsData(params)
          }
        ]
      })
    },
    setEchartsData3(params) {
      this.vchart3.setOption({
        title: {
          text: 'ZCoin产出看板（' + params[0].date + '）'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sumAmount(params), name: '总计(' + this.sumAmount(params) + ")" }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.handleEchartsData(params)
          }
        ]
      })
    },
    setEchartsData4(params) {
      this.vchart4.setOption({
        title: {
          text: '金豆收入看板（' + params[0].date + '）'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sumAmount(params), name: '总计(' + this.sumAmount(params) + ")" }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.handleEchartsData(params)
          }
        ]
      })
    },
    setEchartsData5(params) {
      this.vchart5.setOption({
        title: {
          text: '金豆支出看板（' + params[0].date + '）'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sumAmount(params), name: '总计(' + this.sumAmount(params) + ")" }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.handleEchartsData(params)
          }
        ]
      })
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

#about {
  width: 1000px;
  height: 700px;
}

#about2 {
  width: 500px;
  height: 900px;
}

#about3 {
  width: 500px;
  height: 700px;
}

#about4 {
  width: 500px;
  height: 600px;
}

#about5 {
  width: 500px;
  height: 500px;
}

.pro {
  cursor: pointer;
}

.my-content {
  background: #FDE2E2;
}
</style>
