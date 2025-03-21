<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord" @search-change="searchRecord" @on-load="onLoad"
      @refresh-change="onLoad" >
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  pageMember,
} from "@/api/recruit/member";

export default {
  name: "recruitMember",
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
          label: "配置id",
          prop: "configId",
          row: true,
          dataType: 'number',
        },
        {
          label: "推荐人",
          prop: "recommender",
          row: true,
          dataType: 'number',
          search: true,
        },
        {
          label: "被推荐人",
          prop: "memberId",
          dataType: 'number',
          row: true,
          search: true,
        },
        {
          label: "推荐时间",
          prop: "createdAt",
          row: true,
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
      pageMember(this.query).then(res => {
        const data = res.data;
        this.data = data.data.list;
        this.page.total = data.data.total;
        this.loading = false;
      });
    },

    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      pageMember(this.query).then((res) => {
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

    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoad(this.query);
      done();
    },
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
