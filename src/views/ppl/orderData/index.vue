<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-date-picker
            v-model="queryDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" size="small" @click="queryData()">操作</el-button>
          <!--          <el-form-item label="场次id：" prop="typeId">-->
          <!--            <el-select v-model="listQuery.typeId" @change="getGameGoodsList(listQuery.typeId)">-->
          <!--              <el-option-->
          <!--                v-for="type in typeOptioned"-->
          <!--                :key="type.typeId"-->
          <!--                :label="type.typeName"-->
          <!--                :value="type.typeId"-->
          <!--              >-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="商品ID：" prop="typeId">-->
          <!--            &lt;!&ndash; goodsNameList &ndash;&gt;-->
          <!--            <el-select v-model="listQuery.goodsId">-->
          <!--              <el-option-->
          <!--                v-for="type in goodsNameList"-->
          <!--                :key="type.goodsId"-->
          <!--                :label="type.goodsName"-->
          <!--                :value="type.goodsId"-->
          <!--              >-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--            &lt;!&ndash; <el-input v-model="listQuery.goodsId" class="input-width" placeholder="请输入商品名称"></el-input> &ndash;&gt;-->
          <!--          </el-form-item>-->
          <!-- <el-form-item label="用户ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="请输入商品名称"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="轮播图位置：">
            <el-select v-model="listQuery.bannerType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="开始时间：">
         <el-date-picker
           class="input-width"
           v-model="listQuery.beginTime"
           value-format="yyyy-MM-dd"
           type="date"
           placeholder="请选择时间">
         </el-date-picker>
       </el-form-item>
        <el-form-item label="结束时间：">
         <el-date-picker
           class="input-width"
           v-model="listQuery.endTime"
           value-format="yyyy-MM-dd"
           type="date"
           placeholder="请选择时间">
         </el-date-picker>
       </el-form-item> -->
        </el-form>
      </div>
    </el-card>
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
        <el-table-column label="长城名称"  align="center">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="当前场次起始金额"  align="center">
          <template slot-scope="scope">{{scope.row.data1}}</template>
        </el-table-column>
        <el-table-column label="当前场次收益金额"  align="center">
          <template slot-scope="scope">{{scope.row.data2}}</template>
        </el-table-column>
        <el-table-column label="当前场次总金额"  align="center">
          <template slot-scope="scope">{{scope.row.data3}}</template>
        </el-table-column>
        <el-table-column label="当前场次总金额(账本)"  align="center">
          <template slot-scope="scope">{{scope.row.data4}}</template>
        </el-table-column>
        <el-table-column label="奖励金额(账本)"  align="center">
          <template slot-scope="scope">{{scope.row.data9}}</template>
        </el-table-column>
        <el-table-column label="放出订单金额"  align="center">
          <template slot-scope="scope">{{scope.row.data5}}</template>
        </el-table-column>
        <el-table-column label="收回订单金额"  align="center">
          <template slot-scope="scope">{{scope.row.data6}}</template>
        </el-table-column>
        <el-table-column label="系统金额变化"  align="center">
          <template slot-scope="scope">{{scope.row.data7}}</template>
        </el-table-column>
        <el-table-column label="所有活动订单金额"  align="center">
          <template slot-scope="scope">{{scope.row.data8}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>

  </div>

</template>
<script>
import {
  getDataInfo
} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
import dayjs from "dayjs";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
    bannerType: null,
    endTime:null,
    id:null
  };
  export default {
    name: 'lockHome',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        typeOptioned:null,
        typeOptioned1:[],
        operateType: null,
        queryDate: null,
        dialogVisible:false,
        dialogVisible_fenjie:false,
        lstesded: {
          typeId: null,
          priceStart: null,
          priceEnd: null
        },
        buttonDisabled: false,
        preMemberCount: 0
      }
    },
    mounted() {
    },
    created() {
      this.getList();
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
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        getDataInfo(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data;
        })
      },
      queryData() {
        if (this.queryDate) {
          this.listQuery.date = dayjs(this.queryDate).format('YYYY-MM-DD')
        } else {
          this.listQuery.date = null
        }
        this.getList()
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
  .pagination-container {
    margin-bottom: 30px;
  }
</style>


