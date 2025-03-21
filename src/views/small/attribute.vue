<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="属性分组列表" name="first">
      <el-card class="box-card">
        <el-row gutter="40">
          <el-col :span="4">
            <el-button type="primary" @click="addOrUppdate(0)">新增属性分组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getpageCategory">刷新列表</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%" row-key="id" default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-loading="loading">
          <el-table-column prop="id" label="ID" width="180"> </el-table-column>
          <el-table-column prop="name" label="属性名称"> </el-table-column>
          <el-table-column prop="attributeCount" label="规格数量" width="180">
          </el-table-column>
          <el-table-column prop="paramCount" label="参数数量" width="180">
          </el-table-column>

          <el-table-column prop="insertTime" label="创建时间">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="addOrUppdate(scope.row)">修改</el-button>
              <el-button type="primary" @click="toattributechildren(scope.row)">查看属性列表</el-button>
              <el-popconfirm confirm-button-text="确定" cancel-button-text="再想想" icon="el-icon-info" icon-color="red"
                title="确定删除吗？" @confirm="getdeleteCategory(scope.row)">
                <el-button slot="reference" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :title="isaddOrUppdate == 0 ? '新增属性分组' : '修改属性分组'" :visible.sync="dialogFormVisible"
          :append-to-body="true">
          <el-form :model="form" label-position="right">
            <el-form-item label="商家ID" :label-width="formLabelWidth">
              <el-select v-model="form.merchantId" placeholder="请选择商家">
                <el-option v-for="item in merchantList" :label="item.nickname" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="属性分组名称" :label-width="formLabelWidth" size="small" label-width="100px">
              <el-input v-model="form.name" autocomplete="off" style="width: 40%"></el-input>
            </el-form-item>

            <el-form-item label="规格数量" label-width="100px">
              <el-input v-model="form.attributeCount" autocomplete="off" style="width: 40%" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="getsaveShop">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="属性列表" name="second" v-if="activeName == 'second'">
      <el-card class="box-card">
        <el-row gutter="40">
          <el-col :span="8">
            <el-button @click="activeName = 'first'">返回</el-button>
            <el-button type="primary" @click="attributeAddOrUppdate(0)">新增</el-button>
            <el-button type="primary" @click="getAttributeList">刷新列表</el-button>
          </el-col>
        </el-row>
        <el-table :data="goodsAttributeList" style="width: 100%" row-key="id" default-expand-all v-loading="loading">
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="分类名称"> </el-table-column>
          <el-table-column label="属性选择类型">
            <template slot-scope="scope">
              <span v-if="scope.row.selectType == 0">唯一</span>
              <span v-if="scope.row.selectType == 1">单选</span>
              <span v-if="scope.row.selectType == 2">多选</span>
            </template>
          </el-table-column>
          <el-table-column label="属性录入方式">
            <template slot-scope="scope">
              <span v-if="scope.row.inputType == 0">手工录入</span>
              <span v-if="scope.row.inputType == 1">从列表中选取</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>

          <el-table-column prop="insertTime" label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="attributeAddOrUppdate(scope.row)">修改</el-button>
              <el-popconfirm confirm-button-text="确定" cancel-button-text="再想想" icon="el-icon-info" icon-color="red"
                title="确定删除吗？" @confirm="getdeletes(scope.row)">
                <el-button type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :title="isaddOrUppdate2 == 0 ? '新增属性' : '修改属性'" :visible.sync="dialogFormVisible2"
          :append-to-body="true">
          <el-form :model="form2" label-position="right">
            <el-form-item label="属性名称" :label-width="formLabelWidth" size="small">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="选择所属分类" :label-width="formLabelWidth">
              <el-select v-model="form2.type" placeholder="请选择选择所属分类">
                <el-option v-for="item in parentIdList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="属性选择类型" :label-width="formLabelWidth">
              <el-radio-group v-model="form2.selectType">
                <el-radio label="0">唯一</el-radio>
                <el-radio label="1">单选</el-radio>
                <el-radio label="2">多选</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth" size="small">
              <el-input v-model="form2.sort" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="属性录入方式" :label-width="formLabelWidth">
              <el-radio-group v-model="form2.inputType">
                <el-radio label="0">手工录入</el-radio>
                <el-radio label="1">从列表中选取</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持手动新增" :label-width="formLabelWidth">
              <el-radio-group v-model="form2.handAddStatus">
                <el-radio label="0">不支持</el-radio>
                <el-radio label="1">支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="getsaveOrUpdate">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-tab-pane>
    <el-pagination style="margin: 50px" background layout="prev, pager, next,sizes" :total="pageTotal"
      :current-page="query.pageNum" :page-size="query.pageSize" @current-change="currentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </el-tabs>
</template>

<script>
import {
  categoryList,
  saveOrUpdateCategory,
  deleteCategory,
  list,
  deletes,
  saveOrUpdate,
} from "@/api/small/attribute";
import { reqparentIdList } from "@/api/small/category";
import { listMerchant } from "@/api/small/business";

export default {
  name: "wel",
  data() {
    return {
      tableData: [],
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      isaddOrUppdate: 0,
      isaddOrUppdate2: 0,
      query: {
        merchantId: "2",
        pageNum: 1,
        pageSize: 10,
      },
      form: {},
      form2: {},
      merchantList: [],
      inputId: "",
      loading: false,
      goodsAttributeList: [],
      parentIdList: [],
      groupingId: "",
      pageTotal:0
      
    };
  },
  computed: {},
  mounted() {
    this.getpageCategory();
    this.getlistMerchant();
  },
  methods: {
    //新增属性分组选择商家
    async getlistMerchant() {
      const result = await listMerchant();
      if (result.data.code == 200) {
        this.merchantList = result.data.data;
      } else {
        this.$message.error(result.data.msg);
      }
    },
    //查询属性分组
    async getpageCategory() {
      this.loading = true;
      const result = await categoryList(this.query);
      this.tableData = result.data.data.records;
      this.pageTotal=result.data.data.total

      this.loading = false;
    },
     // 页码变化
     currentChange(e) {
            this.query.pageNum = e;
            this.getpageCategory();
        },
        // 每页条数变化
        handleSizeChange(e) {
            this.query.pageSize = e;
            this.getpageCategory();
        },
    // 判断属性分组新增or修改
    addOrUppdate(row) {
      if (row == 0) {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 0;
        this.form = {
          id: "",
          merchantId: "",
          userAppId: "",
          name: "",
          attributeCount: "",
          paramCount: "",
          insertTime: "",
          updateTime: "",
        };
      } else {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 1;
        this.form = row;
      }
    },
    // 新增or修改属性分组
    async getsaveShop() {
      let result;
      if (this.isaddOrUppdate == 0) {
        result = await saveOrUpdateCategory(this.form);
        if (result.data.code == 200) {
          this.dialogFormVisible = false;
          this.getpageCategory();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(result.data.msg);
        }
      } else {
        const result = await saveOrUpdateCategory(this.form);
        if (result.data.code == 200) {
          this.dialogFormVisible = false;
          this.getpageCategory();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(result.data.msg);
        }
      }
    },
    // 删除属性分组
    async getdeleteCategory(row) {
      const result = await deleteCategory({ id: row.id });
      if (result.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getpageCategory();
      } else {
        this.$message.error(result.data.msg);
      }
    },

    // 跳转至属性列表
    toattributechildren(row) {
      this.activeName = "second";
      this.groupingId = row.id;
      this.getAttributeList();
      this.getparentIdList();
    },

    //查询属性列表
    async getAttributeList() {
      const result = await list({
        id: this.groupingId,
        pageNum: 1,
        pageSize: 10,
      });
      if (result.data.code == 200) {
        this.goodsAttributeList = result.data.data.records;
      } else {
        this.$message.error(result.data.msg);
      }
    },
    // 判断属性新增or修改
    attributeAddOrUppdate(row) {
      console.log(row, "8989");
      let that = this;
      if (row == 0) {
        this.dialogFormVisible2 = true;
        this.isaddOrUppdate2 = 0;
        this.form2 = {
          type: "",
          productAttributeCategoryId: that.groupingId,
          name: "",
          selectType: "",
          sort: "",
          inputType: "",
          handAddStatus: "",
        };
      } else {
        this.dialogFormVisible2 = true;
        this.isaddOrUppdate2 = 1;
        this.form2 = row;
      }
    },
    // 新增or修改属性
    async getsaveOrUpdate() {
      let result;
      if (this.isaddOrUppdate2 == 0) {
        result = await saveOrUpdate(this.form2);
        if (result.data.code == 200) {
          this.dialogFormVisible2 = false;
          this.getAttributeList();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        } else {
          this.$message.error(result.data.msg);
        }
      } else {
        const result = await saveOrUpdate(this.form2);
        if (result.data.code == 200) {
          this.dialogFormVisible2 = false;
          this.getAttributeList();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(result.data.msg);
        }
      }
    },
    // 删除属性
    async getdeletes(row) {
      const result = await deletes({ ids: [row.id] });
      if (result.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getAttributeList();
      } else {
        this.$message.error(result.data.msg);
      }
    },
    // 查询parentId列表
    async getparentIdList() {
      const result = await reqparentIdList();
      this.parentIdList = [...result.data.data];
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.search_input {
  display: flex;
  align-items: center;
}

.logo_image {
  width: 60px;
  height: 60px;
}
</style>
