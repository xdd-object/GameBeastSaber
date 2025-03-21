<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord" :permission="permissionList"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" @row-update="rowUpdate" />

</template>

<script>

import { reqPageWeight, reqUpdateWeight } from "@/api/kill2/config";
import dayjs from 'dayjs'

import { typeMap, statusRecordMap } from "@/const/kill/kill"
import {mapGetters} from "vuex";

// 0:未开始，1:已开始 2：结束中 3：已结束


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

      },
      data: [
      ],
      option: {
        delBtn: false,
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
            row: false,

            editDisplay: false,
          },
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            search: true,
            row: false,
            editDisplay: false,

          },
          {
            label: "类型",
            prop: "type",
            span: 8,
            type: 'select',
            editDisplay: false,
            row: false,

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },

          },
          {
            label: "权重",
            prop: "weight",
            span: 8,

          },
          {
            label: "累积投入",
            prop: "amount",
            span: 8,
            editDisplay: false,
            row: false,

          },
          {
            label: "累积收益",
            prop: "income",
            span: 8,
            editDisplay: false,
            row: false,

          },
          {
            label: "累积总收益",
            prop: "totalAmount",
            span: 8,
            editDisplay: false,
            row: false,

          },
          {
            label: "创建时间",
            prop: "createTime",
            span: 8,
            editDisplay: false,
            row: false,

          },
          {
            label: "排序名称",
            prop: "sortName",
            search: true,
            span: 0,
            hide: true,
            type: 'select',
            editDisplay: false,
            row: false,

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '权重',
                value: "weight",
              },
              {
                label: '盈利',
                value: "income",
              },
            ]
          },
          {
            label: "升降序",
            prop: "sort",
            search: true,
            span: 0,
            type: 'select',
            hide: true,
            editDisplay: false,
            row: false,

            formatter: (_row, value) => {
              return typeMap[value] || '未知'; //
            },
            dicData: [
              {
                label: '升序',
                value: 0,
              },
              {
                label: '倒序',
                value: 1,
              },
            ]
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permission.kill2_weight_edit, false),
      };
    },
  },
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
      reqPageWeight(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      const sendData = {
        id: row.id,
        weight: row.weight
      }
      reqUpdateWeight(sendData).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
