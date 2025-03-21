<template>
  <basic-container>

    <el-descriptions class="margin-top" title="今日数据统计" column="5" border>
        <el-descriptions-item label="今日抢购花费ZCoin" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount1}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="今日奖励花费ZCoin" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount2}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="今日释放锁仓ZCoin" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount3}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="今日保险金" class="abc" content-class-name="my-content">
          <div class="pro">
            {{(echartsData.amount4-0).toFixed(4)}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="锁仓ZCoin" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount5}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="订单总ZCoin数" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount6}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="竞技场输掉金额" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount7}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="竞技场创建订单金额" class="abc" content-class-name="my-content">
          <div class="pro">
            {{echartsData.amount8}}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="竞技场退回ZCoin金额" class="abc" content-class-name="my-content">
          <div class="pro">
            {{(echartsData.amount9-0).toFixed(4)}}
          </div>
        </el-descriptions-item>


    </el-descriptions>
    <br><br>
    <br><br>

    <avue-crud :option="option"
               :page.sync="page"
               :data="data"
               @on-load="onLoad"
               @search-change="searchChange"
               @refresh-change="onLoad">

    </avue-crud>

  </basic-container>
</template>

<script>

import {pageStatistics, listPropertyDetail, pageRiskGive, pplToday} from "@/api/property/property";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";
import * as echarts from "echarts";
import dayjs from 'dayjs'
import {statusMap} from "@/const/property/riskgive";

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
      page: {
        total: 10
      },
      search: {
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        date: '',
      },
      echartsData: {}, //表格数据
      data: [],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        menu: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: "日期",
            prop: "date",
            type: "date",
            valueFormat:"yyyy-MM-dd",
            search: true,
          },
          {
            label: "输掉订单金额",
            prop: "loseAmount",
          },
          {
            label: "创建订单金额",
            prop: "createAmount",
          },
          {
            label: "退回ZCoin金额",
            prop: "backAmount",
          },

        ]
      }
    };
  },
  computed: {

  },
  mounted() {
    // 3、设置echarts参数

  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      pplToday(this.query).then(res => {
        this.loading = false;
        console.log(res, 'totalAmount', '平台总ZCoin');
        this.echartsData = res.data.data
      });
      this.pageStatistics();
    },
    pageStatistics() {
      pageStatistics(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    searchChange(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.pageStatistics();
      done();
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
