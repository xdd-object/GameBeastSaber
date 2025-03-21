<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord" @search-change="searchRecord" @on-load="onLoad"
      @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  pageTicketStatistics,
} from "@/api/ticket/ticket";

export default {
  name: "ticketStatistics",
  data() {
    return {
      page: {
        total: 10
      },
      query: {
        "pageNum": 1,
        "pageSize": 10
      },
      data: [],
      option: {
        menu: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        column: [{
          label: "ID",
          prop: "id",
          row: true,
          addDisplay: false,
          editDisplay: false,
          dataType: 'number',
        },
        {
          label: "系统总云券数",
          prop: "totalNum",
          row: true,
          dataType: 'number',
        },
        {
          label: "新增数量",
          prop: "addedNum",
          row: true,
        },
        {
          label: "过期数量",
          prop: "expiredNum",
          row: true,
        },
        {
          label: "日期",
          prop: "date",
          row: true,
          search: true,
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
        },
        ]
      }
    };
  },
  computed: {},
  created() { },
  methods: {
    onLoad() {
      this.loading = true;
      pageTicketStatistics(this.query).then(res => {
        const data = res.data;
        this.data = data.data.list;
        this.page.total = data.data.total;
        this.loading = false;
      });
    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoad(this.query);
      done();
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      pageTicketStatistics(this.query).then((res) => {
        const data = res.data;
        this.data = data.data.list;
        this.page.total = data.data.total;
        this.loading = false;
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
