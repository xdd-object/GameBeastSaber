<template>
  <basic-container>
    <el-drawer title="" size="50%" :visible.sync="drawer" :direction="direction" append-to-body
      >
      <avue-crud :data="load.data" :page.sync="load.page" :option="load.option" @search-change="searchChangeRecord"
        @refresh-change="onLoadRecord" @current-change="currentChangeRecord">
      </avue-crud>
    </el-drawer>
    <avue-crud :option="option" :page.sync="page" :data="data" @current-change="searchPageRecord"
      @search-change="searchRecord" @on-load="onLoad" @refresh-change="onLoad">

      <template #menu="{ size, row, index }">
        <el-button @click="tip(row, index)" text type="primary" :size="size">参与人列表</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  page,
  loadPage
} from "@/api/freight/round";
import { mapToOptions } from "@/util/common";

const freightTypeMap = {
  1: '轮渡',
  2: '航空',
}

const currencyIdMap = {
  1: 'ZCoin',
  3: '钻石',
}

const statusMap = {
  1: '未进行',
  2: '进行中',
  3: '完成',
  4: '结束',
}

// const releaseStatusMap = {
//   1: '未释放',
//   2: '释放中',
//   3: '释放完成',
//   4: '释放失败',
// }

const taskTypeMap = {
  0: '未知任务',
  1: '奖励任务',
  2: '锁仓任务',
  3: '清货任务',
}

export default {
  name: "freightRound",
  data() {
    return {
      load: {
        query: {
          pageNum: 1,
          pageSize: 10,
        },
        row: {
          roundId: null,
        },
        page: {
          total: 0
        },
        data: [

        ],
        option: {
          delBtn: false,
          editBtn: false,
          border: true,
          align: 'center',
          menuAlign: 'center',
          addBtn: false,
          menu:false,
          column: [
            {
              label: "用户id",
              prop: "userId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "用户名",
              prop: "nickname",
              span: 8,
              row: true
            },
            {
              label: "装载数量",
              prop: "loaded",
              span: 8,
              row: true
            },
            {
              label: "预计释放",
              prop: "expectedRelease",
              span: 8,
              row: true
            },
            {
              label: "已释放",
              prop: "totalRelease",
              span: 8,
              row: true
            },
            {
              label: "个人获得",
              prop: "release",
              span: 8,
              row: true
            },
            {
              label: "锁仓数量",
              prop: "lock",
              span: 8,
              row: true
            },
            {
              label: "直推",
              prop: "recommend",
              span: 8,
              row: true
            },
            {
              label: "星级",
              prop: "starLevel",
              span: 8,
              row: true
            },

            {
              label: "装载时间",
              width: 150,
              prop: "createdAt",
              row: true
            },
          ]
        },
      },
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      query: {
        "pageNum": 1,
        "pageSize": 10
      },
      data: [],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        menuWidth: 150,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        align: "center",
        column: [{
          label: "ID",
          prop: "id",
          row: true,
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
          label: "轮数",
          prop: "round",
          row: true,
          dataType: 'number',
        },
        {
          label: "进度",
          prop: "progress",
          row: true,
          dataType: 'number',
        },
        {
          label: "目标",
          prop: "targets",
          row: true,
          dataType: 'number',
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          dataType: 'number',
          search: true,
          row: true,
          dicData: mapToOptions(statusMap),
          formatter: (_row, value) => {
            return statusMap[value] || '未知'; //
          }
        },
        // {
        //   label: "释放状态",
        //   prop: "releaseStatus",
        //   dataType: 'number',
        //   row: true,
        //   dicData: mapToOptions(releaseStatusMap),
        //   formatter: (_row, value) => {
        //     return releaseStatusMap[value] || '未知'; //
        //   }
        // },
        {
          label: "预计释放",
          prop: "expectedRelease",
          row: true,
          dataType: 'number',
        },
        {
          label: "已释放",
          prop: "release",
          row: true,
          dataType: 'number',
        },
        {
          label: "参与人数",
          prop: "peopleNum",
          row: true,
          dataType: 'number',
        },
        {
          label: "任务类型",
          prop: "taskType",
          dataType: 'number',
          row: true,
          dicData: mapToOptions(taskTypeMap),
          formatter: (_row, value) => {
            return taskTypeMap[value] || '未知'; //
          }
        },
        {
          label: "锁仓数量",
          prop: "lock",
          row: true,
          dataType: 'number',
        },
        {
          label: "锁仓时间",
          prop: "lockAt",
          row: true,
        },
        {
          label: "开始时间",
          prop: "beginAt",
          row: true,
        },
        {
          label: "结束时间",
          prop: "endedAt",
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


    tip(row) {
      this.load.query.roundId = row.id;
      this.load.row = row;
      this.onLoadRecord(this.load.query);
      this.drawer = true;
    },
    onLoadRecord() {
      this.load.loading = true;
      loadPage(this.load.query).then(res => {
        const data = res.data.data;
        this.load.data = data.list;
        this.load.page.total = data.total;
        this.load.loading = false;
      });
    },

    searchChangeRecord(params, done) {
      this.load.query = params;
      this.load.query.pageNum = 1;
      this.load.query.pageSize = 10;
      this.load.query.roundId = this.load.row.id;
      this.onLoadRecord(this.load.query);
      done();
    },
  },

};
</script>

<style scoped="scoped" lang="scss"></style>
