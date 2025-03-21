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
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <template slot-scope="scope">
        <el-button el-button size="mini" class="btn-add" @click="addYangTypeFinanceSms({}, 1)">新增短信发送人</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
         <el-table-column label="手机号"  align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">{{scope.row.status == 0 ? '不发送' :  '发送'}}</template>
        </el-table-column>
        <el-table-column label="发送时间"  align="center">
          <template slot-scope="scope">{{scope.row.sendTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="间隔时间(秒)"  align="center">
          <template slot-scope="scope">{{scope.row.againTime}}</template>
        </el-table-column>
        <el-table-column label="备注"  align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="addYangTypeFinanceSms(scope.row, 0)">编辑
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
      width="40%"
      :append-to-body="true">
      <el-card class="filter-container" shadow="never">
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="lstesded" size="small" label-width="140px" word-break="keep-all">
            <el-row>
              <el-form-item label="手机号：">
                <el-input v-model="lstesded.phone" class="input-width" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="间隔时间(秒)：">
                <el-input v-model="lstesded.againTime" class="input-width" placeholder="请输入间隔时间"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="是否发送：">
                <el-radio-group v-model="lstesded.status">
                  <el-radio :label="0">不发送</el-radio>
                  <el-radio :label="1">发送</el-radio>
                </el-radio-group>
              </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="toUser()" :disabled="buttonDisabled">确认</el-button>
            </el-form-item>
            </el-row>
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
import {
  getYangTypeFinanceSmsList,
  addYangTypeFinanceSms
} from '@/api/finance/finance';
  import {formatDate} from '@/util/date';
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
        getYangTypeFinanceSmsList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          this.total = response.data.data.total;
        })
      },
      formatType(typeId){
        if(typeId==null||typeId===''){
          return '无';
        }
        for (let i = 0; i < this.typeOptioned1.length; i++) {
          if (this.typeOptioned1[i].typeId == typeId) {
            return this.typeOptioned1[i].typeName
          }
        }
        return "无";
      },
      toUser(){
        this.buttonDisabled = true
        addYangTypeFinanceSms(this.lstesded).then(response=>{
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
      addYangTypeFinanceSms(row, type){
        this.lstesded = row
        this.dialogVisible=true;
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


