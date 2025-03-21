<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="用户ID：">
              <el-input v-model="listQuery.memberId" class="input-width" placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item label="场次日期：">
              <el-date-picker
                v-model="queryDate"
                type="date"
                placeholder="选择场次日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="团队：" prop="typeId">
              <el-select v-model="listQuery.teamId">
                <el-option
                    v-for="type in teamOptioned"
                    :key="type.teamId"
                    :label="type.teamName"
                    :value="type.teamId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
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
                v-loading="listLoading" border>
         <el-table-column label="用户ID"  align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="用户名称"  align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="场次ID" align="center">
          <template slot-scope="scope">{{scope.row.typeId}}</template>
        </el-table-column>
        <el-table-column label="场次名称" align="center">
          <template slot-scope="scope">{{scope.row.typeName}}</template>
        </el-table-column>
        <el-table-column label="预约消耗" align="center">
          <template slot-scope="scope">{{scope.row.point}}</template>
        </el-table-column>
        <el-table-column label="预约时间" align="center">
          <template slot-scope="scope">{{scope.row.createTimes}}</template>
        </el-table-column>
        <el-table-column label="场次时间" align="center">
          <template slot-scope="scope">{{scope.row.endTimes}}</template>
        </el-table-column>
        <el-table-column label="团队"  align="center">
          <template slot-scope="scope">{{formatTeam(teamOptioned,scope.row.teamId)}}</template>
        </el-table-column>
        <el-table-column label="未付款下级" align="center">
          <template slot-scope="scope">{{scope.row.count}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="show(scope.row)">查看下级未付款
            </el-button>
          </template>
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

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="90%"
      :append-to-body="true">
      <el-card class="filter-container" shadow="never">
        <div style="margin-top: 15px">

          <div class="table-container">
            <el-table ref="homeAdvertiseTable"
                      :data="list1"
                      style="width: 100%;"
                      v-loading="listLoading1" border>
              <el-table-column label="用户ID"  align="center">
                <template slot-scope="scope">{{scope.row.memberId}}</template>
              </el-table-column>
              <el-table-column label="用户名称"  align="center">
                <template slot-scope="scope">{{scope.row.nickname}}</template>
              </el-table-column>
              <el-table-column label="场次ID" align="center">
                <template slot-scope="scope">{{scope.row.typeId}}</template>
              </el-table-column>
              <el-table-column label="场次名称" align="center">
                <template slot-scope="scope">{{scope.row.typeName}}</template>
              </el-table-column>
              <el-table-column label="预约消耗" align="center">
                <template slot-scope="scope">{{scope.row.point}}</template>
              </el-table-column>
              <el-table-column label="订单金额" align="center">
                <template slot-scope="scope">{{scope.row.orderAmount}}</template>
              </el-table-column>
              <el-table-column label="订单状态" align="center">
                <template slot-scope="scope">
                  {{scope.row.orderStatus == 1 ? '已完成' : scope.row.orderStatus == 2 ? '交易中' :  scope.row.orderStatus == 3 ? '持有中' :  scope.row.orderStatus == 4 ? '待转售' :  scope.row.orderStatus == 5 ? '待抢购' : '申诉中'}}</template>
              </el-table-column>
              <el-table-column label="原持有人" align="center">
                <template slot-scope="scope">{{scope.row.haveMemberId}}</template>
              </el-table-column>
              <el-table-column label="持有人" align="center">
                <template slot-scope="scope">{{scope.row.haveForMemberId}}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              layout="total, sizes,prev, pager, next,jumper"
              :page-size="listQuery1.pageSize"
              :page-sizes="[5,10,15]"
              :current-page.sync="listQuery1.pageNum"
              :total="total1">
            </el-pagination>
          </div>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>

</template>
<script>
import {
  getPreInfoPage,
  getNoPayMemberInfo
} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
import {formatTeam} from "@/util/common";
import {listTeam} from "@/api/common/common";
import dayjs from "dayjs";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
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
        listQuery1: Object.assign({}, defaultListQuery),
        list: null,
        list1: null,
        total: null,
        total1: null,
        listLoading: false,
        listLoading1: false,
        queryDate: null,
        multipleSelection: [],
        teamOptioned:[],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        typeOptioned:null,
        typeOptioned1:[],
        operateType: null,
        dialogVisible:false,
        dialogVisible_fenjie:false,
        lstesded: null,
        buttonDisabled: false,
        preMemberCount: 0
      }
    },
    mounted() {
    },
    created() {
      this.getList();
      listTeam().then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.teamOptioned.push({teamName:response.data.data[i].teamName,teamId:response.data.data[i].id})
        }
      });
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
      formatTeam,
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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

      handleSizeChange1(val) {
        this.listQuery1.pageNum = 1;
        this.listQuery1.pageSize = val;
        this.getList1();
      },
      handleCurrentChange1(val) {
        this.listQuery1.pageNum = val;
        this.getList1();
      },
      getList() {
        this.listLoading = true;
        if (this.queryDate) {
          this.listQuery.remark = dayjs(this.queryDate).format('YYYY-MM-DD')
        } else {
          this.listQuery.remark = null
        }
        getNoPayMemberInfo(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
        })
      },
      show(row){
        this.dialogVisible=true;
        this.listLoading1 = true;
        this.listQuery1.memberId = row.memberId
        this.getList1();
      },
      getList1() {
        getPreInfoPage(this.listQuery1).then(response => {
          this.listLoading1 = false;
          this.list1 = response.data.data.records;
          this.total1 = response.data.data.total;
        })
      }
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


