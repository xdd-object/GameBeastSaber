<template>
  <basic-container>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @search-change="searchChange"
             @current-change="currentChange"
             @search-reset="searchReset"
             @row-dblclick="row2Click"
             @refresh-change="onLoad">
      <template slot="priceSearch">
        <div>
          <el-input-number
            :min="0"
            :max="99999999"
            :controls="false"
            :precision="0"
            v-model="search.priceStart"
            clearable
            placeholder="最小价格"
            style="width: 100px;"
          ></el-input-number>
          -
          <el-input-number
            :min="0"
            :max="99999999"
            :controls="false"
            :precision="0"
            v-model="search.priceEnd"
            clearable
            placeholder="最小价格"
            style="width: 100px;"
          ></el-input-number>
        </div>
      </template>
  </avue-crud>
  </basic-container>
</template>

<script>

import {pageByGoodNumberConfig} from "@/api/goodNumber/config";

const typeMap = {
  '1': '顺子号',
  '2': '豹子号',
  '3': '对子号',
  '4': '特殊号'
}

const deleteMap = {
  1: '已删除',
  0: '未删除'
}

export default {
  props:{
    selected_row:null,
  },
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {
        priceStart: null,
        priceEnd: null
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        configName: null,
        configCode: null,
        digits: null,
        priceStart: null,
        priceEnd: null,
      },
      data: [
      ],
      option: {
        searchShow: true,
        searchMenuSpan: 6,
        searchSpan:12,
        menuWidth: 150,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        menu: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 8,
            search: false,
            hide: true,
            row: false,
            display: false
          },
          {
            label: "靓号规则",
            prop: "configName",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            },
            dicData: [
              {
                label: '顺子号',
                value: '1',
              },
              {
                label: '豹子号',
                value: '2',
              },
              {
                label: '对子号',
                value: '3',
              },
              {
                label: '特殊号',
                value: '4',
              },
            ],
            rules: [{
              required: true,
              message: "请输入",
              trigger: "blur"
            }]
          },
          {
            label: "位数",
            prop: "digits",
            span: 14,
            search: true,
            row: true,
            type: 'select',
            dicData: [
              {
                label: '五位',
                value: '五位',
              },
              {
                label: '六位',
                value: '六位',
              },
              {
                label: '七位',
                value: '七位',
              },
              {
                label: '八位',
                value: '八位',
              },
            ],
            rules: [{
              required: true,
              message: "请输入",
              trigger: "blur"
            }]
          },
          {
            label: "规则编码",
            prop: "configCode",
            span: 14,
            search: true,
            row: true,
            rules: [{
              required: true,
              message: "请输入",
              trigger: "blur"
            }],
            editDisabled:true
          },
          {
            label: "价格",
            prop: "price",
            span: 24,
            search: true,
            slot: true,
            row: true,
            rules: [{
              required: true,
              message: "请输入",
              trigger: "blur"
            },{
              validator: function (rule, value, callback) {
                const age= /^\d*(\.\d{1,20})?$/
                if (!age.test(value)) {
                  callback(new Error('年龄只能为数字'))
                }else{
                  callback()
                }
              }
            }]
          },
          {
            label: "备注",
            prop: "remark",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "是否删除",
            prop: "isDelete",
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return deleteMap[value] ||'未知'; //
            },
            dicData: [
              {
                label: '已删除',
                value: 1,
              },
              {
                label: '未删除',
                value: 0,
              },
            ]
          },
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad() {
      this.loading = true;
      this.query.priceStart = this.search.priceStart
      this.query.priceEnd = this.search.priceEnd
      this.query.isDelete = 0
      pageByGoodNumberConfig(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    searchChange(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    currentChange(currentPage) {
      this.query.pageNum = currentPage;
    },
    searchReset() {
      this.search.priceStart = null
      this.search.priceEnd = null
      this.onLoad();
    },
    row2Click(row) {
      this.selected_row(row)
    }
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
