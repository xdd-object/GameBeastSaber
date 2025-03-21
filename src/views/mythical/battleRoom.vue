<template>
  <basic-container>
    <el-drawer
        title=""
        size="50%"
        :visible.sync="drawer"
        :direction="direction"
               append-to-body
        >

      <BattleRecord :room-id="roomId" v-if="drawer" date-display="true" type-display="true" num-display="true" room-id-display="true"></BattleRecord>
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

import {pageBattleRoom} from "@/api/mythical/mythical";
import {mapGetters} from "vuex";
import {battleStatusMap, battleTypeMap, battleRoomMap} from "@/const/mythical/mythical"
import {mapToOptions} from "@/util/common";
import BattleRecord from "@/views/mythical/components/battleRecord.vue";

export default {
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  components: {
    BattleRecord
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {
      },
      roomId: 0,
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
        menuWidth: 150,
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
            label: "期数",
            prop: "num",
            span: 14,
            search: true,
            row: true
          },
          {
            label: "参与人数",
            prop: "people",
            span: 14,
            row: true
          },
          {
            label: "系统技能",
            prop: "killRoom",
            span: 8,
            search: true,
            type: "select",
            row: true,
            formatter: (_row, value)=> {
              return battleRoomMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleRoomMap)
          },
          {
            label: "石头金额",
            prop: "room1",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "剪刀金额",
            prop: "room2",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "布金额",
            prop: "room3",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "总数",
            prop: "total",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "失败房间金额",
            prop: "killTotal",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "状态",
            prop: "status",
            minRows: 8,
            span: 24,
            row: true,
            formatter: (_row, value)=> {
              return battleStatusMap[value] ||'未知'; //
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
      pageBattleRoom(this.query).then(res => {
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
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    tip (row) {
      this.roomId = row.id;
      // console.log(this.roomId)
      // this.room.row = row;
      // this.onLoadRecord(this.room.query);
      this.drawer = true;
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
