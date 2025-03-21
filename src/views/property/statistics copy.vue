<template>
  <basic-container>

    <el-descriptions class="margin-top" :title="`${echartsData.date}数据概览（每天00点更新当天数据）`" column="5" border>
      <template slot="extra">
        <el-date-picker
            v-model="query2.date"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" size="small" v-on:click="queryData()">操作</el-button>
      </template>
        <el-descriptions-item label="平台总ZCoin" class="abc" content-class-name="my-content">
          <div v-on:click="data2('totalAmount', '平台总ZCoin')" class="pro">
            {{echartsData.totalAmount}}
            <div>较昨日： {{(echartsData.totalAmount - preEchartsData.totalAmount).toFixed(2)}}</div>
          </div>
        </el-descriptions-item>
      <el-descriptions-item label="swapZCoin"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('swapAmount', 'swapZCoin')" class="pro">
          {{echartsData.swapAmount}}
          <div>较昨日： {{(echartsData.swapAmount - preEchartsData.swapAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
        <el-descriptions-item label="云乐个游ZCoin"  class="abc" content-class-name="my-content">
          <div v-on:click="data2('yundouAmount', '云乐个游ZCoin')" class="pro">
            {{echartsData.yundouAmount}}
            <div>较昨日： {{(echartsData.yundouAmount - preEchartsData.yundouAmount).toFixed(2)}}</div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="swap底池ZCoin"  class="abc" content-class-name="my-content">
          <div v-on:click="data2('yundouAmount', 'swap底池ZCoin')" class="pro">
            {{echartsData.swapPoolAmount}}
            <div>较昨日： {{(echartsData.swapPoolAmount - preEchartsData.swapPoolAmount).toFixed(2)}}</div>
          </div>
        </el-descriptions-item>
      <el-descriptions-item label="swap代理库"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('swapAgentAmount', 'swap代理库')" class="pro">
          {{echartsData.swapAgentAmount}}
          <div>较昨日： {{(echartsData.swapAgentAmount - preEchartsData.swapAgentAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="自有库划出聚宝阁"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('yyToJbgAmount2', '自有库划出聚宝阁')" class="pro">
          {{echartsData.yyToJbgAmount2}}
          <div>较昨日： {{(echartsData.yyToJbgAmount2 - preEchartsData.yyToJbgAmount2).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>

      <el-descriptions-item label="自有库划入聚宝阁"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('yyToJbgAmount', '自有库划入聚宝阁')" class="pro">
          {{echartsData.yyToJbgAmount}}
          <div>较昨日： {{(echartsData.yyToJbgAmount - preEchartsData.yyToJbgAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="代理库划入聚宝阁"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('yyAgentToJbgAmount', '代理库划入聚宝阁')" class="pro">
          {{echartsData.yyAgentToJbgAmount}}
          <div>较昨日： {{(echartsData.yyAgentToJbgAmount - preEchartsData.yyAgentToJbgAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="代理库划出聚宝阁"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('yyAgentToJbgAmount2', '代理库划出聚宝阁')" class="pro">
          {{echartsData.yyAgentToJbgAmount2}}
          <div>较昨日： {{(echartsData.yyAgentToJbgAmount2 - preEchartsData.yyAgentToJbgAmount2).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="保险金"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('insuranceAmount', '保险金')" class="pro">
          {{echartsData.insuranceAmount}}
          <div>较昨日： {{(echartsData.insuranceAmount - preEchartsData.insuranceAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="云乐个游金豆" class="abc" content-class-name="my-content">
        <div v-on:click="data2('jindouAmount', '云乐个游金豆')" class="pro">
          {{echartsData.jindouAmount}}
          <div>较昨日： {{(echartsData.jindouAmount - preEchartsData.jindouAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="竞技场充能余额"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('meatAmount', '竞技场充能余额')" class="pro">
          {{echartsData.meatAmount}}
          <div>较昨日： {{(echartsData.meatAmount - preEchartsData.meatAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="红包积分余额"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('hongbaoAmount', '红包积分余额')" class="pro">
          {{echartsData.hongbaoAmount}}
          <div>较昨日： {{(echartsData.hongbaoAmount - preEchartsData.hongbaoAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="实际新增ZCoin数"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('realIncreaseAmount', '实际新增ZCoin数')" class="pro">
          {{echartsData.realIncreaseAmount}}
          <div>较昨日： {{(echartsData.realIncreaseAmount - preEchartsData.realIncreaseAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="当日产出ZCoin"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('increaseAmount', '当日产出ZCoin')" class="pro">
          {{echartsData.increaseAmount}}
          <div>较昨日： {{(echartsData.increaseAmount - preEchartsData.increaseAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="当日消耗ZCoin"  class="abc" content-class-name="my-content">
        <div v-on:click="data2('reduceAmount', '当日消耗ZCoin')" class="pro">
          {{echartsData.reduceAmount}}
          <div>较昨日： {{(echartsData.reduceAmount - preEchartsData.reduceAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
<!--      <el-descriptions-item label="实际流通ZCoin数"  class="abc" content-class-name="my-content">-->
<!--        <div v-on:click="data2('realYundouAmount', '实际流通ZCoin数')" class="pro">-->
<!--          {{echartsData.realYundouAmount}}-->
<!--          <div>较昨日： {{(echartsData.realYundouAmount - preEchartsData.realYundouAmount).toFixed(2)}}</div>-->
<!--        </div>-->
<!--      </el-descriptions-item>-->
      <el-descriptions-item label="公司号ZCoin" class="abc" content-class-name="my-content">
        <div v-on:click="data2('selfAmount', '公司号ZCoin')" class="pro">
          {{echartsData.selfAmount}}
          <div>较昨日： {{(echartsData.selfAmount - preEchartsData.selfAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="云乐个游代理库" class="abc" content-class-name="my-content">
        <div v-on:click="data2('agentAmount', '云乐个游代理库')" class="pro">
          {{echartsData.agentAmount}}
          <div>较昨日： {{(echartsData.agentAmount - preEchartsData.agentAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="幸福村借出还入ZCoin差值" class="abc" content-class-name="my-content">
        <div v-on:click="data2('borrowDiffAmount', '幸福村借出还入ZCoin差值')" class="pro">
          {{echartsData.borrowDiffAmount}}
          <div>较昨日： {{(echartsData.borrowDiffAmount - preEchartsData.borrowDiffAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="幸福村投入收回ZCoin差值" class="abc" content-class-name="my-content">
        <div v-on:click="data2('investDiffAmount', '幸福村投入收回ZCoin差值')" class="pro">
          {{echartsData.investDiffAmount}}
          <div>较昨日： {{(echartsData.investDiffAmount - preEchartsData.investDiffAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="交易所挂单" class="abc" content-class-name="my-content">
        <div v-on:click="data2('jysAmount', '交易所挂单')" class="pro">
          {{echartsData.jysAmount}}
          <div>较昨日： {{(echartsData.jysAmount - preEchartsData.jysAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="代理商冻结" class="abc" content-class-name="my-content">
        <div v-on:click="data2('agentFreezeAmount', '代理商冻结')" class="pro">
          {{echartsData.agentFreezeAmount}}
          <div>较昨日： {{(echartsData.agentFreezeAmount - preEchartsData.agentFreezeAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="夺宝未领取" class="abc" content-class-name="my-content">
        <div v-on:click="data2('duoBaoAmount', '夺宝未领取')" class="pro">
          {{echartsData.duoBaoAmount}}
          <div>较昨日： {{(echartsData.duoBaoAmount - preEchartsData.duoBaoAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="转赠冻结" class="abc" content-class-name="my-content">
        <div v-on:click="data2('giveFreezeAmount', '转赠冻结')" class="pro">
          {{echartsData.giveFreezeAmount}}
          <div>较昨日： {{(echartsData.giveFreezeAmount - preEchartsData.giveFreezeAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="拼团未开团的" class="abc" content-class-name="my-content">
        <div v-on:click="data2('teamworkAmount', '拼团未开团的')" class="pro">
          {{echartsData.teamworkAmount}}
          <div>较昨日： {{(echartsData.teamworkAmount - preEchartsData.teamworkAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="幸福村未收回的ZCoin总数" class="abc" content-class-name="my-content">
        <div v-on:click="data2('investAmount', '幸福村未收回的ZCoin总数')" class="pro">
          {{echartsData.investAmount}}
          <div>较昨日： {{(echartsData.investAmount - preEchartsData.investAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>

      <el-descriptions-item label="毛料未打磨的" class="abc" content-class-name="my-content">
        <div v-on:click="data2('crystalAmount', '毛料未打磨的')" class="pro">
          {{echartsData.crystalAmount}}
          <div>较昨日： {{(echartsData.crystalAmount - preEchartsData.crystalAmount).toFixed(2)}}</div>
        </div>
      </el-descriptions-item>

    </el-descriptions>

    <br>
    <br>
    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about"></div>

    <br>
    <br>
    <el-row :gutter="20">
      <el-col :span="12"><div id="about2"></div></el-col>
      <el-col :span="12"><div id="about22">
        <el-table
            :data="echartsData2"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${echartsData2[0]?echartsData2[0].date : ''}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              prop="desc"
              label="ZCoin消耗项">
          </el-table-column>
          <el-table-column
              prop="amount"
              label="数量"
              width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div id="about3"></div></el-col>
      <el-col :span="12"><div id="about32">
        <el-table
            :data="echartsData3"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${echartsData3[0]?echartsData3[0].date : ''}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              prop="desc"
              label="ZCoin产出项">
          </el-table-column>
          <el-table-column
              prop="amount"
              label="数量"
              width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div id="about4"></div></el-col>
      <el-col :span="12"><div id="about42">
        <el-table
            :data="echartsData4"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${echartsData4[0]?echartsData4[0].date : ''}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              prop="desc"
              label="金豆收入项">
          </el-table-column>
          <el-table-column
              prop="amount"
              label="数量"
              width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><div id="about5"></div></el-col>
      <el-col :span="12"><div id="about52">
        <el-table
            :data="echartsData5"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${echartsData5[0]?echartsData5[0].date : ''}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              prop="desc"
              label="金豆支出项">
          </el-table-column>
          <el-table-column
              prop="amount"
              label="数量"
              width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>



<!--    <div id="about2"></div>-->
<!--    <div id="about3"></div>-->
<!--    <div id="about4"></div>-->
<!--    <div id="about5"></div>-->

  </basic-container>
</template>

<script>

import {listProperty, listPropertyDetail} from "@/api/property/property";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";
import * as echarts from "echarts";
import dayjs from 'dayjs'

export default {
  name: "wel",
  watch: {
    direction (value) {
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
      listProperty({endDate:dayjs(temp).format('YYYY-MM-DD'), startDate:dayjs(temp).subtract(1, 'day').format('YYYY-MM-DD')}).then(res => {
        this.echartsData = res.data.data[0];
        this.preEchartsData = res.data.data[1];
      });
      this.data3(dayjs().subtract(0, 'day').format('YYYY-MM-DD'))
    },
    queryData() {
      var temp ;
      if (this.query2.date) {
        temp = dayjs(this.query2.date)
      } else {
        temp = dayjs().subtract(0, 'day')
      }
      listProperty({endDate:dayjs(temp).format('YYYY-MM-DD'), startDate:dayjs(temp).subtract(1, 'day').format('YYYY-MM-DD')}).then(res => {
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
      listPropertyDetail({date:date,detailType:2,currencyId:1}).then(res => {
        console.info("listPropertyDetail2", res.data.data)
        this.echartsData2 = res.data.data;
        this.setEchartsData2(this.echartsData2)
      });
      listPropertyDetail({date:date,detailType:1,currencyId:1}).then(res => {
        console.info("listPropertyDetail3", res.data.data)
        this.echartsData3 = res.data.data;
        this.setEchartsData3(this.echartsData3)
      });
      listPropertyDetail({date:date,detailType:1,currencyId:3}).then(res => {
        console.info("listPropertyDetail4", res.data.data)
        this.echartsData4 = res.data.data;
        this.setEchartsData4(this.echartsData4)
      });
      listPropertyDetail({date:date,detailType:2,currencyId:3}).then(res => {
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
        arr.push({name:params[i].desc, value: params[i].amount})
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
