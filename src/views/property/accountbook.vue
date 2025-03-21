<template>
  <basic-container>
    <el-select v-model="query.currencyId" clearable  placeholder="请选择资产类型">
      <el-option
          v-for="item in currencyData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>&nbsp;&nbsp;

    <el-select v-model="query.configId" clearable  placeholder="请选择账本配置">
      <el-option
          v-for="item in configData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
      </el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-date-picker
        v-model="query.date"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择日期">
    </el-date-picker>
    &nbsp;&nbsp;
    <el-button type="primary" v-on:click="queryData()">查询</el-button>
    <br>
    <br>

    <el-row :gutter="20">
      <el-col :span="10"><div id="about22">
        <el-table
            :data="increases"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${query.date}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              label="资产类型">
            <template slot-scope="{row}">
              <p>{{ row.currencyId| swatchVal}}</p>
            </template>
          </el-table-column>
          <el-table-column
              prop="type"
              label="账本类型">
          </el-table-column>
          <el-table-column
              prop="desc"
              label="资产产出项">
          </el-table-column>
          <el-table-column
              prop="amount"
              :label="`金额（${increaseAmount}）`"
              width="180">
          </el-table-column>
        </el-table>
      </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="10"><div id="about22">
        <el-table
            :data="reduce"
            style="width: 100%">
          <el-table-column
              prop=""
              :label="`日期（${query.date}）`"
              width="180">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
              label="资产类型">
            <template slot-scope="{row}">
              <p>{{ row.currencyId| swatchVal}}</p>
            </template>
          </el-table-column>
          <el-table-column
              prop="type"
              label="账本类型">
          </el-table-column>
          <el-table-column
              prop="desc"
              label="资产消耗项">
          </el-table-column>
          <el-table-column
              prop="amount"
              :label="`金额（${reduceAmount}）`"
              width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>

  </basic-container>
</template>

<script>

import {listMonitorConfig, listAccountBook, listProperty} from "@/api/property/property";
import {currencyMap} from "@/const/currency/currency";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";
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
      page: {
        total: 10
      },
      search: {
      },
      query: {
        currencyId: '',
        configId: '',
        date: '',
      },
      currencyData: [], //资产类型
      configData: [], //配置
      increases: [], //表格数据
      reduce: [], //
      increaseAmount: 0, //
      reduceAmount: 0, //
    };
  },
  computed: {

  },
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.query.date = dayjs().format('YYYY-MM-DD')
      this.currencyData = mapToOptions(currencyMap);
      listMonitorConfig(this.query).then(res => {
        this.loading = false;
        this.configData = res.data.data
      });
      this.queryData();
    },
    queryData() {
      listAccountBook(this.query).then(res => {
        this.increases = res.data.data.increases;
        this.reduce = res.data.data.reduce;
        this.increaseAmount = res.data.data.increaseAmount;
        this.reduceAmount = res.data.data.reduceAmount;
      });
    },
  },
filters:{
    swatchVal(val){
      return currencyMap[val]||'未知'
    }
}
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
