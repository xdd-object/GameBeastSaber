<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchChange"
      @current-change="currentChange" @on-load="onLoad" @refresh-change="onLoad">

      <template #menu="{ size, row, index }">
        <el-button @click="getTableInfo(row, index)" text type="primary" :size="size">牌桌详情</el-button>
      </template>
    </avue-crud>

    <el-drawer title="" size="70%" :visible.sync="drawer" :direction="direction" append-to-body
      :before-close="handleClose">
      <avue-crud :data="info.tableUserData" :option="info.tableUserOpt">
      </avue-crud>
      <avue-crud :data="info.gamesData" :option="info.gamesOpt" @expand-change="expandChanges">
        <template #expand="{ row }">
          <el-table :data="row.record" style="width: 80%">
            <el-table-column prop="userId" label="操作者">
            </el-table-column>
            <el-table-column prop="remark" label="操作">
            </el-table-column>
            <el-table-column prop="createdAt" label="操作时间">
            </el-table-column>
          </el-table>
        </template>
      </avue-crud>
    </el-drawer>
  </basic-container>
</template>

<script>

import { tablePage, tableInfo } from "@/api/dice/dice";
const tableStatusMap = {
  0: "未开始",
  1: '进行中',
  2: '结束',
}

const tableStageMap = {
  0: "等待阶段",
  1: "摇骰子阶段",
  2: "说话阶段",
  3: "小结算阶段",
  4: "大结算阶段",
  5: "结束"
}

const opType = {
  1: "摇骰子",
  2: "叫骰",
}

const robotType = {
  0: '真人',
  1: '必胜',
  2: '随机',
  3: '概率'
}

export default {
  name: "table",
  data() {
    return {
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      data: [
      ],
      option: {
        menu: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
            dataType: 'number',
            editDisabled: true,
          },
          {
            label: "房间名称",
            prop: "name",
            span: 8,
          },
          {
            label: "用户ID",
            prop: "userId",
            span: 8,
            hide: true,
            search: true,
          },
          {
            label: "人数",
            prop: "peopleNum",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "入场价格",
            prop: "admissionPrice",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "手续费比例(百分比)",
            prop: "commission",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "状态",
            prop: "status",
            span: 8,
            dataType: 'number',
            row: true,
            formatter: (_row, value) => {
              return tableStatusMap[value] || '未知'; //
            },
          },
          {
            label: "阶段",
            prop: "stage",
            span: 8,
            dataType: 'number',
            row: true,
            formatter: (_row, value) => {
              return tableStageMap[value] || '未知'; //
            },
          },
          {
            label: "获胜用户",
            prop: "winner",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: "结束时间",
            prop: "endedAt",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
          },
        ]
      },
      drawer: false,
      info: {
        query: {
          id: null,
        },
        tableUserData: [

        ],
        tableUserOpt: {
          refreshBtn: false,
          columnBtn: false,
          menu: false,
          delBtn: false,
          editBtn: false,
          addBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          column: [
            {
              label: "id",
              prop: "id",
              span: 8,
              row: true,
              addDisplay: false,
              editDisplay: false,
              dataType: 'number',
            },
            {
              label: "用户ID",
              prop: "userId",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "是否机器人",
              prop: "robot",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "机器人类型",
              prop: "robotType",
              span: 8,
              dataType: 'number',
              row: true,
              formatter: (_row, value) => {
                return robotType[value] || '未知'; //
              },
            },
            {
              label: "加入时间",
              prop: "joinTime",
              span: 8,
              row: true
            },
            {
              label: "是否胜利",
              prop: "isWin",
              span: 8,
              dataType: 'number',
              row: true,
            },
            {
              label: "消耗",
              prop: "consume",
              span: 8,
              dataType: 'number',
              row: true,
            },
            {
              label: "获得",
              prop: "obtain",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "手续费",
              prop: "fee",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "醉酒值",
              prop: "drunk",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "经验",
              prop: "drunk",
              span: 8,
              dataType: 'number',
              row: true
            },
          ]
        },
        gamesData: [],
        gamesOpt: {
          expand: true,
          refreshBtn: false,
          columnBtn: false,
          menu: false,
          delBtn: false,
          editBtn: false,
          addBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          column: [
            {
              label: "id",
              prop: "id",
              span: 8,
              row: true,
              addDisplay: false,
              editDisplay: false,
              dataType: 'number',
            },
            {
              label: "局数",
              prop: "round",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "胜利者",
              prop: "winner",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "开始时间",
              prop: "createdAt",
              span: 8,
              row: true
            },
            {
              label: "结束时间",
              prop: "endedAt",
              span: 8,
              row: true,
            },
          ]
        },
        gamesRecordOpt: {
          refreshBtn: false,
          columnBtn: false,
          menu: false,
          delBtn: false,
          editBtn: false,
          addBtn: false,
          menuWidth: 150,
          align: 'center',
          menuAlign: 'center',
          column: [
            {
              label: "记录id",
              prop: "id",
              span: 8,
              row: true,
              dataType: 'number',
            },
            {
              label: "操作用户",
              prop: "userId",
              span: 8,
              dataType: 'number',
              row: true
            },
            {
              label: "操作类型",
              prop: "opType",
              span: 8,
              dataType: 'number',
              row: true,
              formatter: (_row, value) => {
                return opType[value] || '未知'; //
              }
            },
            {
              label: "操作",
              prop: "remark",
              span: 8,
              row: true
            },
            {
              label: "操作时间",
              prop: "createdAt",
              span: 8,
              row: true,
            },
          ]
        }
      }
    };
  },
  computed: {},
  created() {
    this.onLoad()
  },
  methods: {
    onLoad() {
      this.loading = true;
      tablePage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    searchChange(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    currentChange(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done();
    },

    getTableInfo(row) {
      this.info.query.id = row.id;
      this.onLoadRecord();
      this.drawer = true;
    },
    onLoadRecord() {
      this.info.loading = true;
      tableInfo(this.info.query).then(res => {
        const data = res.data.data;
        this.info.tableUserData = data.tableUser;
        this.info.gamesData = data.games
        this.info.loading = false;
      });
    },
    expandChanges(row, expendList) {
      console.log(row)
      if (expendList.length) {
        this.option1.expandRowKeys = []
        if (row) {
          this.option1.expandRowKeys.push(row.id)
        }
      } else {
        this.option1.expandRowKeys = []
      }
      this.$message.success('展开回调')
    }
  },
};
</script>

<style scoped="scoped" lang="scss"></style>
