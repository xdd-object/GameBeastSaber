<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchChange"
      @current-change="currentChange" @on-load="onLoad" @refresh-change="onLoad">

      <template #menu="{ size, row, index }">
        <el-button @click="tableUser(row, index)" text type="primary" :size="size">对局详情</el-button>
      </template>
    </avue-crud>

    <el-drawer title="" size="70%" :visible.sync="drawer" :direction="direction" append-to-body
      :before-close="handleClose">
      <avue-crud :data="record.data" :page.sync="record.page" :option="record.option"
        @search-change="searchChangeRecord" @refresh-change="onLoadRecord" @current-change="currentChangeRecord">
      </avue-crud>
    </el-drawer>
  </basic-container>
</template>

<script>

import { gamePage, gameRecord } from "@/api/dice/dice";

const opType = {
  1: '摇骰子',
  2: '说话',
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
            row: true,
            addDisplay: false,
            editDisplay: false,
            dataType: 'number',
            editDisabled: true,
          },
          {
            label: "牌桌ID",
            prop: "tableId",
            dataType: "number",
            search: true,
          },
          {
            label: "获胜用户",
            prop: "winner",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "轮数",
            prop: "round",
          },
          {
            label: "是否劈",
            prop: "isChop",
            dataType: 'number',
            row: true
          },
          {
            label: "反劈次数",
            prop: "counterChopNum",
            dataType: 'number',
            row: true
          },
          {
            label: "骰子实体",
            prop: "diceEntity",
            row: true,
            width: 500,
          },
          {
            label: "骰子组合",
            prop: "diceCombo",
            width: 200,
            row: true
          },
          {
            label: "最近叫骰",
            prop: "callCombo",
            width: 300,
            row: true
          },
          // {
          //   label: "操作顺序",
          //   prop: "turnOrder",
          //   width: 130,
          //   row: true
          // },
          // {
          //   label: "当前操作索引",
          //   prop: "turnIndex",
          //   row: true
          // },

          {
            label: "创建时间",
            prop: "createdAt",
            width: 150,
            row: true,
            addDisplay: false,
            editDisplay: false,
          },
        ]
      },
      drawer: false,
      record: {
        query: {
          pageNum: 1,
          pageSize: 10,
          gameId: null,
        },
        row: {
          gameId: null,
        },
        data: [

        ],
        option: {
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
              label: "操作类型",
              prop: "opType",
              span: 8,
              dataType: 'number',
              row: true,
              formatter: (_row, value) => {
                return opType[value] || '未知'; //
              },
            },
            {
              label: "操作实体",
              prop: "entity",
              span: 8,
              row: true
            },
            {
              label: "操作时间",
              prop: "createdAt",
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
      gamePage(this.query).then(res => {
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

    tableUser(row) {
      this.record.query.gameId = row.id;
      this.record.row = row;
      this.onLoadRecord(this.record.query);
      this.drawer = true;
    },
    onLoadRecord() {
      this.record.loading = true;
      gameRecord(this.record.query).then(res => {
        console.log(res)
        const data = res.data.data;
        this.record.data = data.list;
        this.record.loading = false;
      });
    },
    searchChangeRecord(params, done) {
      this.record.query = params;
      this.record.query.pageNum = 1;
      this.record.query.pageSize = 10;
      this.record.query.gameId = this.record.row.id;
      this.onLoadRecord(this.record.query);
      done();
    },
    currentChangeRecord(currentPage, done) {
      this.record.query.pageNum = currentPage;
      this.onLoadRecord(this.record.query);
      done();
    },
  },
};
</script>

<style scoped="scoped" lang="scss"></style>
