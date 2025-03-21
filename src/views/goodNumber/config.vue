<template>
  <basic-container>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @search-change="searchChange"
             @current-change="currentChange"
             @refresh-change="onLoad"
             @search-reset="searchReset"
             @selection-change="selectionChange"
             @row-save="rowSave"
             @row-update="rowUpdate"
             @row-del="rowDel">
    <template slot="menuLeft">
      <el-button type="danger"
                 size="small"
                 icon="el-icon-setting"
                 plain
                 @click="changePrice">修改价格
      </el-button>
    </template>
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
    <el-dialog title="修改价格" append-to-body :visible.sync="visibleSend" width="40%">
      <settingConfigPrice ref="settingConfigPrice" :ids="ids" :visible="visibleSend" @onHandleSendSuccess="onHandleSendSuccess" />
    </el-dialog>
  </basic-container>
</template>

<script>

import {pageByGoodNumberConfig, saveConfig, updateConfig, deleteConfig} from "@/api/goodNumber/config";
import settingConfigPrice from "./settingConfigPrice";

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
  components:{
    settingConfigPrice
  },
  name: "wel",
  watch: {
    direction (value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      selectionList : [],
      visibleSend: false,
      ids: [],
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
        menuWidth: 150,
        selection: true,
        addBtn: true,
        delBtn: true,
        editBtn: true,
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
      pageByGoodNumberConfig(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
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
    rowSave(row, done, loading) {
      saveConfig(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done()
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateConfig(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done()
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return deleteConfig(row);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    searchReset() {
      this.search.priceStart = null
      this.search.priceEnd = null
      this.onLoad();
    },
    changePrice() {
      if (this.selectionList.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据!"
        });
        return
      }
      this.ids = [];
      this.selectionList.forEach((ele) => {
        this.ids.push(ele.id);
      });
      this.visibleSend = true;
    },
    onHandleSendSuccess() {
      this.visibleSend = false;
      this.onLoad();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
