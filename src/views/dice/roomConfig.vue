<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
    @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" @row-update="rowUpdate"
    @row-save="rowSave" />

</template>

<script>

import { roomConfigPage, roomConfigSave } from "@/api/dice/dice";
import {mapToOptions} from "@/util/common";

const bluffType = {
  1: '平叫斋',
  2: '减1叫斋',
  3: '减半加1叫斋',
}

const breakBluffType = {
  1: "不可飞斋",
  2: "人头飞斋",
  3: "双倍飞斋",
}

export default {
  name: "roomConfig",
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
        addBtn: true,
        menu: true,
        delBtn: false,
        editBtn: true,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: "id",
            prop: "id",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
            dataType: 'number',
            editDisabled: true,
          }, {
            label: "名称",
            prop: "name",
            span: 8,
            row: true
          },
          {
            label: "人数",
            prop: "peopleNum",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "入场价格",
            prop: "admissionPrice",
            span: 8,
            dataType: 'number',
            row: true
          }, {
            label: "手续费比例(百分比)",
            prop: "commission",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "叫斋类型",
            prop: "bluff",
            span: 8,
            dataType: 'number',
            row: true,
            type: "select",
            formatter: (_row, value) => {
              return bluffType[value] || '未知'; //
            },
            dicData: mapToOptions(bluffType),
          },
          {
            label: "飞斋类型",
            prop: "breakBluff",
            span: 8,
            dataType: 'number',
            row: true,
            type: "select",
            dicData: mapToOptions(breakBluffType),
            formatter: (_row, value) => {
              return breakBluffType[value] || '未知'; //
            }
          },
          {
            label: "是否可劈",
            prop: "isChop",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "是否可反劈",
            prop: "isCounterChop",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "最大反劈次数",
            prop: "maxCounterChop",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "最大醉酒值",
            prop: "maxDrunk",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "全骰点数",
            prop: "fullDice",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "围骰点数",
            prop: "surroundDice",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "基础经验",
            prop: "baseExp",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "基础醉酒值",
            prop: "baseDrunk",
            span: 8,
            dataType: 'number',
            row: true
          },
          {
            label: "创建时间",
            prop: "createdAt",
            span: 8,
            row: true,
            addDisplay: false,
            editDisplay: false,
          },
        ]
      }
    };
  },
  computed: {},
  created() {
    this.onLoadRecord()
  },
  methods: {
    onLoad() {
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
      roomConfigPage(this.query).then(res => {
        const data = res.data.data;
        this.data = data.list;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    rowUpdate(row, index, done, loading) {
      roomConfigSave(row).then(() => {
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
      roomConfigSave(row).then(() => {
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
