<template>
  <basic-container>
    <el-drawer
      title=""
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      append-to-body
      >
      <goodNumberItem ref="goodNumberItem" :selected_row="selected_row_config" />
    </el-drawer>
    <avue-crud :option="option"
               :page.sync="page"
               :data="data"
               v-model="form"
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
            style="width: 80px;"
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
            style="width: 80px;"
          ></el-input-number>
        </div>
      </template>
      <template slot="configNameSearch">
        <avue-select
          v-model="selectFrom.configName"
          placeholder="请选择"
          :dic="typeData"
          @change="handleConfigName"
        ></avue-select>
      </template>
      <template slot="digitsSearch">
        <avue-select
          v-model="selectFrom.digits"
          placeholder="请选择"
          :dic="digitsData"
          @change="handleDigits"
        ></avue-select>
      </template>
      <template slot="configCodeSearch">
        <avue-select
          v-model="search.configCode"
          placeholder="请选择"
          :dic="configCodeData"
        ></avue-select>
      </template>
    </avue-crud>
    <el-dialog title="修改价格" append-to-body :visible.sync="visibleSend" width="40%">
      <settingPrice ref="settingPrice" :ids="ids" :visible="visibleSend" @onHandleSendSuccess="onHandleSendSuccess" />
    </el-dialog>
  </basic-container>
</template>

<script>

import {pageByGoodNumber, saveGoodNumber, updateGoodNumber, deleteGoodNumber} from "@/api/goodNumber/goodNumber";
import {selectConfigList} from "@/api/goodNumber/config"
import goodNumberItem from "./goodNumberItem"
import settingPrice from "./settingPrice";

const typeMap = {
  '1': '顺子号',
  '2': '豹子号',
  '3': '对子号',
  '4': '特殊号'
}

/*const digitsMap = {
  '五位': '五位',
  '六位': '六位',
  '七位': '七位',
  '八位': '八位'
}*/

const deleteMap = {
  1: '已删除',
  0: '未删除'
}

const statusMap = {
  1: '待出售',
  2: '已下单',
  3: '已支付'
}

const priorityMap = {
  1: '推荐',
  2: '不推荐'
}

export default {
  components:{
    goodNumberItem,
    settingPrice
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
      form: {},
      configCodeData : [],
      typeData : [
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
      digitsData : [
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
      selectFrom : {
        digits : null,
        configName : null
      },
      drawer: false,
      direction: 'rtl',
      page: {
        total: 10
      },
      search: {
        priceStart: null,
        priceEnd: null,
        configCode:null
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
        addBtn: true,
        delBtn: true,
        editBtn: true,
        selection: true,
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
            label: "靓号号码",
            prop: "goodNumber",
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
            label: "靓号规则",
            prop: "configName",
            search: true,
            span: 8,
            row: true,
            type: 'select',
            disabled: true,
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
            }],
          },
          {
            label: "位数",
            prop: "digits",
            span: 14,
            search: true,
            row: true,
            disabled: true,
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
            }],
          },
          {
            label: "规则编码",
            prop: "configCode",
            span: 14,
            search: true,
            row: true,
            slot: true,
            type: 'input',
            disabled: true,
            append:'选择',
            rules: [{
              required: true,
              message: "请输入",
              trigger: "blur"
            }],
            appendClick:()=>{
              this.drawer = true;
            },
          },
          {
            label: "价格",
            prop: "price",
            span: 8,
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
            label: "状态",
            prop: "status",
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return statusMap[value] ||'未知'; //
            },
            dicData: [
              {
                label: '待出售',
                value: 1,
              },
              {
                label: '已下单',
                value: 2,
              },
              {
                label: '已支付',
                value: 3,
              },
            ]
          },
          {
            label: "是否推荐",
            prop: "isPriority",
            span: 8,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return priorityMap[value] ||'未知'; //
            },
            dicData: [
              {
                label: '推荐',
                value: 1,
              },
              {
                label: '不推荐',
                value: 2,
              },
            ]
          },
          {
            label: "推荐优先级",
            prop: "priority",
            span: 8,
            row: true
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
      this.query.configCode = this.search.configCode
      this.query.digits = this.selectFrom.digits
      this.query.configName = this.selectFrom.configName
      pageByGoodNumber(this.query).then(res => {
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
    async handleConfigName(d) {
      let value = d.value
      if (value !== this.selectFrom.configName) {
        this.search.configCode = ""
      }
      this.selectFrom.configName = value
      if(value.length === 0){
        return
      }
      let row = {}
      row.configName = this.selectFrom.configName
      row.digits = this.selectFrom.digits
      let res = await selectConfigList(row);
      let selectData = Array.from(res.data.data)
      selectData.forEach((item, index) => {
        selectData[index].label = item.configCode;
        selectData[index].value = item.configCode;
      });
      this.configCodeData = selectData;
    },
    async handleDigits(d) {
      let value = d.value
      if (value !== this.selectFrom.digits) {
        this.search.configCode = ""
      }
      this.selectFrom.digits = value
      if(value.length === 0){
        return
      }
      let row = {}
      row.configName = this.selectFrom.configName
      row.digits = this.selectFrom.digits
      let res = await selectConfigList(row);
      let selectData = Array.from(res.data.data)
      selectData.forEach((item, index) => {
        selectData[index].label = item.configCode;
        selectData[index].value = item.configCode;
      });
      this.configCodeData = selectData;
    },
    rowSave(row, done, loading) {
      saveGoodNumber(row).then(() => {
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
      updateGoodNumber(row).then(() => {
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
          return deleteGoodNumber(row);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    searchReset() {
      this.search.priceStart = null
      this.search.priceEnd = null
      this.onLoad();
    },
    selected_row_config(row) {
      if(row != null) {
        this.form.configName = row.configName;
        this.form.configCode = row.configCode;
        this.form.digits = row.digits;
        this.form.price = row.price;
      }
      this.drawer = false;
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
