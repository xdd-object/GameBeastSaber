<template>
  <div>
    <el-card class="box-card">
      <el-row gutter="10">
        <el-col :span="3">
          <div class="search_input">
            <el-input v-model="searchData.userId" placeholder="请输入用户id"></el-input>

          </div>
        </el-col>
        <el-col :span="3.5">
          <el-date-picker v-model="searchDate" type="date" placeholder="选择开始日期" :picker-options="pickerOptions"
            value-format="timestamp">
          </el-date-picker>
        </el-col>

        <el-col :span="1.5">
          <el-button type="primary" @click="searchClick">搜索</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button @click="clearStatus">清空状态</el-button>
        </el-col>
        <el-col :span="5">
          <el-select filterable placeholder="请选择排行榜周期" style="margin-left: 10px" v-model="rankingPeriod"
            :clearable="true">
            <el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>

      </el-row>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column prop="userId" label="领取用户id"> </el-table-column>
        <el-table-column prop="date" label="时间"> </el-table-column>
        <el-table-column prop="reward" label="奖励"> </el-table-column>
      </el-table>
      <el-pagination style="margin: 50px" background layout="prev, pager, next,sizes" :total="pageTotal"
        :current-page="query.pageNum" :page-size="query.pageSize" @current-change="currentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { reqRedpacketrDailyRank, reqRedpacketrWeekRank } from "@/api/redPacket/index";
import dayjs from 'dayjs'

export default {

  data() {
    return {
      query: {
        "pageNum": 1,
        "pageSize": 10
      },
      pageTotal: 0,
      loading: false,
      searchData: {
        userId: '',
        date: '',
      },
      option: [
        {
          id: 0,
          name: '每日排行榜'
        },
        {
          id: 1,
          name: '每周排行榜'
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      rankingPeriod: 0,
      searchDate: '',

    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    // 清空搜索条件
    clearStatus() {
      this.query = {
        "pageNum": 1,
        "pageSize": 10
      },
        this.searchData = {
          userId: '',
          date: '',
        },
        this.searchDate = ''
      this.onLoad()

    },

    currentChange(e) {
      this.query.pageNum = e
      this.onLoad()

    },
    handleSizeChange(e) {
      this.query.pageSize = e
      this.onLoad()
    },
    transitionDate(date) {
      const result = `${dayjs(date).$y}-${(dayjs(date).$M + 1).toString().padStart(2, '0')}-${dayjs(date).$D.toString().padStart(2, '0')}`
      return result
    },
    onLoad() {
      this.loading = true;
      if (this.searchDate) {
        this.searchData.date = this.transitionDate(this.searchData.date)
      }
      switch (this.rankingPeriod) {
        case 0:
          reqRedpacketrDailyRank({ ...this.query, ...this.searchData }).then(res => {
            const data = res.data.data;
            this.tableData = data.list;
            this.pageTotal = data.total;
            this.loading = false;
          });
          break;
        case 1:
          reqRedpacketrWeekRank({ ...this.query, ...this.searchData }).then(res => {
            const data = res.data.data;
            this.tableData = data.list;
            this.pageTotal = data.total;
            this.loading = false;
          });
          break;
        default:
          reqRedpacketrDailyRank({ ...this.query, ...this.searchData }).then(res => {
            const data = res.data.data;
            console.log(data, 'data');
            this.tableData = data.list;
            this.pageTotal = data.total;
            this.loading = false;
          });
          break;
      }


    },
    searchClick() {
      this.onLoad()

    },
  },
  watch: {
    rankingPeriod() {
      this.query = {
        "pageNum": 1,
        "pageSize": 10
      },
        this.searchDate = ''

      this.searchData = {
        userId: '',
        date: '',
      },
        this.onLoad()

    }
  }
}
</script>

<style lang="scss" scoped>
.search_input {
  display: flex;
}

.dialog_box {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;

  .upload-demo {
    margin-top: 80px;
  }
}

.dialog_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>