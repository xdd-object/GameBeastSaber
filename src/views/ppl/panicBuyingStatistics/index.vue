<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
<!--      <div>-->
<!--        <i class="el-icon-search"></i>-->
<!--        <span>筛选搜索</span>-->
<!--        <el-button-->
<!--          style="float:right"-->
<!--          type="primary"-->
<!--          @click="handleSearchList()"-->
<!--          size="small">-->
<!--          查询搜索-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          style="float:right;margin-right: 15px"-->
<!--          @click="handleResetSearch()"-->
<!--          size="small">-->
<!--          重置-->
<!--        </el-button>-->
<!--      </div>-->
      <div style="margin-top: 15px">
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
      <!-- <template slot-scope="scope">
        <el-button el-button size="mini" class="btn-add" @click="handleAdd(scope.$index, scope.row)">添加商品</el-button>
      </template> -->
      <template slot-scope="scope">
        <el-button el-button size="mini" class="btn-add" @click="autoBuy()">未抢购VIP自动抢单</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column>  -->
<!--         <el-table-column label="场次id"  align="center">-->
<!--          <template slot-scope="scope">{{scope.row.typeId}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="场次名称" align="center" width="100">
          <template slot-scope="scope">{{scope.row.typeName}}</template>
        </el-table-column>
<!--        <el-table-column label="商品ID" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.goodsId}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="商品名称"  align="center">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="总数" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column label="待转售数量" align="center">
          <template slot-scope="scope">{{scope.row.buyWeight}}</template>
        </el-table-column>
        <el-table-column label="预约人数" width="" align="center">
          <template slot-scope="scope">{{scope.row.pointCount}}</template>
        </el-table-column>
        <el-table-column label="VIP预约数" width="" align="center">
          <template slot-scope="scope">{{scope.row.vipPointCount}}</template>
        </el-table-column>
        <el-table-column label="新用户预约数" width="" align="center">
          <template slot-scope="scope">{{scope.row.newPointCount}}</template>
        </el-table-column>
        <el-table-column label="VIP未抢中数" width="" align="center">
          <template slot-scope="scope">{{scope.row.noPreOrder}}</template>
        </el-table-column>
        <el-table-column label="抢购人数" width="" align="center">
          <template slot-scope="scope">{{scope.row.saleCount}}</template>
        </el-table-column>
        <el-table-column label="抢中人数" width="" align="center">
          <template slot-scope="scope">{{scope.row.saleWinCount}}</template>
        </el-table-column>
        <el-table-column label="未付款数" width="" align="center">
          <template slot-scope="scope">{{scope.row.noPayNum}}</template>
        </el-table-column>
        <el-table-column label="抢购交割数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCompleteCount}}</template>
        </el-table-column>
        <el-table-column label="抢购交割付款数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCompletePayCount}}</template>
        </el-table-column>
        <el-table-column label="抢购交割未付款数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCompleteNoPayCount}}</template>
        </el-table-column>
        <el-table-column label="普通用户交割数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCompleteMemberCount}}</template>
        </el-table-column>
        <el-table-column label="普通用户交割未付款数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCompleteNoPayMemberCount}}</template>
        </el-table-column>
        <el-table-column label="抢购创建数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyCreateCount}}</template>
        </el-table-column>
        <el-table-column label="完成转售数" width="" align="center">
          <template slot-scope="scope">{{scope.row.buyRentCount}}</template>
        </el-table-column>
        <el-table-column label="抢购花费" width="" align="center">
          <template slot-scope="scope">{{scope.row.saleAmount}}</template>
        </el-table-column>
        <el-table-column label="平台奖励" width="" align="center">
          <template slot-scope="scope">{{scope.row.rewardsAmount}}</template>
        </el-table-column>
        <el-table-column label="交易手续费" width="" align="center">
          <template slot-scope="scope">{{scope.row.serviceAmount}}</template>
        </el-table-column>
        <el-table-column label="平台放出价值" width="" align="center">
          <template slot-scope="scope">{{scope.row.outAmount}}</template>
        </el-table-column>
        <el-table-column label="平台放出数量" width="" align="center">
          <template slot-scope="scope">{{scope.row.outCount}}</template>
        </el-table-column>
        <el-table-column label="平台收回价值" width="" align="center">
          <template slot-scope="scope">{{scope.row.inAmount}}</template>
        </el-table-column>
        <el-table-column label="平台收回数量" width="" align="center">
          <template slot-scope="scope">{{scope.row.inCount}}</template>
        </el-table-column>
        <el-table-column label="交割订单价值" width="" align="center">
          <template slot-scope="scope">{{scope.row.completeAmount}}</template>
        </el-table-column>
        <el-table-column label="交割订单数量" width="" align="center">
          <template slot-scope="scope">{{scope.row.completeCount}}</template>
        </el-table-column>
        <el-table-column label="未付款定金" width="" align="center">
          <template slot-scope="scope">{{scope.row.noPayPointAmount}}</template>
        </el-table-column>
        <el-table-column label="未付款数量" width="" align="center">
          <template slot-scope="scope">{{scope.row.noPayCount}}</template>
        </el-table-column>
        <el-table-column label="平台差值" width="" align="center">
          <template slot-scope="scope">{{scope.row.differenceAmount}}</template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div> -->
    <!-- <div class="pagination-container">
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
    </div> -->

    <el-descriptions class="margin-top" style="padding-bottom: 100px" :title="`新人场数据`" column="6" border>
      <el-descriptions-item label="VIP会员人数" class="abc" content-class-name="my-content">
        <div class="pro">
          {{vipCount}}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="抢购价值" class="abc" content-class-name="my-content">
        <div class="pro">
            {{newDate.newSaleAmount}}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="抢购人数" class="abc" content-class-name="my-content">
        <div class="pro">
          {{newDate.newSaleCount}}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="到期价值" class="abc" content-class-name="my-content">
        <div class="pro">
          {{newDate.newGenerateAmount}}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="到期人数" class="abc" content-class-name="my-content">
        <div class="pro">
          {{newDate.newGenerateCount}}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="到期奖励" class="abc" content-class-name="my-content">
        <div class="pro">
          {{newDate.newRewardsAmount}}
        </div>
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog
      title="未抢购VIP自动抢购"
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
    getGamePreList,
    getTodayPreReport,
    getNewTodayPreReport,
    getVipCount,
    free_lockDelete,
    updateGameGoods,
    getGameTypeList,
    getGameGoodsList,
    addVipGoodsBuy,
    setGameOrderToUser
  } from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import dayjs from 'dayjs'
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
        lstesded: {
          typeId: null
        },
        list: null,
        total: null,
        queryDate: null,
        listLoading: false,
        multipleSelection: [],
        newDate:{},
        vipCount:0,
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        dialogVisible:false,
        typeOptioned:null,
        goodsNameList:null,
        operateType: null,
        buttonDisabled: false
      }
    },
    created() {
      this.getList();
      this.getVipCount();
      this.getNewData();
      getGameTypeList({status:1}).then((response) => {
          this.typeOptioned=response.data.data.records
      });
    },
    filters:{
      // formatType(type){
      //   if(type===1){
      //     return 'APP首页轮播';
      //   }else{
      //     return 'PC首页轮播';
      //   }
      // },
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
      getGameGoodsList(typeId){
        let info = {
          typeId:typeId
        }
        getGameGoodsList(info).then((res)=>{
          this.goodsNameList = res.data.list
        })
      },

     handlePublishStatusChange(index,row){
      //  let params = new URLSearchParams();
      //   params.append('id', row.id);
      //   params.append('autoRobotSwitch', row.autoRobotSwitch);
      //   params.append('autoRobotJackpotStatus', row.autoRobotJackpotStatus);
      let info = {
        goodsId:row.goodsId,
        status:row.status
      };
        updateGameGoods(info).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
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
      handleUpdateStatus(index,row){
        this.$confirm('是否要修改上线/下线状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id,{status:row.status}).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消操作!'
          });
          this.getList();
        });
      },
      handleDelete(index,row){
       this.$router.push({path: '/pms/canyurens', query: {id: row.id,}})
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let idList = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idList.push(this.multipleSelection[i].id);
          console.log(idList,'id集合')
        }
        if(this.operateType===0){
          //删除
          this.carouselDeleteBatch(idList);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleAdd(index,row){
        // this.$router.push({path: '/pms/groupBookingAdd'})
        this.$router.push({path: '/pms/HomeAdvertiseDetail', query: {row: row,}})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/pms/groupBookingsUpdate', query: {row: row}})
      },
      queryData() {
        if (this.queryDate) {
          this.listQuery.date = dayjs(this.queryDate).format('YYYY-MM-DD')
        } else {
          this.listQuery.date = null
        }
        this.getList()
        this.getNewData()
      },
      getList() {
        this.listLoading = true;
        // getGamePreList(this.listQuery).then(response => {
        //   this.listLoading = false;
        //   this.list = response.data.list;
        //   this.total = response.data.total;
        // })
        getTodayPreReport(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data;
          // this.total = response.data.total;
        })
      },
      getNewData() {
        getNewTodayPreReport(this.listQuery).then(response => {
          this.newDate = response.data.data;
        })
      },
      getVipCount() {
        getVipCount().then(response => {
          this.vipCount = response.data.data;
        })
      },
      free_lockDelete(id){
        this.$confirm('是否要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",id);
          free_lockDelete(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
       carouselDeleteBatch(idList){
        this.$confirm('是否要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("idList",idList);
          carouselDeleteBatch(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      toUser(){
        this.$confirm('是否要VIP自动抢购?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonDisabled = true
          addVipGoodsBuy(this.lstesded).then(response=>{
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
  .pro {
    cursor: pointer;
  }
  .my-content {
    background: #FDE2E2;
  }
</style>


