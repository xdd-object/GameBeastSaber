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
          <!-- <el-form-item label="编号：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="广告名称"></el-input>
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
          <!-- <el-form-item label="到期时间：">
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
      <el-button v-if="false" size="mini" class="btn-add" @click="handleAdd()">添加场次</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="ID"  align="center">
          <template slot-scope="scope">{{scope.row.typeId}}</template>
        </el-table-column>
        <el-table-column label="名称"  align="center">
          <template slot-scope="scope">{{scope.row.typeName}}</template>
        </el-table-column>
        <!-- <el-table-column label="轮播图名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column> -->
        <!-- <el-table-column label="轮播图位置"  align="center">
          <template slot-scope="scope">{{scope.row.bannerType | formatStatus}}</template>
        </el-table-column>
          <el-table-column label="h5链接"  align="center">
          <template slot-scope="scope">{{scope.row.bannerUrlPath}}</template>
        </el-table-column>
        <el-table-column label="轮播图片" width="" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.bannerUrl"></template>
        </el-table-column> -->
        <el-table-column label="时间" width="220" align="center">
          <template slot-scope="scope">
            <p>预约时间：{{scope.row.endSubscribeTimed | formatTime}}</p>
            <p>开始时间：{{scope.row.startTimed | formatTime}}</p>
            <p>结束时间：{{scope.row.endTimed | formatTime}}</p>
            <p>捡漏开始时间：{{scope.row.closeStartTimed | formatTime}}</p>
            <p>捡漏结束时间：{{scope.row.closeTimed | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope" v-if="false">
            <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <!-- <el-table-column label="点击次数" width="120" align="center">
          <template slot-scope="scope">{{scope.row.clickCount}}</template>
        </el-table-column> -->
        <!-- <el-table-column label="生成订单" width="120" align="center">
          <template slot-scope="scope">{{scope.row.orderCount}}</template>
        </el-table-column> -->
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope" v-if="false">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">修改
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
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
  // import {fetchList,updateStatus,deleteHomeAdvertise} from '@/api/homeAdvertise';
  import {getGameTypeList,updateGameType,deleteGameType,carouselDeleteBatch} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
    bannerType: null,
    endTime:null,
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
    name: 'dScreeninghome',
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
        return formatDate(date,  'hh:mm:ss')
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
        this.carouselDelete(row.typeId);
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
        this.$router.push({path: '/ppl/ScreeningAdd'})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/ppl/ScreeningUpdate', query: {row: row}})
      },
      getList() {
        this.listLoading = true;
        getGameTypeList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
        })
      },
      handlePublishStatusChange(i,item){
        let info = {
          status:item.status,
          typeId:item.typeId
        }
        updateGameType(info).then(res =>{
          this.getList()
          this.$message({
            type:'success',
            message:'修改成功！'
          })
        })
      },
      carouselDelete(typeId){
        this.$confirm('是否要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // let params=new URLSearchParams();
          // params.append("typeId",typeId);
          let info = {
            typeId:typeId
          };
          deleteGameType(info).then(response=>{
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


