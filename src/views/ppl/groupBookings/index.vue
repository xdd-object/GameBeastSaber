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
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.goodsName" class="input-width" placeholder="请输入商品名称"></el-input>
          </el-form-item>
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

      <template slot-scope="scope"  v-if="false">
        <el-button el-button size="mini" class="btn-add" @click="handleAdd(scope.$index, scope.row)">添加商品</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column>  -->
         <el-table-column label="商品ID"  align="center">
          <template slot-scope="scope">{{scope.row.goodsId}}</template>
        </el-table-column>

        <el-table-column label="场次ID" align="center">
          <template slot-scope="scope">{{scope.row.typeId}}</template>
        </el-table-column>
               <el-table-column label="场次" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.typeName}}</p>
           <!--  <p>开始时间：{{scope.row.buyNumber.startBuyingTime | formatTime}}</p>
            <p>到期时间：{{scope.row.buyNumber.endBuyTime | formatTime}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="商品名称"  align="center">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.picUrl"></template>
        </el-table-column>
         <el-table-column label="区间" align="center">
          <template slot-scope="scope">{{scope.row.minPrice}} - {{scope.row.maxPrice}}</template>
        </el-table-column>

          <el-table-column label="预约ACC" align="center">
          <template slot-scope="scope">{{scope.row.point}}</template>
        </el-table-column>

        <el-table-column label="排序">
          <template slot-scope="scope">
              {{scope.row.sortId}}
            </template>
        </el-table-column>

          <el-table-column label="是否上架"  align="center">
          <template slot-scope="scope" v-if="false">
            <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
     <!--   <el-table-column label="直接分润"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.secendAward}}</span>
          </template>
        </el-table-column>
        <el-table-column label="间接分润"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.shareAward}}</span>
          </template>
        </el-table-column>  -->
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope" v-if="false">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
          </template>
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
  import {getGameGoodsList,carouselDelete,free_lockDelete,updateGameGoods,getGameTypeList} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
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
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        typeOptioned:null,
        operateType: null
      }
    },
    created() {
      this.getList();
      getGameTypeList().then((response) => {
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
        this.$router.push({path: '/ppl/HomeAdvertiseDetail', query: {row: row}})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/ppl/groupBookingsUpdate', query: {row: row}})
      },
      getList() {
        this.listLoading = true;
        getGameGoodsList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
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
  .pagination-container {
    margin-bottom: 30px;
  }
</style>


