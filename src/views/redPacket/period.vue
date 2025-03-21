<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { reqRedpacketPeriod } from "@/api/redPacket/index";
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
            label: "期数",
            prop: "periodNum",
            span: 8,
            row: true
          },
          {
            label: "期号",
            prop: "periodNo",
            search: true,

            span: 8,
            row: true
          }, {
            label: "名称",
            prop: "name",
            span: 8,
            row: true
          },
          {
            label: "初始积分",
            prop: "initialNum",
            span: 8,
            row: true
          },

          {
            label: "状态",
            prop: "status",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '投票中',
                value: 1,
              },
              {
                label: '未开始',
                value: 2,
              },
              {
                label: '进行中',
                value: 3,
              },
              {
                label: '已结束',
                value: 4,
              },
            ]
          },
          {
            label: "开始时间",
            prop: "startedAt",
            span: 8,
            row: true
          },
          {
            label: "结束时间",
            prop: "endedAt",
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
      reqRedpacketPeriod(this.query).then(res => {
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