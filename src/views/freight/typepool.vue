<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord"
      @search-change="searchRecord" @on-load="onLoad" @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  typePoolList,
} from "@/api/freight/pool";
import { mapToOptions } from "@/util/common";

const currencyIdMap = {
  1: 'ZCoin',
  3: '钻石',
}

const freightTypeMap = {
  1: '轮渡',
  2: '航空',
}

export default {
  name: "freightTypePool",
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
        addBtn: false,
        menu: false,
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
          label: "货运类型",
          prop: "freightType",
          type: "select",
          dataType: 'number',
          search: true,
          row: true,
          dicData: mapToOptions(currencyIdMap),
          formatter: (_row, value) => {
            return freightTypeMap[value] || '未知'; //
          }
        },
        {
          label: "货币类型",
          prop: "currencyId",
          type: "select",
          dataType: 'number',
          search: true,
          row: true,
          dicData: mapToOptions(currencyIdMap),
          formatter: (_row, value) => {
            return currencyIdMap[value] || '未知'; //
          }
        },
        {
          label: "数量",
          prop: "num",
          row: true,
          dataType: 'number',
        },
        {
          label: "创建时间",
          prop: "createdAt",
          row: true,
          addDisplay: false,
          editDisplay: false,
        },
        {
          label: "更新时间",
          prop: "updatedAt",
          row: true,
          addDisplay: false,
          editDisplay: false,
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
      typePoolList(this.query).then(res => {
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
      typePoolList(this.query).then((res) => {
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
        this.loading = false;
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
