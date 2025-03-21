<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <!-- <div>
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
      </div> -->
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <!-- <el-form-item label="场次id：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="场次id"></el-input>
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

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加商品</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
         <el-table-column label="buyId"  align="center">
          <template slot-scope="scope">{{scope.row.buyId}}</template>
        </el-table-column>

        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.member.id}}</template>
        </el-table-column>
         <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.member.nickname}}</template>
        </el-table-column>
         <el-table-column label="编码" align="center">
          <template slot-scope="scope">{{scope.row.groupCode}}</template>
        </el-table-column>
           <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.indentId}}</template>
        </el-table-column>
        <el-table-column label="拼团时间" width="220" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.gmtCreate | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否为发起人"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sponsor==1">发起</span>
            <span v-if="scope.row.sponsor==0">参与</span>
          </template>
        </el-table-column>
           <!-- <el-table-column label="中奖率(几个人中奖)" align="center">
          <template slot-scope="scope">{{scope.row.winRate}}</template>
        </el-table-column>
           <el-table-column label="单价" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
          <el-table-column label="消费卷" align="center">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>
          <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.groupSort}}</template>
        </el-table-column>
        <el-table-column label="商品名称"  align="center">
          <template v-if="scope.row.product!=null" slot-scope="scope">{{scope.row.product.name}}</template>
        </el-table-column> -->
          <!-- <el-table-column label="商品价格"  align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column> -->
         <!-- <el-table-column label="参与人数"  align="center">
          <template slot-scope="scope">{{scope.row.participants}}</template>
        </el-table-column>

        <el-table-column label="商品图片" width="" align="center">
          <template v-if="scope.row.product!=null" slot-scope="scope"><img style="height: 80px" :src="scope.row.product.pic"></template>
        </el-table-column>-->
          <el-table-column label="开奖状态"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.drawStatus==1">已开奖</span>
            <span v-if="scope.row.drawStatus==0">未开奖</span>
          </template>
        </el-table-column>
           <el-table-column label="中奖状态"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.jackpotStatus==1">已中奖</span>
            <span v-if="scope.row.jackpotStatus==0">未中奖</span>
          </template>
        </el-table-column>
         <el-table-column label="是否必中"  align="center">
           <template slot-scope="scope">
           <el-radio-group v-model="scope.row.mustJackpot">
          <el-radio :label="0" @change="shi(scope.$index,scope.row)">否</el-radio>
          <el-radio :label="1"  @change="fou(scope.$index,scope.row)">是</el-radio>
        </el-radio-group>
          </template>
      </el-table-column>
       <el-table-column label="是否必不中"  align="center">
           <template slot-scope="scope">
           <el-radio-group v-model="scope.row.notJackpot">
          <el-radio :label="0" @change="shi1(scope.$index,scope.row)">否</el-radio>
          <el-radio :label="1"  @change="fou1(scope.$index,scope.row)">是</el-radio>
        </el-radio-group>
          </template>
      </el-table-column>
        <!-- <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">补单
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">满团开奖
            </el-button>
          </template>
        </el-table-column> -->
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
  // import {fetchList,updateStatus,deleteHomeAdvertise} from '@/api/homeAdvertise';
  import {user,userupdate,notJackpot} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    bannerType: null,
    endTime:null,
    buyId:null
  };
  const defaultTypeOptions = [
    {
      label: '首页顶端轮播图',
      value: 1
    },
    {
      label: '首页新品轮播图',
      value: 2
    },
       {
      label: '品牌馆轮播图',
      value: 3
    },
       {
      label: '爆款专区轮播图',
      value: 4
    },
       {
      label: '折扣专区轮播图',
      value: 5
    },
     {
      label: '经销商专区轮播图',
      value: 6
    },
     {
      label: '拼团专区轮播图',
      value: 7
    },
     {
      label: '其它可以增加轮播图',
      value: 8
    },
      {
      label: '生活超市轮播图',
      value: 9
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
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.listQuery.buyId=this.$route.query.id
      this.getList();
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
       shi(index,row){
         userupdate(row).then(response=>{
       this.getList();
         })
console.log('是')
       },
        fou(index,row){
            userupdate(row).then(response=>{
       this.getList();
         })
console.log('否')
       },
        shi1(index,row){
         notJackpot(row).then(response=>{
       this.getList();
         })
console.log('是')
       },
        fou1(index,row){
            notJackpot(row).then(response=>{
       this.getList();
         })
console.log('否')
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
       this.$router.push({path: '/pms/groupBookingUpdate', query: {row: row,}})
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
      handleAdd(){
        this.$router.push({path: '/pms/groupBookingAdd'})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/pms/groupBookingUpdate', query: {row: row,}})
      },
      getList() {
        this.listLoading = true;
        console.log(this.listQuery,'1111111')
        user(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
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
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


