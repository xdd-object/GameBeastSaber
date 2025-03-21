<template>
  <basic-container>
    <el-drawer
      title="用户参与明细"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      append-to-body
    >
      <avue-crud :data="room.data"
                 :page.sync="room.page"
                 :option="room.option"
                 @search-change="searchChangeRecord"
                 @refresh-change="onLoadRecord"
                 @current-change="currentChangeRecord"
      >
      </avue-crud>
    </el-drawer>

    <el-drawer
      title="用户移动炸弹投入明细"
      size="50%"
      :visible.sync="move_log.drawer"
      :direction="move_log.direction"
      append-to-body
    >
      <avue-crud :data="move_log.data"
                 :page.sync="move_log.page"
                 :option="move_log.option"
                 @search-change="searchChangeMoveLogRecord"
                 @refresh-change="onLoadMoveLogRecord"
                 @current-change="currentChangeMoveLogRecord"
      >
      </avue-crud>
    </el-drawer>

    <avue-crud :option="option"
               :page.sync="page"
               :data="data"
               @on-load="onLoad"
               @search-change="searchChange"
               @current-change="currentChange"
               @refresh-change="onLoad">

      <template #menu="{size, row,index}">
        <el-button @click="tip(row,index)"
                   text
                   type="primary"
                   size="mini" round>参与列表
        </el-button>
        <el-button @click="openDialog(row,index)"
                   text
                   type="success"
                   size="mini" round>更改首次炸弹所在席位
        </el-button>
        <el-button @click="moveLog(row,index)"
                   text
                   type="warning"
                   size="mini" round>移动炸弹明细
        </el-button>
      </template>

    </avue-crud>

    <el-dialog :visible.sync="dialog.dialogVisible" :modal="false" title="编辑炸弹首次所在席位" width="20%">
      <el-form :model="dialog.editForm" ref="editForm" label-width="100px">
        <el-form-item label="所在席位[1-6]">
          <el-input v-model="dialog.editForm.nowBoomSeat" type="number" clearable
                    placeholder="请输入炸弹所在席位"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setNowBombSeat(dialog.editForm.id,dialog.editForm.nowBoomSeat)">确定
        </el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>

import {pageRoom, pageRecord, setNowBombSeat, pageMoveLogRecord} from "@/api/bomb/bomb";
import {typeMap, robotMap} from "@/const/bomb/bomb"
import {number} from "echarts";

export default {
  name: "wel",
  watch: {
    direction(value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      dialog: {
        dialogVisible: false,
        editForm: {
          id: 0,
          nowBoomSeat: 0,
        },
        row: {},
        index: -1,
      },
      room: {
        query: {
          pageNum: 1,
          pageSize: 10,
          roomId: null,
          memberId: null,
          seat: null,
          robot: null,
        },
        row: {
          roomId: null,
        },
        page: {
          total: 0
        },
        data: [],
        option: {
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          menu: false,
          addBtn: false,
          column: [
            {
              label: "用户id",
              prop: "memberId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "用户名",
              prop: "name",
              span: 8,
              row: true
            }, {
              label: "选择的席位",
              prop: "seat",
              span: 8,
              row: true,
              search: true,
            }, {
              label: "投入金额",
              prop: "outAmount",
              span: 8,
              row: true
            }, {
              label: "获得金额",
              prop: "winAmount",
              span: 8,
              row: true
            },
            {
              label: "机器人",
              prop: "robot",
              search: true,
              span: 8,
              row: true,
              type: 'select',
              formatter: (_row, value) => {
                return robotMap[value];
              },
              dicData: [
                {
                  label: '否',
                  value: 0,
                },
                {
                  label: '是',
                  value: 1,
                },
              ]
            },
          ]
        },
      },
      move_log: {
        drawer: false,
        query: {
          pageNum: 1,
          pageSize: 10,
          roomId: null,
          memberId: null,
          seat: null,
          moveNum: null,
          isInSeat: null,
        },
        row: {
          roomId: null,
        },
        page: {
          total: 0
        },
        data: [],
        option: {
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          menu: false,
          addBtn: false,
          column: [
            {
              label: "用户id",
              prop: "memberId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "用户名",
              prop: "name",
              span: 8,
              row: true
            }, {
              label: "席位",
              prop: "seat",
              span: 8,
              row: true,
              search: true,
            }, {
              label: "移动次数",
              prop: "moveNum",
              span: 8,
              row: true,
              search: true,
            },
            {
              label: "左移动",
              prop: "lAmount",
              span: 8,
              row: true
            },
            {
              label: "右移动",
              prop: "rAmount",
              span: 8,
              row: true
            },
            {
              label: "选择席位投入",
              prop: "isInSeat",
              search: true,
              span: 8,
              row: true,
              type: 'select',
              formatter: (_row, value) => {
                return robotMap[value];
              },
              dicData: [
                {
                  label: '否',
                  value: 0,
                },
                {
                  label: '是',
                  value: 1,
                },
              ]
            },
          ]
        },
      },
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {},
      query: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        status: null,
        moveNum: null,
      },
      data: [],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        menuWidth: 175,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: "期数/ID",
            prop: "id",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "开始时间",
            prop: "startAt",
            span: 8,
            row: true,
            type: 'select',
          },
          {
            label: "状态",
            prop: "status",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value) => {
              return typeMap[value] || '未知';
            },
            dicData: [
              {
                label: '等待中',
                value: 1,
              },
              {
                label: '已开始',
                value: 2,
              },
              {
                label: '已结束',
                value: 3,
              },
            ]
          },
          {
            label: "当前炸弹所在席位",
            prop: "nowBoomSeat",
            span: 14,
            row: true
          },
          {
            label: "炸弹爆炸所在席位",
            prop: "boomSeat",
            span: 14,
            row: true
          },
          {
            label: "移动的次数",
            prop: "moveNum",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "参与人数",
            prop: "joinNum",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "参与金额",
            prop: "joinAmount",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位1",
            prop: "seatOne",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位2",
            prop: "seatTwo",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位3",
            prop: "seatThree",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位4",
            prop: "seatFour",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位5",
            prop: "seatFive",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "席位6",
            prop: "seatSix",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            minRows: 8,
            span: 24,
            row: true
          },
        ]
      },
    };
  },
  computed: {
    number() {
      return number
    }
  },
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      pageRoom(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    searchChange(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    searchChangeRecord(params, done) {
      this.room.query = params;
      this.room.query.pageNum = 1;
      this.room.query.pageSize = 10;
      this.room.query.roomId = this.room.row.id;
      this.onLoadRecord(this.room.query);
      done();
    },
    searchChangeMoveLogRecord(params, done) {
      this.move_log.query = params;
      this.move_log.query.pageNum = 1;
      this.move_log.query.pageSize = 10;
      this.move_log.query.roomId = this.move_log.row.id;
      this.onLoadMoveLogRecord(this.move_log.query);
      done();
    },
    currentChangeRecord(currentPage, done) {
      this.room.query.pageNum = currentPage;
      this.onLoadRecord(this.room.query);
      done();
    },
    currentChangeMoveLogRecord(currentPage, done) {
      this.move_log.query.pageNum = currentPage;
      this.onLoadMoveLogRecord(this.move_log.query);
      done();
    },
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    tip(row) {
      this.room.query.roomId = row.id;
      this.room.row = row;
      this.onLoadRecord(this.room.query);
      this.drawer = true;
    },
    moveLog(row) {
      this.move_log.query.roomId = row.id;
      this.move_log.row = row;
      this.onLoadMoveLogRecord(this.room.query);
      this.move_log.drawer = true;
    },

    onLoadRecord() {
      this.room.loading = true;
      pageRecord(this.room.query).then(res => {
        const data = res.data.data;
        this.room.data = data.list;
        this.room.page.total = data.total;
        this.room.loading = false;
        // this.selectionClear();
      });
    },
    onLoadMoveLogRecord() {
      this.move_log.loading = true;
      pageMoveLogRecord(this.move_log.query).then(res => {
        const data = res.data.data;
        this.move_log.data = data.list;
        this.move_log.page.total = data.total;
        this.move_log.loading = false;
      });
    },
    queryRecord(params, done) {
      done();
    },
    openDialog(row, index) {
      this.dialog.row = row;
      this.dialog.index = index;
      this.dialog.editForm.id = row.id;
      this.dialog.editForm.nowBoomSeat = row.nowBoomSeat;
      this.dialog.dialogVisible = true;
    },
    setNowBombSeat(id, seat) {
      setNowBombSeat(id, seat).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.dialog.dialogVisible = false;
      }, error => {
        window.console.log(error);
        loading();
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
