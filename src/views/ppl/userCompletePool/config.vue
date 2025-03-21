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
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
         <el-table-column label="场次ID"  align="center">
          <template slot-scope="scope">{{scope.row.typeId}}</template>
        </el-table-column>
        <el-table-column label="团队"  align="center">
          <template slot-scope="scope">{{formatTeam(teamOptioned,scope.row.teamId)}}</template>
        </el-table-column>
        <el-table-column label="最小价格"  align="center">
          <template slot-scope="scope">{{scope.row.startPrice}}</template>
        </el-table-column>
        <el-table-column label="最大价格" align="center">
          <template slot-scope="scope">{{scope.row.endPrice}}</template>
        </el-table-column>
        <el-table-column label="交割比例" align="center">
          <template slot-scope="scope">{{scope.row.completeScale}}</template>
        </el-table-column>
        <el-table-column label="普通单抢购比例" align="center">
          <template slot-scope="scope">{{scope.row.buyScale}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope" v-if="permission.ppl_complete_pool_config_edit">
            <el-button size="mini"
                       type="text"
                       @click="show(scope.row)">编辑
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
          <el-form :inline="true" :model="lstesded" size="small" label-width="140px">
            <el-form-item label="场次id：">
              <el-select clearable v-model="lstesded.typeId" :disabled="true">
                <el-option
                  v-for="type in typeOptioned"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最小价格：">
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="0"
                v-model="lstesded.startPrice"
                clearable
                placeholder="请输入最小价格"
                style="width: 203px;"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="最大价格：">
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="0"
                v-model="lstesded.endPrice"
                clearable
                placeholder="请输入最大价格"
                style="width: 203px;"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="交割比例：">
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="2"
                v-model="lstesded.completeScale"
                clearable
                placeholder="请输入交割比例"
                style="width: 203px;"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="普通单抢购比例：">
              <el-input-number
                :min="0"
                :max="99999999"
                :controls="false"
                :precision="2"
                v-model="lstesded.buyScale"
                clearable
                placeholder="请输入普通单抢购比例"
                style="width: 203px;"
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
import {
  updateCompletePoolConfig,
  getCompletePoolConfigList,
  getGameTypeList,
} from '@/api/ppl/marketing';
import {formatTeam} from "@/util/common";
import {listTeam} from '@/api/common/common';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
import {mapGetters} from "vuex";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    bannerType: null,
    endTime:null,
    id:null,
    teamId: null,
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
        teamOptioned:[],
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
        vchart: null,
        vchart1: null,
        vchart2: null,
        vchart3: null,
        vchart4: null,
        vchart0: null,
        preMemberCount: 0
      }
    },
    mounted() {
      // console.log("fsdfa", formatTeam(this.teamOptioned, 1))
    },
    computed: {
      ...mapGetters(["permission"]),
    },
    created() {
      getGameTypeList({status:1}).then((response) => {
        this.typeOptioned=response.data.data.records
        for (let i = 0; i < response.data.data.records.length; i++) {
          this.typeOptioned1.push({typeName:response.data.data.records[i].typeName,typeId:response.data.data.records[i].typeId})
        }
        this.typeOptioned1.push({typeName:"无",typeId:0})

        this.getList();
      });
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
        getCompletePoolConfigList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.data.records;
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].typeId = this.formatType(this.list[i].typeId)
            this.list[i].allocationTypeId = this.formatType(this.list[i].allocationTypeId)
          }
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
        this.lstesded.typeId = null
        updateCompletePoolConfig(this.lstesded).then(response=>{
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
      show(row){
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


