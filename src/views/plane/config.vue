<template>
  <div>
     <avue-crud :option="option" :data="data" @on-load="onLoad" @row-update="dialogVisible=true" @refresh-change="onLoad" />
    <el-table :data="data" style="width: 100%" row-key="id" default-expand-all v-loading="loading">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="minDistance" label="最小飞行距离">
      </el-table-column>
      <el-table-column prop="maxDistance" label="最大飞行距离">
      </el-table-column>
      <el-table-column prop="autoReward" label="自动领奖">
        <template slot-scope="{row}">
          <span>{{ row.autoReward == 1 ? "开启" : "关闭" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="autoJoin" label="自动参与">
        <template slot-scope="{row}">
          <span>{{ row.autoJoin == 1 ? "开启" : "关闭" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="资金池">
      </el-table-column>
      <el-table-column prop="robotNum" label="机器人数量">
      </el-table-column>
      <el-table-column prop="robotMinNum" label="机器人最小下注数量">
      </el-table-column>
      <el-table-column prop="robotMaxNum" label="机器人最大下注数量">
      </el-table-column>
      <el-table-column prop="interval" label="下一场间隔时间">
      </el-table-column>
      <el-table-column prop="joinInterval" label="投注时间">
      </el-table-column>
      <el-table-column prop="open" label="开启状态">
        <template slot-scope="{row}">
          <span>{{ row.open == 1 ? "开启" : "关闭" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="open" label="操作" width="300px">
        <template slot-scope="{row}">
          <el-button type="primary" @click="uppdateConfig(row)">修改配置</el-button>
          <el-button type="primary" @click="uppdateStrategy(row)">修改策略</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改配置" :visible.sync="dialogVisible" width="60%" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" label-position="left" label-width="150px">
        <!-- <el-form-item label="最小飞行距离">
          <el-input v-model="form.minDistance" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="最大飞行距离">
          <el-input v-model="form.maxDistance" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="是否开启自动领奖">
          <el-select v-model="form.autoReward" placeholder="请选择是否开启自动领奖" style="width: 300px;">
            <el-option v-for="item in statusMap" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启自动参与">
          <el-select v-model="form.autoJoin" placeholder="请选择是否开启自动参与" style="width: 300px;">
            <el-option v-for="item in statusMap" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资金池">
          <el-input v-model="form.totalAmount" type="number" style="width: 300px;"></el-input>
        </el-form-item> -->
        <el-form-item label="机器人数量">
          <el-input v-model="form.robotNum" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="机器人最小投注数量">
          <el-input v-model="form.robotMinNum" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="机器人最大投注数量">
          <el-input v-model="form.robotMaxNum" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="下一场间隔时间">
          <el-input v-model="form.interval" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="投注时间">
          <el-input v-model="form.joinInterval" type="number" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="开启状态">
          <el-select v-model="form.open" placeholder="请选择开启状态" style="width: 300px;">
            <el-option v-for="item in statusMap2" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rowUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改策略" :visible.sync="dialogVisible2" width="70%" :close-on-click-modal="false" append-to-body>
      <div style="margin-bottom: 20px;">
        <span>米数策略</span>
        <el-select v-model="rule" placeholder="请选择规则" style="width: 200px;margin-left: 30px;">
          <el-option v-for="item in statusMap" :label="item.name" :value="item.name" :key="item.name"></el-option>
        </el-select>
      </div>
      <el-table :data="strategyData" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column prop="date" label="米数下限（≥）">
          <template slot-scope="{row}">
            <el-input v-model="row.minDistance" :disabled="row.disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="米数上限（<）">
          <template slot-scope="{row}">
            <el-input v-model="row.maxDistance" :disabled="row.disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="概率（1-100）">
          <template slot-scope="{row}">
            <el-input type="number" v-model="row.rate" :disabled="row.disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" type="index" width="200px">
          <template slot-scope="scoped">
            <span style="color: red;" @click="delProbabilityRow(scoped)">删除</span>
            <span style="color: #409EFF;margin-left: 20px;" @click="duppdateOrUppdateProbabilityRow(scoped.row)">{{
      scoped.row.disabled ? '修改' : '保存' }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;align-items: center;justify-content: space-between;">
        <p style="color:  #409EFF;font-weight: 600;" @click="addStrategy()">添加行</p>
      </div>
      <div style="color: red;" v-if="probabilitySum != 100">
        注意：概率之和必须为100
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="getStrategyUppdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getList, updateConfig, reqStrategyList, reqStrategyUppdate } from "@/api/plane/index";
import { Message } from 'element-ui';

export default {
  name: "wel",
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      detailMobileHtml: '',

      page: {
        total: 10
      },
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      data: [
      ],
      statusMap: [
        {
          id: 1,
          name: "随机"
        },

      ],
      statusMap2: [
        {
          id: 1,
          name: "开启"
        },
        {
          id: 2,
          name: "关闭"
        },
      ],
      form: {
        minDistance: '',
        maxDistance: '',
        autoReward: '',
        autoJoin: '',
        totalAmount: '',
        interval: '',
        joinInterval: '',
        open: '',
        robotNum: '',
        robotMaxNum:'',
        robotMinNum:''
      },
      rule: '',
      strategyData: [

      ],
      idIndex: 0,
      probabilitySum: 0,

    };
  },
  mounted() {
    this.onLoad()
  },

  methods: {
    async getStrategyUppdate() {
      if (this.probabilitySum != 100) {
        Message({
          message: "概率之和必须为100",
          type: 'error'
        });
        return
      }
      let result2 = this.strategyData.find(item => item.disabled == false)
      if (result2) {
        Message({
          message: "还有正在修改的行",
          type: 'error'
        });
        return
      }
      const result = await reqStrategyUppdate(this.strategyData)
      if (result.data.code == 200) {
        this.getStrategyList()
        this.dialogVisible2 = false
      }
    },
    // // 添加策略
    // async getStrategyRuleAdd(row) {
    //   const sendData = {
    //     maxDistance: row.maxDistance,
    //     minDistance: row.minDistance,
    //     rate: row.rate,
    //     rule: this.rule,
    //   }
    //   const result = await reqStrategyRuleAdd(sendData)
    //   if (result.data.code == 200) {
    //    this.getStrategyList()
    //   }
    // },
    // 策略列表
    async getStrategyList() {
      const result = await reqStrategyList(this.query)
      if (result.data.code == 200) {
        this.strategyData = result.data.data.records.map(item => {
          item.disabled = true
          return item
        })
      }
      console.log(result.data);
    },
    uppdateStrategy() {
      this.getStrategyList()
      this.dialogVisible2 = true
    },
    // 点击修改配置
    uppdateConfig(row) {
      this.form = { ...row, strategyData: [] }
      this.dialogVisible = true
    },
    // 添加米数策略行
    addStrategy() {
      let result = this.strategyData.find(item => item.disabled == false)
      if (result) {
        Message({
          message: "还有正在修改的行",
          type: 'error'
        });
        return
      }
      this.idIndex++
      this.strategyData.push({
        maxDistance: '',
        minDistance: '',
        rate: '',
        rule: this.rule,
        disabled: false
      })
    },
    // 删除米数策略行
    delProbabilityRow(scoped) {
      this.strategyData.splice(scoped.$index, 1)
    },
    // 修改或保存米数策略行
    duppdateOrUppdateProbabilityRow(row) {
      if (row.disabled) {
        let result = this.strategyData.find(item => item.disabled == false)
        if (result) {
          Message({
            message: "还有正在修改的行",
            type: 'error'
          });
          return
        }
        this.strategyData = this.strategyData.map(item => {
          if (item.id == row.id) {
            item.disabled = false
            return item
          }
          return item.id == row.id ? item.disabled = true : item
        })
      } else {
        const reg = /^(\-)?\d+(\.\d{1,2})?$/
        if (!row.minDistance || row.minDistance * 1 <= 0 || !reg.test(row.minDistance)) {
          Message({
            message: "米数下限必须填写且必须大于0且最多为两位小数",
            type: 'error'
          });
          return
        }
        if (!row.maxDistance || row.maxDistance <= 0 || !reg.test(row.minDistance)) {
          Message({
            message: "米数上限必须填写且必须大于0且最多为两位小数",
            type: 'error'
          });
          return
        }
        if (!row.rate || row.rate * 1 <= 0) {
          Message({
            message: "概率必须填写且必须大于0",
            type: 'error'
          });
          return
        }
        this.strategyData = this.strategyData.map(item => {

          if (item.id == row.id) {
            item.disabled = true

            return item
          }
          return item
        })
      }

    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList().then(res => {
        const data = res.data.data;
        this.data = [data];
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate() {
      updateConfig({ ...this.form, rule: null }).then(() => {
        this.onLoad(this.page);
        this.dialogVisible = false
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      }, error => {
        window.console.log(error);
      });
    },
  },
  watch: {
    "strategyData": {
      handler: function (newUser, oldUser) {
        if (newUser.length == 0) return
        this.probabilitySum = newUser.reduce((prev, cur) => {
          return prev += (Math.floor(cur.rate * 100) / 100)
        }, 0)
        console.log(this.probabilitySum, "this.probabilitySum");

      },
      deep: true // 设置 deep 选项为 true，实现深度监听
    }
  }
};
</script>

<style scoped="scoped" lang="scss"></style>
