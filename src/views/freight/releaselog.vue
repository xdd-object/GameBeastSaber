<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord"
      @search-change="searchRecord" @on-load="onLoad" @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  releaseLog,
} from "@/api/freight/log";
import { mapToOptions } from "@/util/common";

const freightTypeMap = {
  1: '轮渡',
  2: '航空',
}

const currencyIdMap = {
  1: 'ZCoin',
  3: '钻石',
}

const releaseTypeMap = {
  1: '首次',
  2: '锁仓',
}

export default {
  name: "freightReleaseLog",
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
          label: "用户ID",
          prop: "userId",
          row: true,
          search: true,
          dataType: 'number',
        },
        {
          label: "昵称",
          prop: "nickname",
          row: true,
          search: true,
          dataType: 'string',
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
          label: "轮ID",
          prop: "roundId",
          row: true,
          search:true,
          dataType: 'number',
        },
        {
          label: "装载ID",
          prop: "loadId",
          search:true,
          row: true,
          dataType: 'number',
        },
        {
          label: "投入数量",
          prop: "loaded",
          row: true,
          dataType: 'number',
        },
        {
          label: "释放数量",
          prop: "release",
          row: true,
          dataType: 'number',
        },
        {
          label: "释放类型",
          prop: "releaseType",
          type: "select",
          dataType: 'number',
          search: true,
          row: true,
          dicData: mapToOptions(releaseTypeMap),
          formatter: (_row, value) => {
            return releaseTypeMap[value] || '未知'; //
          }
        },
        {
          label: "释放日期",
          prop: "date",
          row: true,
          search:true,
          dataType: 'number',
        },
        {
          label: "释放时间",
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
      releaseLog(this.query).then(res => {
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
      releaseLog(this.query).then((res) => {
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
