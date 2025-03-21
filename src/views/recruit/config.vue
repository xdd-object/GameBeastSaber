<template>
  <basic-container>
    <avue-crud :option="option" :page.sync="page" :data="data" @row-update="rowUpdate" @row-save="rowSave"
      @row-del="rowDelete" @search-change="searchRecord" @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  pageConfig,
  updateConfig,
  deleteConfig,
  saveConfig
} from "@/api/recruit/config";
import { mapToOptions } from "@/util/common";

// 1: vip年卡
const conditionTypeMap = {
  1: 'vip年卡',
}
// 1: vip年卡
const statusMap = {
  0: '禁用',
  1: '启用',
}
export default {
  name: "wel",
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
        addBtn: true,
        menu: true,
        delBtn: true,
        column: [{
          label: "ID",
          prop: "id",
          row: true,
          addDisplay: false,
          editDisplay: false,
          dataType: 'number',
        },
        {
          label: "开始时间",
          prop: "beginTime",
          type: "datetime",
          format: "yyyy-MM-dd hh:mm:ss",
          valueFormat: "yyyy-MM-dd hh:mm:ss",
          row: true,
        },
        {
          label: "结束时间",
          prop: "endTime",
          type: "datetime",
          format: "yyyy-MM-dd hh:mm:ss",
          valueFormat: "yyyy-MM-dd hh:mm:ss",
          row: true,
        },
        {
          label: "条件类型",
          prop: "conditionType",
          type: "select",
          dataType: 'number',
          row: true,
          dicData: mapToOptions(conditionTypeMap),
          formatter: (_row, value) => {
            return conditionTypeMap[value] || '未知'; //
          }
        },
        {
          label: "条件数量",
          prop: "condition",
          row: true,
          dataType: 'number',
        },
        {
          label: "报名价格",
          prop: "price",
          type: 'number',
          dataType: 'number',
          row: true,
        },
        {
          label: "最大参与人数",
          prop: "participantsMax",
          type: 'number',
          dataType: 'number',
          row: true,
        },
        {
          label: "上架状态",
          prop: "status",
          row: true,
          type: 'radio',
          dataType: 'number',
          formatter: (_row, value) => {
            return statusMap[value] || '未知'; //
          },
          dicData: mapToOptions(statusMap)
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
      pageConfig(this.query).then(res => {
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
    rowUpdate(row, index, done, loading) {
      updateConfig(row).then(() => {
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
    rowSave(row, done, loading) {
      saveConfig(row).then(() => {
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
    rowDelete(row, done, loading) {
      deleteConfig({ id: row.id }).then(() => {
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
