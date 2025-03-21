<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
          查询搜索
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="场次id：" prop="typeId">
            <el-select v-model="listQuery.typeId" @change="getGameGoodsList(listQuery.typeId)">
              <el-option v-for="item, index in typeOptioned" :key="item.typeId" :label="item.typeName"
                :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.goodsName" class="input-width" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="用户ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="请输入会员id"></el-input>
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

          <el-form-item label="订单号：">
            <el-input v-model="listQuery.orderId" class="input-width" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="预约时VIP：">
            <el-select v-model="listQuery.vipType">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款状态：">
            <el-select v-model="listQuery.isPay">
              <el-option label="未付" value="1"></el-option>
              <el-option label="已付" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间：">
            <el-date-picker class="input-width" v-model="beginTime" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker class="input-width" v-model="endTimes" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择时间">
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
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>

      <template slot-scope="scope" v-if="false">
        <el-button el-button size="mini" class="btn-add" @click="handleAdd(scope.$index, scope.row)">添加商品</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column>  -->
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{ scope.row.preId }}</template>
        </el-table-column>
        <el-table-column label="场次名称" align="center">
          <template slot-scope="scope">{{ scope.row.typeName }}</template>
        </el-table-column>
        <el-table-column label="商品ID" align="center">
          <template slot-scope="scope">{{ scope.row.goodsId }}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{ scope.row.goodsName }}</template>
        </el-table-column>
        <el-table-column label="订单ID" width="" align="center">
          <template slot-scope="scope">{{ scope.row.orderId }}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="" align="center">
          <template slot-scope="scope">{{ scope.row.memberId }}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="预约诚信金" align="center">
          <template slot-scope="scope">{{ scope.row.point }}</template>
        </el-table-column>

        <el-table-column label="抢购状态" align="center">
          <template slot-scope="scope">{{ scope.row.buyStatus == 0 ? '未抢购' : scope.row.buyStatus == 1 ? '抢购成功' :
          '抢购失败' }}</template>
        </el-table-column>

        <el-table-column label="预约时VIP" align="center">
          <template slot-scope="scope">{{ scope.row.vipType == 0 ? '否' : '是' }}</template>
        </el-table-column>
        <el-table-column label="付款状态" align="center">
          <template slot-scope="scope">{{ scope.row.isPay == 0 ? '未付' : '已付' }}</template>
        </el-table-column>
        <el-table-column label="预约处理状态" align="center">
          <template slot-scope="scope">{{ scope.row.status == 0 ? '未处理' : '已处理' }}</template>
        </el-table-column>
        <el-table-column label="团队"  align="center">
          <template slot-scope="scope">{{formatTeam(teamOptioned,scope.row.teamId)}}</template>
        </el-table-column>
        <el-table-column label="预约时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTimes }}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <!-- <el-table-column label="是否上架"  align="center">
          <template slot-scope="scope">
            <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column> -->
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
        <!-- </el-table-column> -->
        <!-- <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
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
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import {fetchList,updateStatus,deleteHomeAdvertise} from '@/api/homeAdvertise';
import { getGamePreList, carouselDelete, free_lockDelete, updateGameGoods, getGameTypeList, getGameGoodsList } from '@/api/ppl/marketing';
import { formatDate } from '@/util/date';
import {formatTeam} from "@/util/common";
import {listTeam} from "@/api/common/common";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  name: null,
  bannerType: null,
  endTime: null,
  id: null
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
      beginTime: '',
      endTimes: '',
      operates: [
        {
          label: "删除",
          value: 0
        }
      ],
      typeOptioned: null,
      goodsNameList: null,
      operateType: null
    }
  },
  created() {
    this.getList();
    getGameTypeList().then((response) => {
      this.typeOptioned = response.data.data.records
    });
    listTeam().then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.teamOptioned.push({teamName:response.data.data[i].teamName,teamId:response.data.data[i].id})
      }
    });
  },
  filters: {
    // formatType(type){
    //   if(type===1){
    //     return 'APP首页轮播';
    //   }else{
    //     return 'PC首页轮播';
    //   }
    // },
    formatStatus(status) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (status === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label;
        }
      }
    },
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  methods: {
    formatTeam,
    getGameGoodsList(typeId) {
      let info = {
        typeId: typeId
      }
      getGameGoodsList(info).then((res) => {
        this.goodsNameList = res.data.list
      })
    },

    handlePublishStatusChange(index, row) {
      //  let params = new URLSearchParams();
      //   params.append('id', row.id);
      //   params.append('autoRobotSwitch', row.autoRobotSwitch);
      //   params.append('autoRobotJackpotStatus', row.autoRobotJackpotStatus);
      let info = {
        goodsId: row.goodsId,
        status: row.status
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
    handleSelectionChange(val) {
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
    handleUpdateStatus(index, row) {
      this.$confirm('是否要修改上线/下线状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, { status: row.status }).then(response => {
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
    handleDelete(index, row) {
      this.$router.push({ path: '/pms/canyurens', query: { id: row.id, } })
    },
    handleBatchOperate() {
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
        console.log(idList, 'id集合')
      }
      if (this.operateType === 0) {
        //删除
        this.carouselDeleteBatch(idList);
      } else {
        this.$message({
          message: '请选择批量操作类型',
          type: 'warning',
          duration: 1000
        });
      }
    },
    getList() {
      this.listLoading = true;
      console.log(this.listQuery, '1111111')
      this.listQuery.beginTime = this.beginTime + ' ' + '00:00:00'
      this.listQuery.endTimes = this.endTimes + ' ' + '00:00:00'
      getGamePreList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.data.records;
        this.total = response.data.data.total;
      })
    },
    free_lockDelete(id) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", id);
        free_lockDelete(params).then(response => {
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      })
    },
    carouselDeleteBatch(idList) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("idList", idList);
        carouselDeleteBatch(params).then(response => {
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
