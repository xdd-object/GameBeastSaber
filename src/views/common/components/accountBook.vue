<template>
  <avue-crud :option="option"
             :table-loading="loading"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import { accountBookLog,accountBookType } from "@/api/accountbook/accountbook";
import {currencyMap} from "@/const/currency/currency";
import { mapToOptions } from "@/util/common";
import { numberMap } from "@/const/accountbook/accountbook";
import dayjs from "dayjs";

export default {
  name: "wel",
  props: {
    types: {
      type: Array,
    },
    currencyIds: {
      type: Array,
    },
    typeDisplay: {
      type: Boolean,
      default: false,
    },
    currencyDisplay: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return{
      page: {
        total: 0
      },
      loading: true,
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
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: false,
        column: [
          {
            label: "账本类型",
            prop: "types",
            type: "select",
            search: true,
            searchMultiple: true,
            hide: true,
            dicData: []
          },
          {
            label: "资产类型",
            prop: "currencyId",
            type: 'select',
            // search: true,
            formatter: (_row, value)=> {
              return currencyMap[value] ||'未知'; //
            },
            dicData: mapToOptions(currencyMap),
          },
          {
            label: "资产类型",
            prop: "currencyIds",
            type: 'select',
            searchOrder: 99,
            search: true,
            formatter: (_row, value)=> {
              return currencyMap[value] ||'未知'; //
            },
            searchMultiple: true,
            dicData: mapToOptions(currencyMap),
            hide: true,
          },
          {
            label: "月份",
            prop: "month",
            search: true,
            hide: true,
            type: "month",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            pinkerOptions: {
              disableDate(time){
                return time.getTime() < Date.now();
              }
            }
          },
          {
            label: "分表",
            prop: "tableIndex",
            search: true,
            hide: true,
            type: "number",
            min: 0,
            max: 10,
            rule: {
              required: true,
              message: "请输入分表序号",
              trigger: "blur"
            }
          },
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            search: true,
            searchOrder: 100,
            row: true
          },
          {
            label: "账本描述",
            prop: "content"
          },
          {
            label: "收支类型",
            prop: "numberType",
            search: true,
            type: 'select',
            formatter: (_row, value) => {
              return numberMap[value] || '未知'
            },
            dicData: mapToOptions(numberMap),
          },
          {
            label: "变动前数量",
            prop: "current"
          },
          {
            label: "变动数量",
            prop: "number"
          },
          {
            label: "变动后数量",
            prop: "after"
          },
          {
            label: "手续费",
            prop: "fee"
          },
          {
            label: "目标用户",
            prop: "toMemberId"
          },
          {
            label: "添加时间",
            prop: "addTime",
            formatter: (_row, value)=> {
              return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
            },
          },
          {
            label: "备注",
            prop: "adRemark",
            overHidden: true,
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
          // },
        ]
      }
    }
  },
  computed: {},
  created() {
    if (this.types&&this.types.length>0) {
      this.query.types = this.types;
    }
    if (this.currencyIds&&this.currencyIds.length>0) {
      this.query.currencyIds = this.currencyIds;
    }
    this.getTypeOptionFromApi()
    // this.onLoadRecord();
  },
  methods: {
    onLoad(page, params = {}){
      this.onLoadRecord(params);
    },
    searchRecord(params, done){
      if (!params.currencyIds||params.currencyIds.length<=0) {
        params.currencyIds = this.currencyIds
      }
      if (!params.types||params.types.length<=0) {
        params.types = this.types
      }
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    searchPageRecord(currentPage,done){
      this.query.pageNum = currentPage;
      this.onLoadRecord();
      done();
    },
    onLoadRecord(){
      this.loading = true;
      accountBookLog(this.query).then(res =>{
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      })
    },
    handled(arr, oriArr) {
      var res = {};
      arr.forEach(a=>{
        if(oriArr[a.toString()]) {
          res[a]=oriArr[a.toString()]
        }
      })
      return res;
    },
    getTypeOptionFromApi(){
      accountBookType().then(res => {
        this.typeMap = res.data.data
        this.option.column[0].dicData.push(...mapToOptions(res.data.data))
        if (this.types&&this.types.length>0) {
          this.option.column[0].dicData=mapToOptions(this.handled(this.types, this.typeMap));
        }
      });
      if (this.currencyIds&&this.currencyIds.length>0) {
        this.option.column[2].dicData=mapToOptions(this.handled(this.currencyIds, currencyMap));
      }

      if (this.typeDisplay) {
        this.option.column[0].search=false;
      }
      if (this.currencyDisplay) {
        this.option.column[2].search=false;
      }
    }
  }
}
</script>
