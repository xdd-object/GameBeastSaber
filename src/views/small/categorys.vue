<template>
  <el-card class="box-card">
    <el-row gutter="40">
      <el-col :span="4"
        ><div class="search_input">
          <span>ID:</span
          ><el-input v-model="inputId" placeholder="请输入ID"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getquery">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="clearsearch">清空</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="addOrUppdate(0)">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getpageCategory">刷新列表</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="100"> </el-table-column>
      <el-table-column prop="parentId" label="上级ID" width="80">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="120"> </el-table-column>
      <el-table-column prop="icon" label="图标" width="180">
        <template slot-scope="scope">
          <img class="logo_image" :src="scope.row.icon" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="navStatus" label="显示导航栏" width="180">
      </el-table-column>
      <el-table-column prop="navStatus" label="显示状态" width="180">
      </el-table-column>
      <el-table-column prop="insertTime" label="入库时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="addOrUppdate(scope.row)"
            >修改</el-button
          >
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="再想想"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="removecategorys(scope.row)"
            >
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isaddOrUppdate==0?'新增类别':'修改类别'"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form :model="form" label-position="right">
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          size="small"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            width="100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级ID" :label-width="formLabelWidth">
          <el-select v-model="form.parentId" placeholder="请选择上级ID">
            <el-option
              v-for="item in parentIdList"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" >
          <el-input v-model="form.sort" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="icon" :label-width="formLabelWidth">
          <el-upload
            action="/api/blade-game-admin/aliyun/oss/multiFileUpload"
            list-type="picture"
            :multiple="false"
            :show-file-list="showFileList"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            accept=".jpg,.png,.jpeg,.gif"
            :on-preview="handlePreview"
            limit="1"
            :headers="{
                    'Blade-Auth': upploadToken
                }"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div style="color: red" slot="tip" class="el-upload__tip">
              提醒：请上传jpg,png,jpeg,gif图片
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="显示状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.showStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否显示导航栏" :label-width="formLabelWidth">
          <el-radio-group v-model="form.navStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getsaveShop">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  pageCategory,
  saveOrUpdate,
  categoryDelete,
  query,
  reqparentIdList,
} from "@/api/small/category";
import { getToken } from '@/util/auth';

export default {
  name: "wel",
  data() {
    return {
      upploadToken: 'bearer ' + getToken(),
      tableData: [],
      dialogFormVisible: false,
      isaddOrUppdate: 0,
      query: {
        type: "",
        date: "",
        pageNum: 1,
        pageSize: 10,
        parentId: "0",
      },
      form: {
        id: "",
        name: "",
        level: "",
        parentId: "",
        sort: "",
        icon: "",
        navStatus: "",
        showStatus: "0",
        description: "",
        insertTime: "",
      },
      merchantList: [],
      inputId: "",
      loading: false,
      parentIdList: [],
    };
  },
  computed: {},
  mounted() {
    this.getpageCategory();
    this.getparentIdList();
  },
  methods: {
    //分页查询分类
    async getpageCategory() {
      this.loading = true;
      const result = await pageCategory(this.query);
      this.tableData = result.data.data.records;
      this.loading = false;
    },
    // 查询parentId列表
    async getparentIdList() {
      const result = await reqparentIdList();
      this.parentIdList = [{ id: "0", name: "第一级，无上级" }, ...result.data.data];
    },
    // 判断新增or修改
    addOrUppdate(row) {
      if (row == 0) {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 0;
        this.form = {
          id: "",
          name: "",
          level: "",
          parentId: "",
          sort: "",
          icon: "",
          navStatus: "",
          showStatus: "0",
          description: "",
          insertTime: "",
        };
      } else {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 1;
        this.form = row;
      }
    },
    //删除分类
    async removecategorys(row) {
      const result = await categoryDelete({ id: row.id });
      if (result.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getpageCategory();
        this.getparentIdList();
      }
    },
    //根据id查询分类
    async getquery() {
      if (!this.inputId) {
        this.$message.error("请输入需要查询的id");
      } else {
        this.loading = true;
        const result = await query({ id: this.inputId });
        if (result.data.code == 200) {
          this.loading = false;
          this.$message({
            message: "查询成功",
            type: "success",
          });
        }
        this.tableData = [result.data.data];
      }
    },
    // 清空搜索
    clearsearch() {
      this.inputId = "";
      this.getpageCategory();
    },
    // 上传logo
    handleUploadSuccess(res, file) {
      console.log("file=》", file.response);
      this.form.icon = file.response.data[0];
    },

    // 新增or修改分类
    async getsaveShop() {
      let result;
      if (this.isaddOrUppdate == 0) {
        result = await saveOrUpdate(this.form);
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
        const result = await saveOrUpdate(this.form);
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
