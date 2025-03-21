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
          <el-select clearable v-model="listQuery.typeId">
            <el-option
              v-for="type in typeOptioned"
              :key="type.typeId"
              :label="type.typeName"
              :value="type.typeId"
            >
            </el-option>
          </el-select>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <template slot-scope="scope">
        <el-button el-button size="mini" class="btn-add" @click="addCompleteSplit({}, 1)">新增交割用户</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="场次ID"  align="center">
          <template slot-scope="scope">{{formatType(scope.row.typeId)}}</template>
        </el-table-column>
        <el-table-column label="拆分场次ID"  align="center">
          <template slot-scope="scope">{{formatType(scope.row.splitTypeId)}}</template>
        </el-table-column>
        <el-table-column label="拆分价格"  align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="拆分总额"  align="center">
          <template slot-scope="scope">{{scope.row.totalPrice}}</template>
        </el-table-column>
        <el-table-column label="拆分类型"  align="center">
          <template slot-scope="scope">{{formatPriceType(scope.row.priceType)}}</template>
        </el-table-column>
        <el-table-column label="拆分数量"  align="center">
          <template slot-scope="scope">{{scope.row.num}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="deleteCompleteSplit(scope.$index, scope.row)">删除
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
      width="60%"
      :append-to-body="true">
      <el-card class="filter-container" shadow="never">
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="lstesded" size="small" label-width="120px">
            <el-form-item label="场次ID：">
              <el-select clearable v-model="lstesded.typeId">
                <el-option
                  v-for="type in typeOptioned"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拆分场次ID：">
              <el-select clearable v-model="lstesded.splitTypeId" @change="getGamePriceList(lstesded.splitTypeId)">
                <el-option
                  v-for="type in typeOptioned"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拆分价格：">

              <div v-for="item,index in splitArr" :key="item" style="display: flex;margin-bottom: 20px;">
                  <el-select v-model="splitArr[index].price"  @change="submitPrice(splitArr[index].price,index)"  style="width: 100px;">
                <el-option
                  v-for="price in goodsPriceList"
                  :key="price.startPrice"
                  :label="price.startPrice"
                  :value="price.startPrice"
                >
                </el-option>
              </el-select>
              <div style="margin-left: 20px;">
              数量：<el-input v-model="splitArr[index].num" placeholder="数量" style="width: 80px;" @blur="numblur"></el-input>

              </div>
              <div style="margin-left: 20px;">
                总额：<el-input v-model="splitArr[index].totalPrice" :disabled="true" class="input-width" placeholder="拆分总额" style="width: 80px;"></el-input>
              </div>
              <div style="margin-left: 20px;">
                类型： <el-input v-model="splitArr[index].priceTypeName" :disabled="true" class="input-width" placeholder="拆分类型" style="width: 100px;"></el-input>
              </div>
              <div style="margin-left: 20px;">
                <el-button type="success" @click="addSplitItem" v-if="index==splitArr.length-1">新增</el-button>
                <el-button type="danger" @click="removeSplitItem(index)">删除</el-button>
              </div>
                </div>
            </el-form-item>
            <!-- <el-form-item label="拆分总额：">
              <el-input v-model="lstesded.totalPrice" :disabled="true" class="input-width" placeholder="拆分总额"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="拆分类型：">
              <el-input v-model="lstesded.priceTypeName" :disabled="true" class="input-width" placeholder="拆分类型"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="拆分数量：">
              <el-input v-model="lstesded.num" class="input-width" placeholder="请输入拆分数量"></el-input>
            </el-form-item> -->
            <el-form-item label="">
              <el-button type="primary" @click="toUser()" :disabled="buttonDisabled">确认</el-button>
            </el-form-item>
          </el-form>
          <div style="margin-left: 20px;">
            订单金总额：<el-input v-model="sumPrice" :disabled="true" class="input-width" placeholder="总额" style="width: 180px;"></el-input>
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
  deleteCompleteSplit,
  addCompleteSplit,
  getCompleteSplitList,
  getGameTypeList, getGamePriceList,
} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    bannerType: null,
    endTime:null,
    id:null
  };
const priceTypeMap = {
  0: '普通订单',
  1: '初始订单',
  2: '交割订单',
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
        operateType: null,
        dialogVisible:false,
        lstesded: {
          typeId: null,
          splitTypeId:null
        },
        buttonDisabled: false,
        goodsPriceList:null,
        splitArr:[{
          id:0,
          price:null,
          num:0,
          priceTypeName:''
        }],
        sumPrice:0
      }
    },
    created() {
      getGameTypeList({status:1}).then((response) => {
        this.typeOptioned=response.data.data.records
        this.getList();
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
      numblur() {
        this.sumPrice = 0;
        for (let i = 0; i < this.splitArr.length; i++) {
          this.sumPrice += this.splitArr[i].num * this.splitArr[i].price;
        }
      },
      addSplitItem(){
        let dataObj={
          id:this.splitArr.length,
          price:null,
          num:0,
          totalPrice:0,
          priceTypeName:'',
          priceType:0,
          typeId:0,
          splitTypeId:0,
        }
        this.splitArr.push(dataObj)
      },
      removeSplitItem(index){
        if (this.splitArr.length == 1) {
          this.$message({
            message: "至少需要一项！",
            type: 'warning',
            duration: 4000
          });
          return;
        }
        this.splitArr.splice(index,1)
        this.numblur();
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
      getList() {
        this.listLoading = true;
        getCompleteSplitList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
        })
      },
      formatType(typeId){
        if(typeId==null||typeId===''){
          return '无';
        }
        for (let i = 0; i < this.typeOptioned.length; i++) {
          if (this.typeOptioned[i].typeId == typeId) {
            return this.typeOptioned[i].typeName
          }
        }
        return "无";
      },
      formatPriceType(priceType){
        return priceTypeMap[priceType];
      },
      deleteCompleteSplit(index,row){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let info = {
            id:row.id
          }
          deleteCompleteSplit(info).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      toUser(){
        this.buttonDisabled = true
        addCompleteSplit(this.splitArr).then(response=>{
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
      },
      addCompleteSplit(row, type){
        this.lstesded = row
        this.dialogVisible=true;
      },
      getGamePriceList(typeId){
        let info = {
          typeId:typeId,
          pageSize:100
        }
        getGamePriceList(info).then((res)=>{
          this.goodsPriceList = res.data.data.records
        })
      },
      submitPrice(price,index){
        this.lstesded.priceTypeName = null
        this.lstesded.priceType = null
        this.lstesded.totalPrice = null
        if(price==null||price==''){
          return;
        }
        for (let i = 0; i < this.goodsPriceList.length; i++) {
          if (this.goodsPriceList[i].startPrice == price) {
            this.lstesded.priceType = this.goodsPriceList[i].priceType
            this.lstesded.totalPrice = this.goodsPriceList[i].totalPrice
            this.lstesded.priceTypeName = priceTypeMap[this.lstesded.priceType]
            this.splitArr[index].totalPrice= this.lstesded.totalPrice
            this.splitArr[index].priceTypeName= this.lstesded.priceTypeName
            this.splitArr[index].priceType= this.lstesded.priceType
            this.splitArr[index].typeId= this.lstesded.typeId
            this.splitArr[index].splitTypeId= this.lstesded.splitTypeId
          }
        }
        this.numblur()
      }
    },
    watch:{
      'lstesded.typeId'(val){
        // this.splitArr=[{
        //   id:0,
        //   price:null,
        //   num:0,
        //   priceTypeName:''
        // }]
      this.splitArr.map(item=>item.typeId=val)
      },
      'lstesded.splitTypeId'(val){
        // this.splitArr=[{
        //   id:0,
        //   price:null,
        //   num:0,
        //   priceTypeName:''
        // }]
      this.splitArr.map(item=>item.splitTypeId=val)
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
  #about,#about0,#about1,#about2,#about3,#about4,#about5 {
    width: 800px;
    height: 700px;
  }
  .pro {
    cursor: pointer;
  }
  .my-content {
    background: #FDE2E2;
  }
</style>


