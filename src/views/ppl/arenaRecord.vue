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

import {pageArenaRecord} from "@/api/ppl/pplArena";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {statusMap,statusRecordMap,typeIdMap,selfMap,skillMap} from "@/const/ppl/ppl";

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
            label: "场次id",
            prop: "roomId",
            search: true,
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
          },
          {
            label: "参与时间",
            prop: "createTime",
          },
          {
            label: "结束时间",
            prop: "endTime",
          },
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
      pageArenaRecord(this.query).then(res => {
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
