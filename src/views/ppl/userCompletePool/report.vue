<template> 
  <div class="app-container">
    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about1"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about2"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about3"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about4"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about5"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about6"></div>

  </div>
</template>
<script>
  import {
    getBuyCompleteListProperty
  } from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
  import dayjs from 'dayjs'
  export default {
    name: 'lockHome',
    data() {
      return {
        dateList: null,
        vchart: null,
        vchart1: null,
        vchart2: null,
        vchart3: null,
        vchart4: null,
        vchart5: null,
        vchart6: null
      }
    },
    mounted() {
      this.vchart = echarts.init(document.getElementById("about"));

      this.vchart1 = echarts.init(document.getElementById("about1"));

      this.vchart2 = echarts.init(document.getElementById("about2"));

      this.vchart3 = echarts.init(document.getElementById("about3"));

      this.vchart4 = echarts.init(document.getElementById("about4"));

      this.vchart5 = echarts.init(document.getElementById("about5"));

      this.vchart6 = echarts.init(document.getElementById("about6"));
    },
    created() {
      this.onload();
    },
    filters:{
    },
    methods: {
      onload() {
        getBuyCompleteListProperty().then(res => {
          this.loading = false;
          this.dateList = res.data.data.date
          this.data(res.data.data.list);
          this.data1(res.data.data.list6);
          this.data2(res.data.data.list7);
          this.data3(res.data.data.list8);
          this.data4(res.data.data.list9);
          this.data5(res.data.data.list10);
          this.data6(res.data.data.list11);
        });
      },
      data(params) {
        this.vchart.setOption({
          title: {
            text: '七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data1(params) {
        this.vchart1.setOption({
          title: {
            text: '六阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data2(params) {
        this.vchart2.setOption({
          title: {
            text: '七阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data3(params) {
        this.vchart3.setOption({
          title: {
            text: '八阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data4(params) {
        this.vchart4.setOption({
          title: {
            text: '九阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data5(params) {
        this.vchart5.setOption({
          title: {
            text: '十阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      data6(params) {
        this.vchart6.setOption({
          title: {
            text: '十一阶七天内交割单趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ["订单数","交割数","交割付款数","交割未付款数"]
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc(params)
        })
      },
      abc(params) {
        var arr = [];
        var arr2 = [];
        var arr3 = []
        var arr4 = [];
        for (let i = 0; i < params.length; i++) {
          arr.push(params[i].saleWinCount)
          arr2.push(params[i].buyCompleteCount)
          arr3.push(params[i].buyCompletePayCount)
          arr4.push(params[i].buyCompleteNoPayCount)
        }
        var tarr = [];
        tarr.push({name:"订单数",data:arr,type: 'line'})
        tarr.push({name:"交割数",data:arr2,type: 'line'})
        tarr.push({name:"交割付款数",data:arr3,type: 'line'})
        tarr.push({name:"交割未付款数",data:arr4,type: 'line'})
        return tarr;
      },
    }
  }
</script>
<style scoped>
  #about,#about1,#about2,#about3,#about4,#about5,#about6 {
    width: 1200px;
    height: 400px;
  }
  .input-width {
    width: 203px;
  }
  .pro {
    cursor: pointer;
  }
  .my-content {
    background: #FDE2E2;
  }
</style>


