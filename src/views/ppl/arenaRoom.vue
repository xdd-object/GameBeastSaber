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
<!--        <template #menu="{size, row,index}">-->
<!--          <el-button @click="tips(row,index)"-->
<!--                     v-if="row.status != 1"-->
<!--                     text-->
<!--                     type="primary"-->
<!--                     :size="size">处理</el-button>-->
<!--        </template>-->
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

import {pageArenaRoom, pageArenaRecord} from "@/api/ppl/pplArena";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {statusMap,statusRecordMap,typeIdMap,selfMap,skillMap} from "@/const/ppl/ppl";

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
          menu: false,
          // menuWidth: 150,
          // menuAlign:'center',
          border:true,
          align:'center',
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
              label: "选择哪一边",
              prop: "self",
              span: 8,
              row: true,
              // search: true,
              type: 'select',
              dicData: mapToOptions(selfMap)
            },
            {
              label: "胜利方",
              prop: "winner",
              span: 8,
              row: true,
            },
            {
              label: "订单id",
              prop: "orderId",
            },
            {
              label: "订单金额",
              prop: "amount",
            },
            {
              label: "得到订单id",
              prop: "outOrderId",
            },
            {
              label: "本场收益",
              prop: "outAmount",
            },
            {
              label: "技能1",
              prop: "skill1",
              formatter: (_row, value)=> {
                return skillMap[value] ||'未知'; //
              }
            },
            {
              label: "技能2",
              prop: "skill2",
              formatter: (_row, value)=> {
                return skillMap[value] ||'未知'; //
              }
            },
            {
              label: "技能3",
              prop: "skill3",
              formatter: (_row, value)=> {
                return skillMap[value] ||'未知'; //
              }
            },
            {
              label: "总收益",
              prop: "totalAmount",
              span: 8,
              row: true,
              formatter: (_row, value)=> {
                return value || 0; //
              }
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
            search: true,
          },
          {
            label: "场次类型",
            prop: "typeId",
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return typeIdMap[value] ||'未知'; //
            },
            dicData: mapToOptions(typeIdMap),
          },
          {
            label: "左边用户id",
            prop: "leftUserId",
          },
          {
            label: "左边用户昵称",
            prop: "leftNickname",
          },
          {
            label: "左边订单id",
            prop: "leftOrderId",
          },
          {
            label: "左边订单金额",
            prop: "leftAmount",
          },
          {
            label: "右边用户id",
            prop: "rightUserId",
          },
          {
            label: "右边用户昵称",
            prop: "rightNickname",
          },
          {
            label: "右边订单id",
            prop: "rightOrderId",
          },
          {
            label: "右边订单金额",
            prop: "rightAmount",
          },
          {
            label: "胜利方",
            prop: "winner",
          },
          {
            label: "胜利方订单id",
            prop: "winnerOrderId",
          },
          {
            label: "胜利方订单金额",
            prop: "winnerAmount",
          },
          {
            label: "失败方订单id",
            prop: "loseOrderId",
          },
          {
            label: "失败方订单金额",
            prop: "loseAmount",
          },
          {
            label: "状态",
            prop: "status",
            formatter: (_row, value)=> {
              return statusMap[value] ||'未知'; //
            }
          },
          {
            label: "结束时间",
            prop: "endTime",
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
      pageArenaRoom(this.query).then(res => {
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
      pageArenaRecord(this.room.query).then(res => {
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
