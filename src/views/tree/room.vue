<template>
  <basic-container>
    <el-drawer
        title=""
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
        <template #menu="{size, row,index}">
          <el-button @click="tips(row,index)"
                     v-if="row.status != 1"
                     text
                     type="primary"
                     :size="size">处理</el-button>
        </template>
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
                   :size="size">参与人列表</el-button>
      </template>

  </avue-crud>
  </basic-container>
</template>

<script>

import {pageRoom, pageRecord, handlePlayRecord} from "@/api/tree/tree";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
  0: '未开始',
  1: '进行中',
  2: '结算中',
  3: '已结束',
}
const statusRecordMap = {
  0: '未处理',
  1: '已处理',
}

const typeMap = {
  1: 'ZCoin场',
  2: '金豆场',
}
const selfMap = {
  'left': 'left',
  'right': 'right',
}

export default {
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      room : {
        query: {
          pageNum: 1,
          pageSize: 10,
          roomId: null,
          num: null,
          type: null,
          killRoom: null,
          status: null,
        },
        row: {
          roomId: null,
        },
        page: {
          total: 0
        },
        data: [

        ],
        option:{
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border:true,
          align:'center',
          menuAlign:'center',
          addBtn: false,
          column:[
           {
              label: "用户id",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            }, {
              label: "用户名",
              prop: "nickname",
              span: 8,
              row: true
            },
            {
              label: "浇水号码",
              prop: "num",
              span: 8,
              row: true
            },{
              label: "金额",
              prop: "amount",
              span: 8,
              row: true
            }, {
              label: "大奖金额",
              prop: "jackpotAmount",
              span: 8,
              row: true,
            },{
              label: "特殊号码金额",
              prop: "specialAmount",
              span: 8,
              row: true
            },{
              label: "层级奖励金额",
              prop: "levelAmount",
              span: 8,
              row: true
            }, {
              label: "收益",
              prop: "totalAmount",
              span: 8,
              row: true,
            }
            , {
              label: "状态",
              prop: "status",
              span: 8,
              row: true,
              formatter: (_row, value)=> {
                return statusRecordMap[value] ||'未知'; //
              }
            }
          ]
        },
      },
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        num: null,
        type: null,
        killRoom: null,
        status: null,
      },
      data: [
      ],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        menuWidth: 200,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "浇水次数",
            prop: "num",
            row: true
          },
          {
            label: "奖池金额",
            prop: "poolAmount",
            row: true
          },
          {
            label: "大奖金额",
            prop: "jackpotAmount",
            row: true
          },
          {
            label: "大奖号码",
            prop: "jackpotNum",
            row: true
          },
          {
            label: "大奖用户id",
            prop: "jackpotUserId",
            row: true
          },
          {
            label: "大奖用户昵称",
            prop: "jackpotNickname",
            row: true
          },
          {
            label: "特殊号码金额",
            prop: "specialAmount",
            row: true
          },
          {
            label: "特殊号",
            prop: "specialNum",
            row: true
          },
          {
            label: "总金额",
            prop: "amount",
            row: true,
          },
          {
            label: "状态",
            prop: "status",
            minRows: 8,
            span: 24,
            row: true,
            formatter: (_row, value)=> {
              return statusMap[value] ||'未知'; //
            }
          },
          {
            label: "开始时间",
            prop: "startTime",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "结束时间",
            prop: "endTime",
            minRows: 8,
            span: 24,
            row: true
          }
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      pageRoom(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
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
    currentChangeRecord(currentPage, done) {
      this.room.query.pageNum = currentPage;
      this.onLoadRecord(this.room.query);
      done();
    },
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    tip (row) {
      this.room.query.roomId = row.id;
      this.room.row = row;
      this.onLoadRecord(this.room.query);
      this.drawer = true;
    },
    tips (row) {
      this.drawer = true;
      handlePlayRecord(row).then(res => {
        this.onLoadRecord();
      })
    },
    onLoadRecord() {
      this.room.loading = true;
      pageRecord(this.room.query).then(res => {
        const data = res.data.data;
        this.room.data = data.records;
        this.room.page.total = data.total;
        this.room.loading = false;
        // this.selectionClear();
      });
    },
    queryRecord(params, done) {
      done();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
