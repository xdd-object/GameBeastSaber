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
          <el-form-item label="用户ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item label="6阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight6"
              clearable
              placeholder="6阶权重"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="7阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight7"
              clearable
              placeholder="7阶权重"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="8阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight8"
              clearable
              placeholder="8阶权重"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="9阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight9"
              clearable
              placeholder="9阶权重"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="10阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight10"
              clearable
              placeholder="10阶权重"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="11阶权重：">
            <el-input-number
              :min="0"
              :max="9999"
              :controls="false"
              :precision="0"
              v-model="listQuery.weight11"
              clearable
              placeholder="11阶权重"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <template slot-scope="scope">
        <el-button el-button size="mini" class="btn-add" @click="addCompletePool({}, 1)">新增交割用户</el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="用户ID"  align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="用户昵称"  align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="用户头像"  align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.avatar"></template>
        </el-table-column>
        <el-table-column label="6阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight6}}</template>
        </el-table-column>
        <el-table-column label="7阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight7}}</template>
        </el-table-column>
        <el-table-column label="8阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight8}}</template>
        </el-table-column>
        <el-table-column label="9阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight9}}</template>
        </el-table-column>
        <el-table-column label="10阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight10}}</template>
        </el-table-column>
        <el-table-column label="11阶权重"  align="center">
          <template slot-scope="scope">{{scope.row.weight11}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="show(scope.row)">查看上级用户
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="deleteCompletePool(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="addCompletePool(scope.row, 0)">编辑
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
            <el-form-item label="用户ID：">
              <el-input v-model="lstesded.memberId" class="input-width" placeholder="请输入用户ID"></el-input>
            </el-form-item>
            <el-form-item label="6阶权重：">
              <el-input v-model="lstesded.weight6" class="input-width" placeholder="请输入6阶权重"></el-input>
            </el-form-item>
            <el-form-item label="7阶权重：">
              <el-input v-model="lstesded.weight7" class="input-width" placeholder="请输入7阶权重"></el-input>
            </el-form-item>
            <el-form-item label="8阶权重：">
              <el-input v-model="lstesded.weight8" class="input-width" placeholder="请输入8阶权重"></el-input>
            </el-form-item>
            <el-form-item label="9阶权重：">
              <el-input v-model="lstesded.weight9" class="input-width" placeholder="请输入9阶权重"></el-input>
            </el-form-item>
            <el-form-item label="10阶权重：">
              <el-input v-model="lstesded.weight10" class="input-width" placeholder="请输入10阶权重"></el-input>
            </el-form-item>
            <el-form-item label="11阶权重：">
              <el-input v-model="lstesded.weight11" class="input-width" placeholder="请输入11阶权重"></el-input>
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


    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="90%"
      :append-to-body="true">
      <el-card class="filter-container" shadow="never">
        <div style="margin-top: 15px">

          <div class="table-container">
            <el-table ref="homeAdvertiseTable"
                      :data="list1"
                      style="width: 100%;"
                      v-loading="listLoading1" border>
              <el-table-column label="用户ID"  align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
              </el-table-column>
              <el-table-column label="用户名称"  align="center">
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="用户等级" align="center">
                <template slot-scope="scope">{{scope.row.level}}</template>
              </el-table-column>
            </el-table>
          </div>
<!--          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              layout="total, sizes,prev, pager, next,jumper"
              :page-size="listQuery1.pageSize"
              :page-sizes="[5,10,15]"
              :current-page.sync="listQuery1.pageNum"
              :total="total1">
            </el-pagination>
          </div>-->
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
    </span>
    </el-dialog>

    <el-descriptions class="margin-top" :title="`今日预约总人数:`+this.preMemberCount" column="6" border>
    </el-descriptions>

    <br>

    <el-row :gutter="20">
      <el-col :span="12"><div id="about0"></div></el-col>
      <el-col :span="12"><div id="about"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12"><div id="about1"></div></el-col>
      <el-col :span="12"><div id="about2"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12"><div id="about3"></div></el-col>
      <el-col :span="12"><div id="about4"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12"><div id="about5"></div></el-col>
    </el-row>

  </div>

</template>
<script>
import {
  deleteCompletePool,
  addCompletePool,
  getCompletePoolList,
  getGameTypeList,
  getAmountTypeListProperty,
  getPreMemberCount, getUserByPoolList,
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
        listQuery1: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        list1: null,
        total1: null,
        listLoading: false,
        listLoading1: false,
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
        dialogVisible1:false,
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
        vchart5: null,
        vchart0: null,
        preMemberCount: 0
      }
    },
    mounted() {
      this.vchart = echarts.init(document.getElementById("about"));
      this.vchart1 = echarts.init(document.getElementById("about1"));
      this.vchart2 = echarts.init(document.getElementById("about2"));
      this.vchart3 = echarts.init(document.getElementById("about3"));
      this.vchart4 = echarts.init(document.getElementById("about4"));
      this.vchart5 = echarts.init(document.getElementById("about5"));
      this.vchart0 = echarts.init(document.getElementById("about0"));
    },
    created() {
      this.getList();
      this.onload();
      this.getPreMemberCount();
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
      onload() {
        getAmountTypeListProperty({goodsId:6}).then(res => {
          this.loading = false;
          this.data1(res.data.data);
        });

        getAmountTypeListProperty({goodsId:7}).then(res => {
          this.loading = false;
          this.data2(res.data.data);
        });

        getAmountTypeListProperty({goodsId:8}).then(res => {
          this.loading = false;
          this.data3(res.data.data);
        });

        getAmountTypeListProperty({goodsId:9}).then(res => {
          this.loading = false;
          this.data4(res.data.data);
        });

        getAmountTypeListProperty({goodsId:10}).then(res => {
          this.loading = false;
          this.data5(res.data.data);
        });

        getAmountTypeListProperty({goodsId:11}).then(res => {
          this.loading = false;
          this.data6(res.data.data);
        });

        getAmountTypeListProperty().then(res => {
          this.loading = false;
          this.data0(res.data.data);
        });
      },
      data1(params) {
        this.vchart.setOption({
          title: {
            text: '六阶长城订单类型比例图'
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
            text: '七阶长城订单类型比例图'
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
            text: '八阶长城订单类型比例图'
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
            text: '九阶长城订单类型比例图'
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
            text: '十阶长城订单类型比例图'
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
            text: '十一阶长城订单类型比例图'
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
      data0(params) {
        this.vchart0.setOption({
          title: {
            text: '所有长城订单类型比例图'
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
          arr.push({name:priceTypeMap[params[i].priceType], value: params[i].count})
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
      getPreMemberCount() {
        getPreMemberCount().then(response => {
          this.preMemberCount = response.data.data;
        })
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
        getCompletePoolList(this.listQuery).then(response => {
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
      deleteCompletePool(index,row){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let info = {
            id:row.id
          }
          deleteCompletePool(info).then(response=>{
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
        addCompletePool(this.lstesded).then(response=>{
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
      addCompletePool(row, type){
        this.lstesded = row
        this.dialogVisible=true;
      },
      show(row){
        this.dialogVisible1=true;
        this.listLoading1 = true;
        this.listQuery1.memberId = row.memberId
        this.getList1();
      },
      getList1() {
        getUserByPoolList(this.listQuery1).then(response => {
          this.listLoading1 = false;
          this.list1 = response.data.data;
        })
      },
      handleSizeChange1(val) {
        this.listQuery1.pageNum = 1;
        this.listQuery1.pageSize = val;
        this.getList1();
      },
      handleCurrentChange1(val) {
        this.listQuery1.pageNum = val;
        this.getList1();
      }
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


