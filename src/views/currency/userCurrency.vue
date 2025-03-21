<template>
  <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord" :permission="permissionList"
    @current-change="searchPageRecord" @on-load="onLoad" @row-save="rowSave" @refresh-change="onLoad" />

</template>

<script>

import { pageUserCurrency, saveUserCurrency } from "@/api/currency/currency";
import dayjs from 'dayjs'
import { mapGetters } from "vuex";
import { currencyMap } from "@/const/currency/currency";
import { mapToOptions } from "@/util/common";
import { accountBookType } from "@/api/accountbook/accountbook";
import { add } from "@/api/desk/notice";

const numberTypeMap = {
  "ADD": '增加',
  "REDUCE": '减少',
}
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
      typeMap: {},
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: "用户id",
            prop: "memberId",
            type: "textarea",
            span: 8,
            search: true,
            row: true,
            rules: [
              {
                required: true,
                message: "请输入用户id",
                trigger: "blur"
              }
            ]
          },
          {
            label: "账本类型",
            prop: "type",
            type: 'select',
            formatter: (_row, value) => {
              return this.typeMap[value] || '未知'; //
            },
            hide: true,
            row: true,
            dicData: [{ label: 1, value: "1" }],
            rules: [
              {
                required: true,
                message: "请选择账本类型",
                trigger: "blur"
              }
            ],
          },
          {
            label: "变化类型",
            prop: "numberType",
            type: 'radio',
            hide: true,
            row: true,
            dicData: mapToOptions(numberTypeMap),
            rules: [
              {
                required: true,
                message: "请选择变化类型",
                trigger: "blur"
              }
            ],
          },
          {
            label: "资产类型",
            prop: "currencyId",
            type: 'select',
            search: true,
            formatter: (_row, value) => {
              return currencyMap[value] || '未知'; //
            },
            dicData: mapToOptions(currencyMap),
            row: true,
            rules: [
              {
                required: true,
                message: "请选择资产类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "余额",
            prop: "num",
            row: true,
            rules: [
              {
                required: true,
                message: "请输入金额",
                trigger: "blur"
              }
            ]
          },
          {
            label: "累积增加",
            prop: "addNum",
            addDisplay: false,
          },
          {
            label: "累积减少",
            prop: "reduceNum",
            addDisplay: false,
          },
          {
            label: "冻结数量",
            prop: "freezeNum",
            addDisplay: false,
          },
          // {
          //   label: "团队",
          //   prop: "teamId",
          //   row: true,
          //   type: "select",
          //   search: true,
          //   dicMethod: "post",
          //   props: {
          //     label: "teamName",
          //     value: "id"
          //   },
          //   dicUrl: "/api/blade-game-admin/admin/web/loan/team/listTeam",
          //   addDisplay:false,
          // },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.userCurrency_add, false),
      };
    },

  },
  created() {
    this.onLoadRecord()
    this.getTypeOptionFromApi()
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
      pageUserCurrency(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    getTypeOptionFromApi() {
      accountBookType().then(res => {
        this.typeMap = res.data.data
        this.option.column[1].dicData = mapToOptions(this.typeMap)
      });
    },
    rowSave(row, done, loading) {
      saveUserCurrency(row).then(res => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: res.data.msg
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
