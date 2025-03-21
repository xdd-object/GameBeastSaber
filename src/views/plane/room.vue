<template>
  <basic-container>
    <el-drawer title="" size="50%" :visible.sync="drawer" :direction="direction" append-to-body
      >
      <avue-crud :data="room.data" :page.sync="room.page" :option="room.option" @search-change="searchChangeRecord"
        @refresh-change="onLoadRecord" @current-change="currentChangeRecord">
        <template #menu="{size, row,index}">
          <el-button @click="tips(row,index)"
                     v-if="row.status == 1"
                     text
                     type="primary"
                     :size="size">处理</el-button>
        </template>
      </avue-crud>
    </el-drawer>

    <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @search-change="searchChange"
      @search-reset="searchReset" @current-change="currentChange" @refresh-change="onLoad">
      <template #menu="{ size, row, index }">
        <el-button @click="tip(row, index)" text type="primary" :size="size">参与记录</el-button>
      </template>
    </avue-crud>

  </basic-container>
</template>

<script>

import { pageRoom, pageRecord,handlePlayRecord } from "@/api/plane/index"
import { mapGetters } from "vuex";
// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
  1: '未开始',
  2: '进行中',
  3: '已结算',
  4: '场次异常',
}
// 结算状态：1 未结算 2 已结算 3未领取 4已退还
const recordStatusMap = {
  1: '未结算',
  2: '已结算',
  3: '未领取',
  4: '已退还',
}
const statusRecordMap = {
  0: '未处理',
  1: '已处理',
}

const typeMap = {
  1: '宝石场',
  2: '金豆场',
}

export default {
  name: "wel",
  watch: {
    direction(value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      room: {
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
        option: {
          delBtn: false,
          editBtn: false,
          menuWidth: 150,
          border: true,
          align: 'center',
          menuAlign: 'center',
          addBtn: false,
          column: [
            {
              label: "用户id",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            }, {
              label: "用户名",
              prop: "nickName",
              span: 8,
              row: true
            }, {
              label: "金额",
              prop: "amount",
              span: 8,
              row: true
            }, {
              label: "收益",
              prop: "reward",
              span: 8,
              row: true,
            },
            // {
            //   label: "头像",
            //   prop: "avatar",
            //   span: 8,
            //   row: true,
            // },
            {
              label: "参与时间",
              prop: "createDate",
              span: 8,
              row: true,
            },
            {
              label: "飞行距离",
              prop: "distance",
              span: 8,
              row: true,
            }
            , {
              label: "状态",
              prop: "status",
              span: 8,
              row: true,
              search: true,
              type: 'select',
              formatter: (_row, value) => {
                return recordStatusMap[value] || '未知'; //
              },
              dicData: [
                {
                  label: '未结算',
                  value: 1,
                },
                {
                  label: '已结算',
                  value: 2,
                },
                {
                  label: '未领取',
                  value: 3,
                },
                {
                  label: '已退还',
                  value: 4,
                },
              ]
            }
          ]
        },
      },
      killRoomData: {
        drawer: false,
        id: null,
        killRoom: null,
      },
      options: [
        { value: "0", label: '未选择' },
        { value: "1", label: '1' },
        { value: "2", label: '2' },
        { value: "3", label: '3' },
        { value: "4", label: '4' },
        { value: "5", label: '5' },
        { value: "6", label: '6' },
        { value: "7", label: '7' },
        { value: "8", label: '8' },
      ],
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
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        addBtn: false,
        column: [
          {
            label: "场次ID",
            prop: "id",
            span: 8,
            search: true,
            row: true
          }, {
            label: "投注金额",
            prop: "amount",
            span: 8,
            row: true
          },
          {
            label: "飞行距离",
            prop: "distance",
            span: 8,
            row: true,
          }, {
            label: "飞行时长",
            prop: "flightTime",
            span: 8,
            row: true
          }, {
            label: "期数",
            prop: "num",
            search: true,
            span: 8,
            row: true
          }, {
            label: "奖励金额",
            prop: "reward",
            span: 8,
            row: true
          }
          , {
            label: "游戏状态",
            prop: "status",
            span: 8,
            row: true,
            search: true,
            type: 'select',
            formatter: (_row, value) => {
              return statusMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '未开始',
                value: 1,
              },
              {
                label: '进行中',
                value: 2,
              },
              {
                label: '已结算',
                value: 3,
              },
              {
                label: '场次异常',
                value: 4,
              },
            ]
          },
          {
            label: "开始时间",
            prop: "startTime",
            span: 8,
            row: true,

          },
          {
            label: "结束时间",
            prop: "endTime",
            span: 8,
            row: true,

          }
          // {
          //   label: "创建时间",
          //   prop: "createDate",
          //   span: 8,
          //   row: true,

          // },
          // {
          //   label: "修改时间",
          //   prop: "updateDate",
          //   span: 8,
          //   row: true,

          // }
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
    searchReset() {
      this.query = {}
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
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
    tip(row) {
      this.room.query.roomId = row.id;
      this.room.row = row;
      this.onLoadRecord(this.room.query);
      this.drawer = true;
    },

    tips(row) {
      this.drawer = true;
	  const data = {}
	  data.id=row.id;
	    console.log(data, 9999)
      handlePlayRecord(data).then(res => {
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
        .catch(_ => { });
    },
    selectAll() {
      if (this.killRoomData.killRoom.length < this.options.length) {
        this.killRoomData.killRoom = []
        this.options.map((item) => {
          this.killRoomData.killRoom.push(item.value)
        })
        this.killRoomData.killRoom.unshift('全选')
      } else {
        this.killRoomData.killRoom = []
      }
    },
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.options.length) {
        this.killRoomData.killRoom.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.options.length) {
        this.killRoomData.killRoom = this.killRoomData.killRoom.filter((item) => {
          return item !== '全选'
        })
      }
    },
    removeTag(val) {
      if (val === '全选') {
        this.killRoomData.killRoom = []
      }
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
