<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {pageRecord} from "@/api/wall/wall";
import dayjs from 'dayjs'
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
            label: "ID",
            prop: "id",
            span: 8,
            row: true
          },
          {
            label: "场次id",
            prop: "roomId",
            span: 8,
            search: true,
            row: true
          }, {
            label: "用户id",
            prop: "userId",
            span: 8,
            search: true,
            row: true
          }, {
            label: "用户名",
            prop: "nickname",
            span: 8,
            overHidden: true,
            row: true
          },{
            label: "上周排名",
            prop: "rank",
            span: 8,
            row: true
          },
          {
            label: "选择哪一边",
            prop: "self",
            span: 6,
            search: true,
            type: 'select',
            row: true,
            dicData: mapToOptions(selfMap)
          }, {
            label: "胜利方",
            prop: "winner",
            span: 8,
            row: true,
          },{
            label: "金额",
            prop: "amount",
            span: 8,
            row: true
          }, {
            label: "收益",
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
            },
          },
          {
            label: "时间",
            prop: "createTime",
            span: 8,
            width: 150,
            row: true,
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.onLoadRecord()
  },
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    searchRecord(params, done) {
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
      if (this.page.pageSize) {
        this.query.pageSize = this.page.pageSize;
      }
      pageRecord(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
