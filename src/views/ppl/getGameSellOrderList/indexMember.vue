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
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="场次id：" prop="typeId">
            <el-select v-model="listQuery.typeId">
              <el-option
                v-for="type in typeOptioned"
                :key="type.typeId"
                :label="type.typeName"
                :value="type.typeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到期日期：">
            <el-date-picker
              v-model="listQuery.expireTimes"
              type="date"
              placeholder="到期日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单ID：">
            <el-input v-model="listQuery.orderId" class="input-width" placeholder="请输入订单ID"></el-input>
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
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <template slot-scope="scope" v-if="false">
        <el-button el-button size="mini" class="btn-add" @click="autoBuy()">自动回收用户订单</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
         <el-table-column label="订单ID"  align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="交易ID"  align="center">
          <template slot-scope="scope">{{scope.row.rentId}}</template>
        </el-table-column>
        <el-table-column label="场次ID" align="center">
          <template slot-scope="scope">{{scope.row.typeId}}</template>
        </el-table-column>
               <el-table-column label="场次" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.typeName}}</p>
          </template>
        </el-table-column>
         <el-table-column label="专属场次" align="center">
          <template slot-scope="scope">{{scope.row.rentType == 1? '普通场' : 'VIP场'}}</template>
        </el-table-column>
        <el-table-column label="商品名称"  align="center">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.picUrl"></template>
        </el-table-column>
        <el-table-column label="转售人ID"  align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="转售人名称"  align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="金额"  align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
         <el-table-column label="总收益金额"  align="center">
          <template slot-scope="scope">{{scope.row.income}}</template>
        </el-table-column>
        <el-table-column label="每日收益"  align="center">
          <template slot-scope="scope">{{scope.row.tscaleDay}}</template>
        </el-table-column>
        <el-table-column label="收益天数"  align="center">
          <template slot-scope="scope">{{scope.row.typeDay}}</template>
        </el-table-column>
         <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.status == 1 ? '已完成' : scope.row.status == 2 ? '交易中' :  scope.row.status == 3 ? '持有中' :  scope.row.status == 4 ? '待转售' :  scope.row.status == 5 ? '待抢购' : '申诉中'}}</template>
        </el-table-column>
        <el-table-column label="金额类型" align="center">
          <template slot-scope="scope">
            {{scope.row.priceType == 0 ? '普通金额' : scope.row.priceType == 1 ? '初始金额' :  scope.row.priceType == 2 ? '交割金额' : '未知'}}</template>
        </el-table-column>
        <el-table-column label="团队"  align="center">
          <template slot-scope="scope">{{formatTeam(teamOptioned,scope.row.teamId)}}</template>
        </el-table-column>
        <el-table-column label="到期日期"  align="center" width="160">
          <template slot-scope="scope">{{scope.row.expireTimes}}</template>
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
      title="自动回收转售订单"
      :visible.sync="dialogVisible"
      width="40%"
      :append-to-body="true">
      <el-card class="filter-container" shadow="never">
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="lstesded" size="small" label-width="140px">
            <el-form-item label="场次id：">
              <el-select v-model="lstesded.typeId">
                <el-option
                  v-for="type in typeOptioned"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格：">
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="0"
                v-model="lstesded.priceStart"
                clearable
                placeholder="最小价格"
                style="width: 80px;"
              ></el-input-number>
              -
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="0"
                v-model="lstesded.priceEnd"
                clearable
                placeholder="最大价格"
                style="width: 80px;"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="toUser()" :disabled="buttonDisabled">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>

</template>
<script>
  // import {fetchList,updateStatus,deleteHomeAdvertise} from '@/api/homeAdvertise';
  import {
    getGameSellOrderListByMember,
    getGameTypeList,
    recycleOrder,
  } from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import {listTeam} from "@/api/common/common";
  import {formatTeam} from "@/util/common";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    bannerType: null,
    endTime:null,
    id:null
  };
  const defaultTypeOptions = [
    {
      label: '必不中',
      value: 0
    },
    {
      label: '必中',
      value: 1
    },
     {
      label: '随机',
      value: 2
    },

  ];
  export default {
    name: 'lockHome',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions: Object.assign({}, defaultTypeOptions),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        teamOptioned:[],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        typeOptioned:null,
        operateType: null,
        dialogVisible:false,
        dialogVisible_fenjie:false,
        lstesded: {
          typeId: null,
          priceStart: null,
          priceEnd: null
        },
        buttonDisabled: false
      }
    },
    created() {
      this.getList();
      getGameTypeList({status:1}).then((response) => {
          this.typeOptioned=response.data.data.records
      });
      listTeam().then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.teamOptioned.push({teamName:response.data.data[i].teamName,teamId:response.data.data[i].id})
        }
      });
    },
    filters:{
       formatStatus(status){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(status===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
      },
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
        if (this.listQuery.expireTimes) {
          this.listQuery.expireTimes = formatDate(this.listQuery.expireTimes, 'yyyy-MM-dd')
        }
        getGameSellOrderListByMember(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
        })
      },
      toUser(){
        this.$confirm('是否要自动回收转售订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonDisabled = true
          recycleOrder(this.lstesded).then(response=>{
            if (response.data.code == 200) {
              this.getList();
              this.$message({
                message: response.data.msg,
                type: 'success',
                duration: 4000
              });
              this.dialogVisible=false;
            } else {
              this.$message({
                message: response.msg,
                type: 'warning',
                duration: 4000
              });
            }
          }).finally(() => {
            this.buttonDisabled = false
          })
        })
      },
      autoBuy(){
        this.dialogVisible=true;
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


