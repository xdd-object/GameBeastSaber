<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord"
      @search-change="searchRecord" @on-load="onLoad" @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  page,
} from "@/api/freight/period";
import { mapToOptions } from "@/util/common";

const freightTypeMap = {
  1: '轮渡',
  2: '航空',
}

const currencyIdMap = {
  1: 'ZCoin',
  3: '钻石',
}
export default {
  name: "freightPeriod",
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
          label: "期号",
          prop: "periodNo",
          row: true,
          search: true,
          dataType: 'string',
        },
        {
          label: "货运类型",
          prop: "freightType",
          type: "select",
          dataType: 'number',
          search: true,
          row: true,
          dicData: mapToOptions(freightTypeMap),
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
          label: "线程ID",
          prop: "routeId",
          row: true,
          dataType: 'number',
        },
        {
          label: "轮ID",
          prop: "roundId",
          row: true,
          dataType: 'number',
        },
        {
          label: "首轮目标",
          prop: "firstRoundTargets",
          row: true,
          dataType: 'number',
        },
        {
          label: "递增比例(百分比)",
          prop: "increasingRatio",
          row: true,
          dataType: 'number',
        },
        {
          label: "每轮注入奖池比例(百分比)",
          prop: "roundInjectRatio",
          row: true,
          dataType: 'number',
        },
        {
          label: "开始时间",
          prop: "beginAt",
          row: true,
          addDisplay: true,
          editDisplay: true,
        },
        {
          label: "结束时间",
          prop: "endedAt",
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
      page(this.query).then(res => {
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
      page(this.query).then((res) => {
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
