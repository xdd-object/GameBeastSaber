<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad">
    <template #menu="{size, row,index}">
      <el-button @click="tips(row,index)"
                 v-if="row.status != 1 && row.room != 0"
                 text
                 type="primary"
                 :size="size">处理</el-button>
    </template>
  </avue-crud>

</template>

<script>

import {pageBattleRecord, handlePlayRecord} from "@/api/mythical/mythical";
import {mapGetters} from "vuex";
import {battleTypeMap, battleRecordStatusMap, battleRoomMap, battleWinMap} from "@/const/mythical/mythical"
import {mapToOptions} from "@/util/common";
import {yesMap} from "@/const/account/account";

export default {
  name: "wel",
  props: {
    roomId: {
      type: Number,
    },

    roomIdDisplay: {
      type: Boolean,
      default: false,
    },
    typeDisplay: {
      type: Boolean,
      default: false,
    },
    dateDisplay: {
      type: Boolean,
      default: false,
    },
    numDisplay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: {
        total: 0
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        roomId: null,
        num: null,
        type: null,
        killRoom: null,
        status: null,
      },
      data: [
      ],
      option: {
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
            prop: "memberId",
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
            label: "场次类型",
            prop: "type",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return battleTypeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleTypeMap)
          },
          {
            label: "场次id",
            prop: "roomId",
            search: true,
            span: 8,
            row: true
          },
          {
            label: "期数",
            prop: "num",
            search: true,
            span: 8,
            row: true
          },
          {
            label: "所在位置",
            prop: "room",
            span: 8,
            type: "select",
            row: true,
            formatter: (_row, value)=> {
              return battleRoomMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleRoomMap)
          }, {
            label: "系统技能",
            prop: "killRoom",
            span: 8,
            type: "select",
            row: true,
            formatter: (_row, value)=> {
              return battleRoomMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleRoomMap)
          },
          {
            label: "游戏结果",
            prop: "win",
            span: 8,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return battleWinMap[value] ||'未知'; //
            },
          },
          {
            label: "是否机器人",
            prop: "robot",
            span: 8,
            row: true,
            type: "select",
            search: true,
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap)
          },
          {
            label: "参与金额",
            prop: "amount",
            span: 8,
            row: true
          },
          {
            label: "食物收益",
            prop: "foodIncome",
            span: 8,
            row: true
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
              return battleRecordStatusMap[value] ||'未知'; //
            },
          },
          {
            label: "时间",
            prop: "createTime",
            span: 8,
            row: true,
          },
          {
            label: "结算时间",
            prop: "endTime",
            span: 8,
            row: true,
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            search: true,
            hide: true,
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    console.info(this.roomId)
    this.datasInit()
  },
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    searchRecord(params, done) {
      if (!params.roomId) {
        params.roomId = this.roomId
      }
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done();
    },
    onLoadRecord() {
      this.loading = true;
      pageBattleRecord(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    tips (row) {
      this.drawer = true;
      handlePlayRecord(row).then(res => {
        this.onLoadRecord();
      })
    },
    datasInit() {
      if (this.roomId) {
        this.query.roomId = this.roomId;
      }

      if (this.roomIdDisplay) {
        this.option.column[3].search=false;
      }
      if (this.typeDisplay) {
        this.option.column[2].search=false;
      }
      if (this.dateDisplay) {
        this.option.column[9].search=false;
      }
      if (this.numDisplay) {
        this.option.column[4].search=false;
      }
      if (this.dateDisplay) {
        this.option.column[this.option.column.length-1].search=false;
      }
    }
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
