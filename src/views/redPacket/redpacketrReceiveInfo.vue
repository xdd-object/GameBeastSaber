<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @size-change="sizeChange" @refresh-change="onLoad" />

</template>

<script>

import { reqRedpacketrReceiveInfo } from "@/api/redPacket/index";
import dayjs from 'dayjs'



const typeMap = {
  0: '否',
  1: '是',

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
            label: "红包id",
            prop: "packetId",
            span: 8,
            row: true,
            search: true,

          },
          {
            label: "领取用户id",
            prop: "userId",
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
            label: "是否机器人",
            prop: "robot",
            span: 8,
            row: true,
            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
          },

          {
            label: "是否手气最佳",
            prop: "luck",
            span: 8,
            row: true,
            search: true,

            type: 'select',

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
            {
                label: '否',
                value: 0,
              },
              {
                label: '是',
                value: 1,
              },
            ]
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
      reqRedpacketrReceiveInfo(this.query).then(res => {
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