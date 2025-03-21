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

import {pagePropRecord} from "@/api/wall/wall";
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
  1: '道具',
  2: '喇叭',
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
            label: "道具类型",
            prop: "type",
            span: 8,
            row: true,
            type: 'select',
            search: true,
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(typeMap)
          },
          {
            label: "道具名称",
            prop: "name",
            span: 8,
            row: true
          },
          {
            label: "拉力值",
            prop: "pull",
            span: 8,
            row: true
          },{
            label: "汗水值",
            prop: "sweat",
            span: 8,
            row: true
          }, {
            label: "选择哪一边",
            prop: "self",
            span: 8,
            row: true,
          },{
            label: "金额",
            prop: "amount",
            span: 8,
            row: true
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
      pagePropRecord(this.query).then(res => {
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
