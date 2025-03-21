<template>
  <basic-container>
    <avue-crud :option="option" :data="data" @row-update="rowUpdate" @row-save="rowSave" @search-change="searchRecord"
      @row-del="rowDelete" @on-load="onLoad" @refresh-change="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
import {
  list,
  update,
  add,
} from "@/api/freight/route";
import { mapToOptions } from "@/util/common";
const freightTypeMap = {
  1: '轮渡',
  2: '航空'
}

const statusMap = {
  1: '开放',
  2: '关闭',
}

const currencyIdMap = {
  1: 'ZCoin',
  3: '钻石',
}

const autoMap = {
  0: '否',
  1: '是',
}
export default {
  name: "freightRoute",
  data() {
    return {
      query: {
      },
      data: [],
      option: {
        addBtn: true,
        menu: true,
        delBtn: false,
        align: "center",
        column: [{
          label: "ID",
          width: 100,
          prop: "id",
          row: true,
          addDisplay: false,
          editDisplay: false,
          dataType: 'number',
          editDisabled: true,
        },
        {
          label: "名称",
          prop: "name",
          row: true,
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
          label: "期id",
          prop: "periodId",
          addDisplay: false,
          editDisplay: false,
          dataType: 'number',
          row: true,
        },
        {
          label: "开放状态",
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
          label: "自动下一期",
          prop: "auto",
          row: true,
          type: 'radio',
          dataType: 'number',
          formatter: (_row, value) => {
            return autoMap[value] || '未知'; //
          },
          dicData: mapToOptions(autoMap)
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
      list(this.query).then(res => {
        const data = res.data;
        this.data = data.data;
        this.loading = false;
      });
    },

    searchRecord(params, done) {
      this.query = params;
      list(this.query).then((res) => {
        const data = res.data;
        this.data = data.data;
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

    rowUpdate(row, index, done, loading) {
      update(row).then(() => {
        this.onLoad();
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
      add(row).then(() => {
        this.onLoad();
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
