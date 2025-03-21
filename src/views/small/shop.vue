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
        <el-button type="primary" @click="getpageShop">刷新列表</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="name" label="店铺名称" width="180">
      </el-table-column>
      <el-table-column prop="merchantId" label="商家ID" width="100">
      </el-table-column>
      <el-table-column prop="name" label="logo" width="180">
        <template slot-scope="scope">
          <img class="logo_image" :src="scope.row.logo" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isDisable" label="是否禁用" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isDisable == '0'">否</span>
          <span v-if="scope.row.isDisable == '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="店铺描述" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="服务电话" width="180">
      </el-table-column>
      <el-table-column prop="verifyStatus" label="审核结果" width="180">
      </el-table-column>
      <el-table-column prop="insertTime" label="入库时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="addOrUppdate(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isaddOrUppdate == 0 ? '新增店铺' : '修改店铺'"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家ID" :label-width="formLabelWidth">
          <el-select v-model="form.merchantId" placeholder="请选择商家">
            <el-option
              v-for="item in merchantList"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo" :label-width="formLabelWidth">
          <!-- <el-upload
            action="https://ydnoms.zhilianmanbu.com/admin/aliyun/oss/multiFileUpload"
            list-type="picture"
            :multiple="false"
            :show-file-list="showFileList"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            accept=".jpg,.png,.jpeg,.gif"
            :on-preview="handlePreview"
            limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div style="color: red" slot="tip" class="el-upload__tip">
              提醒：请上传jpg,png,jpeg,gif图片
            </div>
          </el-upload> -->
          <el-upload action="/api/blade-game-admin/aliyun/oss/multiFileUpload" list-type="picture" :multiple="true"
                :show-file-list="true" :file-list="fileList" :on-success="handleUploadSuccess" :on-remove="onRemove"
                accept=".jpg,.png,.jpeg,.gif" :on-preview="handlePreview"  limit="1"  :headers="{
    'Blade-Auth': upploadToken
  }">
                <el-button size="small" type="primary">点击上传</el-button>
                <div style="color: red" slot="tip" class="el-upload__tip">
                  提醒：请上传jpg,png,jpeg,gif图片
                </div>
              </el-upload>
        </el-form-item>
        <el-form-item label="是否禁用" :label-width="formLabelWidth">
          <el-radio-group v-model="form.isDisable">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="店铺描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务电话" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否进行线下实体销售"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.isOfflineStore">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div :style="{ fontSize: '20px', fontWeight: 800 }">线下取货地址</div>
          <div>
            营业开始时间
            <el-time-picker
              v-model="form.productOfflineStore.businessStartTime"
              :editable="false"
              placeholder="营业开始时间"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </div>
          <div>
            营业关门时间
            <el-time-picker
              v-model="form.productOfflineStore.businessEndTime"
              :editable="false"
              placeholder="营业关门时间"
              value-format="HH:mm:ss"
            >
            </el-time-picker>
          </div>
          <div>
            地址 省编码<el-input
              v-model="form.productOfflineStore.provinceCode"
              type="number"
            ></el-input>
          </div>
          <div>
            省名称<el-input
              v-model="form.productOfflineStore.provinceName"
            ></el-input>
          </div>
          <div>
            地址 市编码<el-input
              v-model="form.productOfflineStore.cityCode"
              type="number"
            ></el-input>
          </div>
          <div>
            市名称<el-input
              v-model="form.productOfflineStore.cityName"
            ></el-input>
          </div>
          <div>
            区编码<el-input
              v-model="form.productOfflineStore.districtCode"
              type="number"
            ></el-input>
          </div>
          <div>
            区名称<el-input
              v-model="form.productOfflineStore.districtName"
            ></el-input>
          </div>
          <div>
            详细地址<el-input
              v-model="form.productOfflineStore.detailAddress"
            ></el-input>
          </div>
          <div>
            联系电话<el-input
              v-model="form.productOfflineStore.phone"
              type="number"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getsaveShop">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      style="margin: 50px"
      background
      layout="prev, pager, next"
      :total="pageTotal"
      :current-page="query.pageNum"
      @current-change="currentChange"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { pageShop, saveShop, query, update } from "@/api/small/shop";
import { listMerchant } from "@/api/small/business";
import { getToken } from '@/util/auth';

export default {
  name: "wel",
  data() {
    return {
      upploadToken: 'bearer ' + getToken(),
      tableData: [],
      dialogFormVisible: false,
      isaddOrUppdate: 0,
      pageTotal: 0,
      query: {
        type: "",
        date: "",
        pageNum: 1,
        pageSize: 10,
      },
      form: {
        id: "1",
        name: "",
        merchantId: "",
        isDisable: "",
        verifyStatus: "2",
        logo: "",
        description: "",
        phone: "",
        isOfflineStore: "",
        productOfflineStore: {
          businessStartTime: "",
          businessEndTime: "",
          provinceCode: "",
          provinceName: "",
          cityCode: "",
          cityName: "",
          districtCode: "",
          districtName: "",
          detailAddress: "",
          phone: "",
        },
      },
      merchantList: [],
      inputId: "",
      loading: false,
      fileList:[]
    };
  },
  computed: {},
  mounted() {
    this.getpageShop();
    this.getlistMerchant();
  },
  created() {},
  methods: {
      // 上传图片
      handleUploadSuccess(res, file, fileList) {
      this.fileList = fileList
      this.imgArr = fileList
      this.skuStockList = this.skuStockList.map((item) => {
        item.pic = file.response.data[0];
        return item;
      });
    },
    onRemove(file, fileList) {
      console.log(file, fileList, '移除');
      this.fileList = fileList
      this.imgArr = fileList
    },
    // 店铺列表
    async getpageShop() {
      this.loading = true;
      const result = await pageShop(this.query);
      this.tableData = result.data.data.records;
      this.pageTotal = result.data.data.total;
      this.loading = false;
    },
    // 页码变化
    currentChange(e) {
      this.query.pageNum = e;
      this.getpageShop();
    },
    // 判断新增or修改
    addOrUppdate(row) {
      if (row == 0) {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 0;
        this.form = {
          id: "1",
          name: "",
          merchantId: "",
          isDisable: "",
          verifyStatus: "2",
          logo: "",
          description: "",
          phone: "",
          isOfflineStore: "",
          productOfflineStore: {
            businessStartTime: "",
            businessEndTime: "",
            provinceCode: "",
            provinceName: "",
            cityCode: "",
            cityName: "",
            districtCode: "",
            districtName: "",
            detailAddress: "",
            phone: "",
          },
        };
      } else {
        this.dialogFormVisible = true;
        this.isaddOrUppdate = 1;
        if (row.productOfflineStore) {
          this.form = row;
        } else {
          this.form = {
            ...row,
            isOfflineStore: 0,
            productOfflineStore: {
              businessStartTime: "",
              businessEndTime: "",
              provinceCode: "",
              provinceName: "",
              cityCode: "",
              cityName: "",
              districtCode: "",
              districtName: "",
              detailAddress: "",
              phone: "",
            },
          };
        }
      }
      console.log(row, "row");
    },
    //根据id查询店铺
    async getquery() {
      if (!this.inputId) {
        this.$message.error("请输入需要查询的id");
      } else {
        this.loading = true;
        try {
          const result = await query({ id: this.inputId });
          this.loading = false;
          if (result.data.code == 200) {
            this.$message({
              message: "查询成功",
              type: "success",
            });
          }
          this.tableData = [result.data.data];
        } catch (error) {
          this.loading = false;
        }
      }
    },
    // 清空搜索
    clearsearch() {
      this.inputId = "";
      this.query.pageNum = 1;
      this.getpageShop();
      this.getlistMerchant();
    },
    // 上传logo
    handleUploadSuccess(res, file) {
      console.log("file=》", file.response.data[0]);
      this.form.logo = file.response.data[0];
    },
    //新增店铺选择商家
    async getlistMerchant() {
      const result = await listMerchant();
      if (result.data.code == 200) {
        this.merchantList = result.data.data;
      } else {
        this.$message.error(result.data.msg);
      }
    },
    // 新增or修改店铺
    async getsaveShop() {
      let result;
      if (this.isaddOrUppdate == 0) {
        this.loading = true;
        result = await saveShop(this.form);
        this.loading = false;
        if (result.data.code == 200) {
          this.dialogFormVisible = false;
          this.getpageShop();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(result.data.msg);
        }
      } else {
        this.loading = true;
        const result = await update(this.form);
        this.loading = false;
        if (result.data.code == 200) {
          this.dialogFormVisible = false;
          this.getpageShop();
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
