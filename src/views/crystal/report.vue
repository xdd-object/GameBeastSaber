<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="水晶屋" align="center">
          <template slot-scope="scope">{{scope.row.bulidName}}</template>
        </el-table-column>
        <el-table-column label="水晶屋总数量"  align="center">
          <template slot-scope="scope">{{scope.row.totalCount}}</template>
        </el-table-column>
        <el-table-column label="产出结束水晶屋" align="center">
          <template slot-scope="scope">{{scope.row.completeCount}}</template>
        </el-table-column>
        <el-table-column label="产出未结束水晶屋" align="center">
          <template slot-scope="scope">{{scope.row.underWayCount}}</template>
        </el-table-column>
        <el-table-column label="总产值" width="" align="center">
          <template slot-scope="scope">{{scope.row.sumTotalNum}}</template>
        </el-table-column>
        <el-table-column label="已产出" width="" align="center">
          <template slot-scope="scope">{{scope.row.sumUseOutputNum}}</template>
        </el-table-column>
        <el-table-column label="待产出" width="" align="center">
          <template slot-scope="scope">{{scope.row.sumFutureNum}}</template>
        </el-table-column>
        <el-table-column label="今日交割水晶屋" width="" align="center">
          <template slot-scope="scope">{{scope.row.todayCreate}}</template>
        </el-table-column>
      </el-table>
    </div>

    <br>
    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about"></div>

    <!-- echarts的容器，默认宽高是0，如果不进行设置，页面是不显示的 -->
    <div id="about1"></div>

  </div>
</template>
<script>
  import {
    getTodayCrystalReport,
    endListProperty,
    listProperty
  } from '@/api/crystal/crystal';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
  import dayjs from 'dayjs'
  export default {
    name: 'lockHome',
    data() {
      return {
        list: null,
        vchart: null,
        vchart1: null,
        listLoading: false,
        multipleSelection: []
      }
    },
    mounted() {
      this.vchart = echarts.init(document.getElementById("about"));

      this.vchart1 = echarts.init(document.getElementById("about1"));
    },
    created() {
      this.getList();
      this.onload();
    },
    filters:{
      formatTime(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      onload() {
        listProperty().then(res => {
          this.loading = false;
          this.data1(res.data.data);
          // this.selectionClear();
        });

        endListProperty().then(res => {
          this.loading = false;
          this.data2(res.data.data);
          // this.selectionClear();
        });
      },
      data2(params) {
        this.vchart1.setOption({
          title: {
            text: '未来七天结束水晶屋趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: this.abc4(params, 'bulidName')
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.abc2(params, 'date')
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc3(params, 'bulidName', 'endList')
        })
      },
      data1(params) {
        this.vchart.setOption({
          title: {
            text: '未来七天趋势图'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: this.abc4(params, 'bulidName')
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.abc2(params, 'date')
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'axis'
          },
          series: this.abc3(params, 'bulidName', 'list')
        })
      },
      abc3(params,name,list) {
        var arr = [];
        for (let i = 0; i < params.length; i++) {
          arr.push({name:params[i][name],data:params[i][list],type: 'line'})
        }
        return arr;
      },
      abc4(params,name) {
        var arr = [];
        for (let i = 0; i < params.length; i++) {
          arr.push(params[i][name])
        }
        return arr;
      },
      abc2(params, date) {
        return params[0][date];
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getList() {
        this.listLoading = true;
        getTodayCrystalReport().then(response => {
          this.listLoading = false;
          this.list = response.data.data;
        })
      }
    }
  }
</script>
<style scoped>
  #about,#about1 {
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


