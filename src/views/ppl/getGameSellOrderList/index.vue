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
          <el-form-item label="转售人ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="请输入转售人ID"></el-input>
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

      <template slot-scope="scope" v-if="permission.ppl_order_add">
        <el-button el-button size="mini" class="btn-add" @click="handleAdd(scope.$index, scope.row)">添加转售</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column>  -->
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
           <!--  <p>开始时间：{{scope.row.buyNumber.startBuyingTime | formatTime}}</p>
            <p>到期时间：{{scope.row.buyNumber.endBuyTime | formatTime}}</p> -->
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
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini"
                       type="text"
                       @click="handleUpdate_zhuanshu(scope.$index, scope.row)">专属场次修改
            </el-button> -->
            <!-- <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">分解转售订单
            </el-button> -->
            <el-button v-if="permission.ppl_order_allocation" size="mini"
                       type="text"
                       @click="handleUpdate_toUser(scope.$index, scope.row)">分配给会员
            </el-button>
            <el-button v-if="permission.ppl_order_destroy" size="mini"
                       type="text"
                       @click="handleUpdate_recovery(scope.$index, scope.row)">销毁
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
        title="分解转售订单"
        :visible.sync="dialogVisible_fenjie"
        width="40%">
      <el-card class="filter-container" shadow="never">
          <div style="margin-top: 15px">
            <el-form :inline="true" :model="lstesded" size="small" label-width="140px">
            <el-form-item label="数量：">
                <el-input  style="width: 203px" v-model="lstesded.amount" placeholder=""></el-input>
            </el-form-item>
              <el-form-item label="">
                  <el-button type="primary" @click="rechargeAdd()">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible_fenjie = false">取 消</el-button>
    </span>
      </el-dialog>

      <el-dialog
        title="订单分配给指定用户"
        :visible.sync="dialogVisible"
        width="40%"
        :append-to-body="true">
      <el-card class="filter-container" shadow="never">
          <div style="margin-top: 15px">
            <el-form :inline="true" :model="lstesded" size="small" label-width="140px">
            <el-form-item label="用户ID">
                <el-input  style="width: 203px" v-model="lstesded.forMemberId" placeholder=""></el-input>
            </el-form-item>
              <el-form-item label="">
                  <el-button type="primary" @click="toUser()">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
      </el-dialog>


    <br>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about"></div></el-col>
      <el-col :span="9"><div id="about0">
        <el-table
          :data="echartsData"
          height="1000px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about1"></div></el-col>
      <el-col :span="9"><div id="about1">
        <el-table
          :data="echartsData1"
          height="600px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about2"></div></el-col>
      <el-col :span="9"><div id="about2">
        <el-table
          :data="echartsData2"
          height="600px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about3"></div></el-col>
      <el-col :span="9"><div id="about3">
        <el-table
          :data="echartsData3"
          height="600px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about4"></div></el-col>
      <el-col :span="9"><div id="about4">
        <el-table
          :data="echartsData4"
          height="600px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15"><div id="about5"></div></el-col>
      <el-col :span="9"><div id="about5">
        <el-table
          :data="echartsData5"
          height="600px"
          style="width: 240px;">
          <el-table-column
            prop="amount"
            label="订单价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数量"
            width="120">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
  </div>

</template>
<script>
  import {recoveryOrder,getGameSellOrderList,getAmountListProperty1,free_lockDelete,updateGameGoods,getGameTypeList,decomposeGameSellOrder,updateGameSellOrder,setGameOrderToUser} from '@/api/ppl/marketing';
  import {formatDate} from '@/util/date';
  import * as echarts from "echarts";
  import {listTeam} from "@/api/common/common";
  import {formatTeam} from "@/util/common";
  import {mapGetters} from "vuex";
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
          lstesded:{
          rentId:'',
        },
        vchart: null,
        vchart1: null,
        vchart2: null,
        vchart3: null,
        vchart4: null,
        vchart5: null,
        echartsData: [],
        echartsData1: [],
        echartsData2: [],
        echartsData3: [],
        echartsData4: [],
        echartsData5: [],
      }
    },
    mounted() {
      this.vchart = echarts.init(document.getElementById("about"));
      this.vchart1 = echarts.init(document.getElementById("about1"));
      this.vchart2 = echarts.init(document.getElementById("about2"));
      this.vchart3 = echarts.init(document.getElementById("about3"));
      this.vchart4 = echarts.init(document.getElementById("about4"));
      this.vchart5 = echarts.init(document.getElementById("about5"));
    },
    computed: {
      ...mapGetters(["permission"]),
    },
    created() {
      this.getList();
      //this.onload();
      getGameTypeList().then((response) => {
          this.typeOptioned=response.data.data.records
      });
      listTeam().then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.teamOptioned.push({teamName:response.data.data[i].teamName,teamId:response.data.data[i].id})
        }
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
      formatTeam,
      onload() {
        getAmountListProperty1({goodsId:6}).then(res => {
          this.loading = false;
          this.sumDataCount(this.echartsData, res.data.data);
          this.data1(res.data.data);
        });

        getAmountListProperty1({goodsId:7}).then(res => {
          this.loading = false;
          this.sumDataCount(this.echartsData1, res.data.data);
          this.data2(res.data.data);
        });

        getAmountListProperty1({goodsId:8}).then(res => {
          this.sumDataCount(this.echartsData2, res.data.data);
          this.loading = false;
          this.data3(res.data.data);
        });

        getAmountListProperty1({goodsId:9}).then(res => {
          this.sumDataCount(this.echartsData3, res.data.data);
          this.loading = false;
          this.data4(res.data.data);
        });

        getAmountListProperty1({goodsId:10}).then(res => {
          this.sumDataCount(this.echartsData4, res.data.data);
          this.loading = false;
          this.data5(res.data.data);
        });
        getAmountListProperty1({goodsId:11}).then(res => {
          this.sumDataCount(this.echartsData5, res.data.data);
          this.loading = false;
          this.data6(res.data.data);
        });
      },
      data1(params) {
        this.vchart.setOption({
          title: {
            text: '六阶长城价格比例图'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}[{c}]({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },series: [
            {
              name: '总计',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '20%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
              ]
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              data: this.handleEchartsData(params)
            }
          ]
        })
      },
      data2(params) {
        this.vchart1.setOption({
          title: {
            text: '七阶长城价格比例图'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}[{c}]({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },series: [
            {
              name: '总计',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '20%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
              ]
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              data: this.handleEchartsData(params)
            }
          ]
        })
      },
      data3(params) {
        this.vchart2.setOption({
          title: {
            text: '八阶长城价格比例图'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}[{c}]({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },series: [
            {
              name: '总计',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '20%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
              ]
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              data: this.handleEchartsData(params)
            }
          ]
        })
      },
      data4(params) {
        this.vchart3.setOption({
          title: {
            text: '九阶长城价格比例图'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}[{c}]({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },series: [
            {
              name: '总计',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '20%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
              ]
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              data: this.handleEchartsData(params)
            }
          ]
        })
      },
    data5(params) {
      this.vchart4.setOption({
        title: {
          text: '十阶长城价格比例图'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}[{c}]({d}%)"
        },
        legend: {
          top: '5%',
          left: 'center'
        },series: [
          {
            name: '总计',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'center',
              normal: {
                show: true,
                formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false,
              normal: {
                show: true,
                formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            data: this.handleEchartsData(params)
          }
        ]
      })
    },
      data6(params) {
        this.vchart5.setOption({
          title: {
            text: '十一阶长城价格比例图'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}[{c}]({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },series: [
            {
              name: '总计',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '20%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.sumCount(params), name: '总计(' + this.sumCount(params) + ")" }
              ]
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'center',
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                normal: {
                  show: true,
                  formatter: "{b}[{c}]({d}%)"//自定义显示格式(b:name, c:value, d:百分比)
                }
              },
              data: this.handleEchartsData(params)
            }
          ]
        })
      },
      handleEchartsData(params) {
        var arr = [];
        for (let i = 0; i < params.length; i++) {
          arr.push({name:params[i].amount, value: params[i].count})
        }
        return arr;
      },
      sumCount(params) {
        var res = 0;
        for (let i = 0; i < params.length; i++) {
          res = res + Number(params[i].count)
        }
        return res;
      },
      sumDataCount(data, params) {
        for (let i = 0; i < params.length; i++) {
          data.push({amount:params[i].amount,count:params[i].count});
        }
        data.push({amount:"总计",count:this.sumCount(params)});
      },
      rechargeAdd(){
          decomposeGameSellOrder(this.lstesded).then(response=>{
            this.$message({
                    message: '分解转售成功！',
                    type: 'success',
                    duration: 4000
                  });
                   this.dialogVisible_fenjie=false;
          })
      },
      toUser(){
          setGameOrderToUser(this.lstesded).then(response=>{
            this.getList();
            this.$message({
                    message: '分配成功！',
                    type: 'success',
                    duration: 4000
                  });
                   this.dialogVisible=false;
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
        this.$router.push({path: '/ppl/getGameSellOrderListAdd', query: {row: row,}})
      },
      handleUpdate_zhuanshu(index,row){
        this.$confirm(`是否修改为：${row.rentType == 2? '普通场' : 'VIP场'}`,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let info = {
            orderId:row.orderId,
            rentId:row.rentId,
            rentType:row.rentType == 2 ? 1 : 2
          }
          updateGameSellOrder(info).then(res=>{
            this.getList();
            this.$message({
              type:'success',
              message:'修改成功！'
            })
          })
        })
      },
      handleUpdate(index,row){
        // this.$router.push({path: '/pms/getGameSellOrderListUpdate', query: {row: row}})
          this.dialogVisible_fenjie=true;
          this.lstesded.orderId=row.orderId
          this.lstesded.rentId=row.rentId
      },
     handleUpdate_toUser(index,row){
          this.dialogVisible=true;
          this.lstesded.rentId=row.rentId
      },
      handleUpdate_recovery(index,row){
      this.$confirm('确定要销毁吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let info = {
            orderId:row.orderId
          }
          recoveryOrder(info).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '销毁成功!'
            });
          });
        })
      },
      getList() {
        this.listLoading = true;
        getGameSellOrderList(this.listQuery).then(response => {
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
  #about {
    width: 800px;
    height: 1100px;
  }

  #about1,#about2,#about3,#about4,#about5 {
    width: 800px;
    height: 700px;
  }
</style>


