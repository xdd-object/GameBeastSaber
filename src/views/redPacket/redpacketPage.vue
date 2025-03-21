<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { reqRedpacketPage } from "@/api/redPacket/index";
import dayjs from 'dayjs'



const typeMap = {
  1: '投票中',
  2: '未开始',
  3: '进行中',
  4: '已结束',
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
        menu: false,

        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        addBtn: false,
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true
          },
          {
            label: "期Id",
            prop: "periodId",
            span: 8,
            row: true,
            search: true,

          },
          {
            label: "发送者",
            prop: "sender",
            search: true,
            span: 8,
            row: true
          }, {
            label: "数量",
            prop: "num",
            span: 8,
            row: true
          },
          {
            label: "手续费",
            prop: "fee",
            span: 8,
            row: true
          },

          {
            label: "剩余数量",
            prop: "remainNum",
            span: 8,
            row: true,
           
          },
          {
            label: "份数",
            prop: "count",
            span: 8,
            row: true
          },
          {
            label: "剩余份数",
            prop: "remainCount",
            span: 8,
            row: true
          },
          {
            label: "手气id",
            prop: "luckId",
            span: 8,
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true
          },
          {
            label: "更新时间",
            prop: "updatedAt",
            span: 8,
            row: true
          },
        
        ]
      }
    };
  },
  computed: {},

  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    sizeChange(pageSize) {
      this.query.pageSize = pageSize;
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done()

    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done()
    },
    onLoadRecord() {
      this.loading = true;
      reqRedpacketPage(this.query).then(res => {
        console.log(res, "resres");
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss"></style>