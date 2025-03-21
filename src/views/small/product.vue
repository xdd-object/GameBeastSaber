<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="商品管理" name="first">
      <basic-container>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="addOrUppdate(0)">添加商品</el-button>
            <el-button type="primary" @click="getpageProduct">刷新列表</el-button>
            <el-select v-model="query.shopId" filterable placeholder="请选择店铺进行筛选" style="margin-left: 20px"
              @change="changeFilterShopdata">
              <el-option v-for="item in flitershopData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="query.payment" filterable placeholder="请选择支付方式进行筛选" style="margin-left: 20px"
              @change="changeFilterShopdata">
              <el-option label="ZCoin" value="YUNDOU"> </el-option>
              <el-option label="精灵石" value="JINDOU"> </el-option>
            </el-select>
            <el-button @click="clearList">清空</el-button>
          </el-col>
        </el-row>
        <el-table :data="tabData" style="width: 100%" row-key="id" default-expand-all v-loading="loading">
          <el-table-column prop="id" label="商品ID" width="80">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="260">
          </el-table-column>
          <el-table-column prop="pic" label="图片" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.pic.split(',')[0]">
                <img style="width: 50px" :src="scope.row.pic.split(',')[0]" alt="" />
              </p>
              <p v-else>
                <img style="width: 50px" :src="scope.row.pic" alt="" />

              </p>
            </template>
          </el-table-column>
          <el-table-column prop="shopName" label="店铺名称" width="140">
          </el-table-column>
          <el-table-column prop="sale" label="销量" width="100">
          </el-table-column>
          <el-table-column prop="verifyStatus" label="审核状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.verifyStatus == '1'">未审核</span>
              <span v-if="scope.row.verifyStatus == '2'">审核通过</span>
              <span v-if="scope.row.verifyStatus == '3'">审核失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="access" label="获取方式" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.access == 1">实物商品（物流发货）</span>
              <span v-if="scope.row.access == 2">线下核销（无需物流）</span>
              <span v-if="scope.row.access == 3">特殊商品</span>
            </template>
          </el-table-column>
          <el-table-column prop="payment" label="支付方式" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.payment == 'YUNDOU'">ZCoin</span>
              <span v-if="scope.row.payment == 'JINDOU'">精灵石</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="上架状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '0'">下架</span>
              <span v-if="scope.row.status == '1'">上架</span>
              <span v-if="scope.row.status == '2'">禁售</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="商品排序" width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="addOrUppdate(scope.row)">修改</el-button>
              <el-button type="primary" v-if="scope.row.status != '2'" @click="getchangeStatus(scope.row)">
                <span v-if="scope.row.status == '0'">上架</span>
                <span v-if="scope.row.status == '1'">下架</span>
              </el-button>
              <el-button type="primary" @click="getskuList(scope.row)">SKU详情</el-button>
              <el-button type="primary" @click="getGoodsDetail(scope.row)">商品详情</el-button>
              <el-popconfirm confirm-button-text="确定" cancel-button-text="再想想" icon="el-icon-info" icon-color="red"
                title="确定删除吗？" @confirm="getdeleteProduct(scope.row)">
                <el-button type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin: 50px" background layout="prev, pager, next" :total="pageTotal"
          :current-page="query.pageNum" @current-change="currentChange">
        </el-pagination>
        <el-dialog :title="isaddOrUppdate == 0 ? '添加商品' : '修改商品'" :visible.sync="dialogVisible" width="60%"
          :close-on-click-modal="false" append-to-body>
          <el-form ref="form" :model="form">
            <el-form-item>
              <div style="display: flex;justify-content: space-between;">
                <span>店铺ID</span>
                <el-select v-model="form.shopId" placeholder="请选择店铺" style="width: 150px;">
                  <el-option v-for="item in shopData" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                <span>商家ID</span>
                <el-select v-model="form.productCategoryId" placeholder="请选择类别" style="width: 150px;">
                  <el-option v-for="item in categorysData" :label="item.name" :value="item.id"
                    :key="item.id"></el-option>
                </el-select>
                <span>商品名称</span>
                <el-input v-model="form.name" style="width: 150px;"></el-input>
                <span style="margin-right: 20px;">单位</span>
                <el-input v-model="form.unit" style="width: 150px;"></el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item label="商家ID" :label-width="formLabelWidth">
              <el-select v-model="form.merchantId" placeholder="请选择商家">
                <el-option v-for="item in merchantList" :label="item.nickname" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="商品分类id">
              <el-select v-model="form.productCategoryId" placeholder="请选择类别">
                <el-option v-for="item in categorysData" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="属性分组id">
              <el-select v-model="form.productAttributeCategoryId" placeholder="请选择属性分组">
                <el-option v-for="item in attributeData" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item>
              <div style="display: flex;justify-content: space-between;">
                <span>原价</span>
                <el-input v-model="form.price" type="number" style="width: 150px;"></el-input>
                <span>实际价格</span>
                <el-input v-model="form.curPrice" type="number" style="width: 150px;"></el-input>
                <span>运费</span>
                <el-input v-model="form.freight" type="number" style="width: 150px;"></el-input>
                <span>进货价</span>
                <el-input v-model="form.purchasePrice" type="number" style="width: 150px;"></el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item label="实际价格">
              <el-input v-model="form.curPrice" type="number"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="运费">
              <el-input v-model="form.freight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="form.unit"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="排序">
              <el-input v-model="form.sort" type="number"></el-input>
            </el-form-item> -->
            <el-form-item>
              <span>排序</span>
              <el-input v-model="form.sort" type="number" style="width: 150px;"></el-input>
              <span style="margin-left: 80px;">获取方式</span>
              <el-radio-group v-model="form.access" style="margin-left: 20px;">
                <el-radio :label="1">实物商品</el-radio>
                <el-radio :label="2" v-if="isCanSellOffline">线下核销</el-radio>
                <el-radio :label="3">特殊商品</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="图片">
              <el-upload action="/api/blade-game-admin/aliyun/oss/multiFileUpload" list-type="picture" :multiple="true"
                :show-file-list="true" :file-list="fileList" :on-success="handleUploadSuccess" :on-remove="onRemove"
                accept=".jpg,.png,.jpeg,.gif" :on-preview="handlePreview" :headers="{
    'Blade-Auth': upploadToken
  }">
                <el-button size="small" type="primary">点击上传</el-button>
                <div style="color: red" slot="tip" class="el-upload__tip">
                  提醒：请上传jpg,png,jpeg,gif图片
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品状态">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">下架</el-radio>
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="2">禁售</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-radio-group v-model="form.payment">
                <el-radio label="YUNDOU">ZCoin</el-radio>
                <el-radio label="JINDOU">精灵石</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="isaddOrUppdate == 0" v-for="(skuitem, index) in skuStockList" :key="skuitem.id">
              <div :style="{ fontSize: '20px', fontWeight: 800, color: 'red' }">
                商品SKU{{ index + 1 }}
              </div>
              <div>
                <span style="margin-right: 20px">价格</span><el-input v-model="skuitem.price" type="number"
                  :style="{ width: '110px', marginRight: '20px' }"></el-input>
                <span style="margin-right: 20px">库存</span><el-input v-model="skuitem.stock" type="number"
                  :style="{ width: '110px', marginRight: '20px' }"></el-input>
                <span style="margin-right: 20px">预警库存</span><el-input v-model="skuitem.lowStock" type="number"
                  :style="{ width: '80px', marginRight: '20px' }"></el-input>
                <span style="margin-right: 20px">锁定库存</span><el-input v-model="skuitem.lockStock" type="number"
                  :style="{ width: '80px', marginRight: '20px' }"></el-input>
                <el-button type="primary" slot="reference" @click="changeaddskulistdatanum"
                  v-if="index == skuStockList.length - 1">添加SKU</el-button>
                <el-button type="danger" slot="reference" @click="removeddskulistdatanum(index)"
                  v-if="skuStockList.length != 1">删除SKU</el-button>
                <div :style="{ fontSize: '14px', fontWeight: 600 }">
                  商品销售属性
                </div>
                <div v-for="(item, index2) in skuStockList[index].spData" :key="index2">
                  <span style="margin-right: 20px">属性名</span><el-input v-model="item.key"
                    :style="{ width: '120px', marginRight: '30px' }"></el-input>
                  <span style="margin-right: 20px">属性值</span><el-input v-model="item.value"
                    :style="{ width: '120px', marginRight: '30px' }"></el-input>
                  <el-button type="primary" slot="reference" @click="changeaddskulistinfonum(index)"
                    v-if="index2 == skuStockList[index].spData.length - 1">添加商品销售属性</el-button>
                  <el-button type="danger" slot="reference" @click="removeddskulistinfonum(index, index2)"
                    v-if="skuStockList[index].spData.length != 1">删除商品销售属性</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="商品状态">
              <!-- <richText @changedetailMobileHtml="changedetailMobileHtml" :dialogVisible="dialogVisible"></richText> -->
              <richText @changedetailMobileHtml="changedetailMobileHtml" :dialogVisible="dialogVisible"
                :decodeURIComponentHTML="decodeURIComponentHTML" :isaddOrUppdate="isaddOrUppdate"></richText>

            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="getcreate">确 定</el-button>
          </span>
        </el-dialog>
      </basic-container>
    </el-tab-pane>
    <el-tab-pane label="商品SKU" v-if="activeName == 'second'" name="second">
      <el-card class="box-card">
        <el-row gutter="40">
          <el-col :span="8">
            <el-button @click="activeName = 'first'">返回</el-button>
          </el-col>
        </el-row>
        <el-table :data="SKUDataList" style="width: 100%" row-key="id" default-expand-all v-loading="loading">
          <el-table-column prop="id" label="商品SKUID"> </el-table-column>
          <el-table-column prop="productId" label="商品ID"> </el-table-column>
          <el-table-column prop="pic" label="商品图片" width="100">
            <template slot-scope="scope">
              <img style="width: 50px" :src="scope.row.pic" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存"> </el-table-column>
          <el-table-column prop="lowStock" label="预警库存"> </el-table-column>
          <el-table-column prop="lockStock" label="锁定库存"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="sale" label="销量"> </el-table-column>
          <el-table-column prop="spData" label="商品销售属性">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="primary">
                  展开<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in scope.row.spData" :key="index">
                    <div>
                      {{ item.value }}/{{ item.key }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="addOrUppdateupdateskuStockList(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog title="修改商品SKU" :visible.sync="updatedialogFormVisible" :append-to-body="true"
        :close-on-click-modal="false">
        <el-form>
          <el-form-item>
            <div :style="{ fontSize: '20px', fontWeight: 800 }">商品SKU</div>
            <div>
              <span style="margin-right: 20px">价格</span><el-input v-model="updateskuStockList.price" type="number"
                :style="{ width: '140px', marginRight: '30px' }"></el-input>
              <span style="margin-right: 20px">库存</span><el-input v-model="updateskuStockList.stock" type="number"
                :style="{ width: '140px', marginRight: '30px' }"></el-input>
              <span style="margin-right: 20px">预警库存</span><el-input v-model="updateskuStockList.lowStock" type="number"
                :style="{ width: '80px', marginRight: '30px' }"></el-input>
              <span style="margin-right: 20px">锁定库存</span><el-input v-model="updateskuStockList.lockStock" type="number"
                :style="{ width: '80px', marginRight: '30px' }"></el-input>
              <div>
                <el-upload action="/api/blade-game-admin/aliyun/oss/multiFileUpload" list-type="picture"
                  :multiple="false" limit="1" :show-file-list="true" :file-list="skufileList"
                  :on-success="skuHandleUploadSuccess" accept=".jpg,.png,.jpeg,.gif" :on-preview="handlePreview"
                  :on-remove="onSkuRemove" :headers="{
    'Blade-Auth': upploadToken
  }">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div style="color: red" slot="tip" class="el-upload__tip">
                    提醒：请上传jpg,png,jpeg,gif图片
                  </div>
                </el-upload>
              </div>
              <div :style="{ fontSize: '20px', fontWeight: 800 }">
                商品销售属性
              </div>
              <div v-for="(item, index) in updateskuStockList.spData" :key="index">
                <span style="margin-right: 20px">属性名</span><el-input v-model="item.key"
                  :style="{ width: '180px', marginRight: '30px' }"></el-input>
                <span style="margin-right: 20px">属性值</span><el-input v-model="item.value"
                  :style="{ width: '180px', marginRight: '30px' }"></el-input>
                <el-button type="primary" slot="reference" @click="changeupdateskuStockList"
                  v-if="index == updateskuStockList.spData.length - 1">添加</el-button>
                <el-button type="danger" slot="reference" @click="removeupdateskuStockList(index)">删除</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatedialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getupdateSkuDetail">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="商品详情" v-if="activeName == 'third'" name="third">
      <el-card class="box-card">
        <el-row gutter="40">
          <el-col :span="8">
            <el-button @click="activeName = 'first'">返回</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-descriptions direction="vertical" :column="6" border>
        <el-descriptions-item label="商品名称">{{ goodsDetail.name }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{ goodsDetail.payment }}</el-descriptions-item>
        <el-descriptions-item label="原价">{{ goodsDetail.price }}</el-descriptions-item>
        <el-descriptions-item label="实际价格">{{ goodsDetail.curPrice }}</el-descriptions-item>
        <el-descriptions-item label="进货价格">{{ goodsDetail.purchasePrice }}</el-descriptions-item>
        <el-descriptions-item label="单位">{{ goodsDetail.unit }}</el-descriptions-item>
        <el-descriptions-item label="商品图片">
          <el-image v-for="(item, index) in imgsrcList" style="width: 100px; height: 100px" :src="item" :key="index"
            :preview-src-list="imgsrcList">
          </el-image>
        </el-descriptions-item>
      </el-descriptions>
      <div>
        <p>商品富文本</p>
        <div v-html="decodeURIComponentHTML"></div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import dayjs from 'dayjs'
import {
  create,
  update,
  pageProduct,
  skuList,
  changeStatus,
  deleteProduct,
  updateSkuDetail,
  detail
} from "@/api/small/product";
import { pageShop } from "@/api/small/shop";
import { reqparentIdList } from "@/api/small/category";
import { categoryList } from "@/api/small/attribute";
import { listMerchant } from "@/api/small/business";
import { getToken } from '@/util/auth';
import richText from './components/richText'
export default {
  name: "wel",
  data() {
    return {
      upploadToken: 'bearer ' + getToken(),
      activeName: "first",
      dialogVisible: false,
      updatedialogFormVisible: false,
      isaddOrUppdate: 0,
      tabData: [],
      shopData: [],
      flitershopData: [],
      categorysData: [],
      attributeData: [],
      SKUDataList: [],
      merchantList: [],
      flitershopDataValue: "",
      isCanSellOffline: false,
      skuStockList: [
        {
          price: "",
          stock: "",
          lowStock: "",
          lockStock: "",
          pic: '',
          skuCode: "0",
          spData: [
            {
              key: "",
              value: "",
            },
          ],
        },
      ],
      updateskuStockList: {
        id: "",
        price: "",
        stock: "",
        lowStock: "",
        lockStock: "",
        pic: '',
        skuCode: "0",
        spData: [
          {
            key: "",
            value: "",
          },
        ],
      },

      query: {
        pageNum: 1,
        pageSize: 10,
        shopId: "",
      },
      query2: {
        type: "",
        date: "",
        pageNum: 1,
        pageSize: 10,
        parentId: "0",
      },
      query3: {
        merchantId: "2",
        pageNum: 1,
        pageSize: 10,
      },
      query4: {
        pageNum: 1,
        pageSize: 10,
      },
      query5: {
        pageNum: 1,
        pageSize: 100,
      },
      pageTotal: 0,
      loading: false,
      form: {},
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
      imgArr: [],
      goodsDetail: {},
      imgsrcList: [],
      decodeURIComponentHTML: '',
      fileList: [],
      skufileList: [],
      lastPages: 1
    };
  },
  mounted() {
    this.getpageProduct();
    this.getlistMerchant();
    this.getpageShop();
  },
  methods: {
    changeFilterShopdata() {
      // console.log(this.flitershopDataValue, "e");
      // this.query.shopId = this.flitershopDataValue;
      this.getpageProduct();
    },
    // 添加SKU输入框
    changeaddskulistdatanum() {
      this.skuStockList.push({
        price: "",
        stock: "",
        lowStock: "",
        lockStock: "",
        pic: '',
        skuCode: "0",
        spData: [
          {
            key: "",
            value: "",
          },
        ],
      });
    },
    // 移除SKU输入框
    removeddskulistdatanum(index) {
      if (this.skuStockList.length == 1) return;
      this.skuStockList.splice(index, 1);
    },
    // 添加SKU属性输入框
    changeaddskulistinfonum(index) {
      this.skuStockList[index].spData.push({
        key: "",
        value: "",
      });
    },
    // 移除SKU输入框
    removeddskulistinfonum(index, index2) {
      if (this.skuStockList[index].spData.length == 1) return;
      this.skuStockList[index].spData.splice(index2, 1);
    },
    // 添加SKU属性修改输入框
    changeupdateskuStockList() {
      this.updateskuStockList.spData.push({
        key: "",
        value: "",
      });
    },
    // 移除SKU属性修改输入框
    removeupdateskuStockList(index) {
      if (this.updateskuStockList.spData.length == 1) return;
      this.updateskuStockList.spData.splice(index, 1);
    },
    // 弹出修改SKU输入框
    addOrUppdateupdateskuStockList(row) {
      this.skufileList = []
      this.fileList = []
      this.updateskuStockList
      this.updateskuStockList = row;
      this.updatedialogFormVisible = true;
      this.skufileList.push({ name: dayjs(), url: row.pic })
    },
    // 上传sku图片
    skuHandleUploadSuccess(res, file, fileList) {
      console.log("file=》", file.response);
      this.skufileList = fileList
      this.updateskuStockList.pic = file.response.data[0];
    },
    onSkuRemove(file, fileList) {
      this.skufileList = fileList
    },
    //修改商品sku信息
    async getupdateSkuDetail() {
      const result = await updateSkuDetail(this.updateskuStockList);
      if (result.data.code == 200) {
        const result = await skuList({ id: this.SKUDataList[0].productId });
        this.SKUDataList = result.data.data;
        this.updatedialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }
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
    //查询商品列表
    async getpageProduct() {
      this.loading = true;
      const result = await pageProduct(this.query);
      this.loading = false;
      if (result.data.code == 200) {
        this.tabData = result.data.data.records;
        this.pageTotal = result.data.data.total;
        this.lastPages = result.data.data.pages;
      } else {
        this.$message.error(result.data.msg);
      }
    },
    // 清空列表
    clearList() {
      this.query.pageNum = 1;
      this.query.shopId = "";
      this.query.payment = "";
      this.getpageProduct();
    },
    // 页码变化
    currentChange(e) {
      this.query.pageNum = e;
      this.getpageProduct();
    },
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
    changedetailMobileHtml(val) {
      const encodedUrl = encodeURIComponent(val)
      this.form.detailMobileHtml = encodedUrl
    },
    // 判断属性分组新增or修改
    addOrUppdate(row) {
      this.getpageShop();
      this.getparentIdList();
      this.getpageCategory();
      if (row == 0) {
        this.fileList = []
        this.imgArr = []
        // this.form.pic = ''
        this.decodeURIComponentHTML = ''

        this.dialogVisible = true;
        this.isaddOrUppdate = 0;
        this.form = {
          // 商家id
          merchantId: "2",
          // 店铺id
          shopId: "",
          // 商品分类id
          productCategoryId: "",
          // 属性分组id
          productAttributeCategoryId: "1",
          // 商品名称
          name: "",
          // 货号
          productSn: "",
          // 售价
          price: "",
          // 运费
          freight: "",
          // 单位
          unit: "",
          // 排序
          sort: "1",
          // 获取方式 （1：实物商品（物流发货）2：线下核销（无需物流） 3：特殊商品 ）
          access: "",
          // 图片
          pic: '',
          // 上架状态
          status: "",
          verifyStatus: "2",
          purchasePrice: ''
        };
      } else {
        this.getGoodsDetail(row, 1)

        this.fileList = []
        this.dialogVisible = true;
        this.isaddOrUppdate = 1;
        this.form = row;

      }
    },
    // 新增or修改商品
    async getcreate() {
      this.form.pic = this.imgArr[0].response.data[0]
      this.form.albumPics = this.imgArr.map(item => item.response.data[0])
      let result;
      if (this.isaddOrUppdate == 0) {
        result = await create({
          ...this.form,
          skuStockList: this.skuStockList,
        });
        if (result.data.code == 200) {
          this.dialogVisible = false;
          if (this.lastPages % this.query.pageSize == 0) {
            this.query.pageNum = this.lastPages + 1
          } else {
            this.query.pageNum = this.lastPages
          }
          this.getpageProduct();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
          this.imgArr = []
        } else {
          this.$message.error(result.data.msg);
        }
      } else {

        const result = await update({
          ...this.form,
        });
        if (result.data.code == 200) {
          this.dialogVisible = false;
          this.getpageProduct();
          this.$message({
            message: result.data.msg,
            type: "success",
          });
          this.imgArr = []

        } else {
          this.$message.error(result.data.msg);
        }
      }
    },
    // 获取店铺列表ID
    async getpageShop() {
      const result = await pageShop(this.query5);
      this.shopData = result.data.data.records;
      this.flitershopData = result.data.data.records;
    },
    // 查询parentId列表
    async getparentIdList() {
      const result = await reqparentIdList();
      this.categorysData = [...result.data.data];
    },
    //查询属性分组
    async getpageCategory() {
      const result = await categoryList(this.query3);
      this.attributeData = result.data.data.records;
    },
    // 删除商品
    async getdeleteProduct(row) {
      const result = await deleteProduct({ ids: [row.id] });
      if (result.data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getpageProduct();
      } else {
        this.$message.error(result.data.msg);
      }
    },
    // 查看商品SKU详情
    async getskuList(row) {
      const result = await skuList({ id: row.id });
      this.activeName = "second";
      this.SKUDataList = result.data.data;
    },
    //上下架商品
    async getchangeStatus(row) {
      const result = await changeStatus({
        ids: [row.id],
        status: row.status == 0 ? 1 : 0,
      });
      if (result.data.code == 200) {
        this.getpageProduct();
      }
    },
    async getGoodsDetail(row, val) {
      const result = await detail({ id: row.id })
      if (result.data.code == 200) {
        this.goodsDetail = result.data.data
        this.imgsrcList = this.goodsDetail.pic.split(',')
        var encodedComponent = decodeURIComponent(this.goodsDetail.detailMobileHtml);
        this.decodeURIComponentHTML = encodedComponent
        if (val) {
          if (this.goodsDetail.albumPics) {
            this.goodsDetail.albumPics.forEach(item => {
              this.fileList.push({ name: dayjs(), response: { data: [item] }, url: item })
              this.imgArr.push({ name: dayjs(), response: { data: [item] }, url: item })
            });
          }
          return
        } else {
          this.activeName = "third";

        }

      }
    },
  },
  watch: {
    "form.shopId"(val) {
      const result = this.shopData.find((item) => {
        return item.id == val;
      });
      if (result) {
        this.isCanSellOffline = Object.keys(result).includes(
          "productOfflineStore"
        );
      }
    },
  },
  components: {
    richText
  }
};
</script>

<style scoped="scoped" lang="scss"></style>
