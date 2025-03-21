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
      </avue-crud>
    </el-drawer>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @search-change="searchChange"
             @current-change="currentChange"
             @refresh-change="onLoad">


  </avue-crud>
  </basic-container>
</template>

<script>

import {pageInvestGroupByUserId} from "@/api/loan/loan";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";
import dayjs from 'dayjs'

const statusMap = {
  100: '投资中',
  900: '已收回',
}
const statusRecordMap = {
  0: '未处理',
  1: '已处理',
}

const typeMap = {
  1: 'ZCoin场',
  2: '金豆场',
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
          borrowId: null,
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
              label: "ID",
              prop: "id",
              span: 8,
              search: false,
              row: true
            }, {
              label: "用户id",
              prop: "userId",
              span: 8,
              row: true
            }, {
              label: "利息",
              prop: "amount",
              span: 8,
              row: true
            }, {
              label: "利息日期",
              prop: "date",
              span: 8,
              row: true
            }, {
              label: "时间",
              prop: "createTime",
              span: 8,
              row: true
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
        date: null
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
            label: "用户id",
            prop: "userId",
            span: 14,
            search: true,
            row: true
          },
          {
            label: "投资总ZCoin",
            prop: "amount",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "时间",
            prop: "createTime",
            minRows: 8,
            span: 24,
            type: 'date',
            search: true,
            row: true
          },
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
      pageInvestGroupByUserId(this.query).then(res => {
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
      if (params.createTime) this.query.date = dayjs(params.createTime).format('YYYY-MM-DD');
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
      this.room.query.investId = row.id;
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
      pageInvestDetail(this.room.query).then(res => {
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
