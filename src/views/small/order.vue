<template>
  <basic-container>
    <div class="order_info">
      <el-drawer title="" size="50%" :visible.sync="drawer" :direction="direction" append-to-body>
        <div style="padding: 15px;">
          <el-descriptions title="订单详情" class="margin-top" border>
            <el-descriptions-item label="订单ID">{{ order.id }}</el-descriptions-item>
            <el-descriptions-item label="订单编号">{{ order.orderNo }}</el-descriptions-item>
            <el-descriptions-item label="用户id">{{ order.userId }}</el-descriptions-item>
            <el-descriptions-item label="商家id">{{ order.merchantId }}</el-descriptions-item>
            <el-descriptions-item label="店铺id">{{ order.shopId }}</el-descriptions-item>
            <el-descriptions-item label="订单总价">{{ order.total }}</el-descriptions-item>
            <el-descriptions-item label="商品总价">{{ order.totalAmount }}</el-descriptions-item>
            <el-descriptions-item label="快递费">{{ order.expressAmount }}</el-descriptions-item>
            <el-descriptions-item label="优惠金额">{{ order.discountAmount }}</el-descriptions-item>
            <el-descriptions-item label="支付金额">{{ order.payAmount }}</el-descriptions-item>

            <el-descriptions-item label="订单状态">{{ paymentTypeMap[order.paymentType] || '未知' }}</el-descriptions-item>
            <el-descriptions-item label="订单状态">{{ orderStatusMap[order.orderStatus] || '未知' }}</el-descriptions-item>
            <el-descriptions-item label="订单类型">{{ productTypeMap[order.productType] || '未知' }}</el-descriptions-item>
            <el-descriptions-item label="收货人">{{ orderAddress.receiver }}</el-descriptions-item>
            <el-descriptions-item label="收货人电话">{{ orderAddress.phone }}</el-descriptions-item>
            <el-descriptions-item label="收货地址">{{ orderAddress.provinceName }}/{{ orderAddress.cityName }}/{{
        orderAddress.districtName }}/{{ orderAddress.detail }}</el-descriptions-item>

            <el-descriptions-item label="下单时间">{{ order.insertTime }}</el-descriptions-item>
            <el-descriptions-item label="支付时间">{{ order.paymentTime }}</el-descriptions-item>
          </el-descriptions>

          <br>
          <br>
          <br>
          <div>商品信息</div>
          <br>
          <el-table :data="productData" border style="width: 100%">
            <el-table-column prop="productId" label="商品ID" width="180">
            </el-table-column>
            <el-table-column prop="productName" label="商品名称" width="180">
            </el-table-column>
            <el-table-column prop="productQuantity" label="购买数量">
            </el-table-column>
            <el-table-column prop="price" label="单价">
            </el-table-column>
            <el-table-column label="SKU信息">
              <template slot-scope="scope">
                <span v-for="(i, index) in scope.row.productSku" :key="index">
                  <el-tag size="small"><span>{{ i.key }}</span>：<span>{{ i.value }}</span></el-tag>&nbsp;
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-drawer>

    </div>
    <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord" @on-load="onLoad"
      @current-change="currentChangeRecord" @refresh-change="onLoad">

      <template #menu="{ size, row, index }">
        <el-button @click="tip(row, index)" text type="primary" :size="size">订单详情</el-button>
        <el-button  @click.stop="handleSend(row.orderNo)" text type="primary" :size="size"  v-if="row.orderStatus == '400' && (row.productType == '1'||row.productType == '4'||row.productType == '5')">发货</el-button>
      </template>
    </avue-crud>
    <el-dialog title="发货" append-to-body :visible.sync="visibleSend" width="40%">
      <orderSend ref="orderSend" :order-no="orderNo" :visible="visibleSend" @onHandleSendSuccess="onHandleSendSuccess" />
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  pageByOrder,
  countPageByOrder,
  getById,
  getProductByOrderId,
  getOrderAddress
} from "@/api/small/order";
import { orderStatusMap, paymentTypeMap, productTypeMap } from "@/const/mall/order";
import { mapToOptions } from "@/util/common";
import { listShop } from "@/api/small/shop";
import { listMerchant } from "@/api/small/business";
import shop from "@/views/small/shop.vue";
import orderSend from './components/orderSend.vue'
export default {
  name: "wel",
  watch: {
    direction(value) {
      this.option.dialogDirection = value;
    }
  },
  data() {
    return {
      orderStatusMap: orderStatusMap,
      productTypeMap: productTypeMap,
      paymentTypeMap: paymentTypeMap,
      visibleSend: false,

      shops: {},
      merchants: {},
      page: {
        total: 10
      },
      orderAddress: {},
      productData: [

      ],
      query: {
        "type": "",
        "date": "",
        "pageNum": 1,
        "pageSize": 10
      },
      drawer: false,
      direction: 'rtl',
      data: [],
      order: {},
      search: {
      },
      option: {
        searchShow: true,
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border: true,
        align: 'center',
        menuAlign: 'center',
        addBtn: false,
        column: [{
          label: "订单ID",
          prop: "id",
          row: true
        },
        {
          label: "订单编号",
          prop: "orderNo",
          width: '150px',
          overHidden: true,
          search: true,
          row: true,
        },
        {
          label: "商品名称",
          prop: "productName",
          overHidden: true,
          row: true,
        },
        {
          label: "用户ID",
          prop: "userId",
          row: true,
        },
        {
          label: "用户手机号",
          prop: "phone",
          search: true,
          row: true,
        },
        {
          label: "用户昵称",
          prop: "nickname",
          row: true,
        },
        {
          label: "商家名称",
          prop: "merchantId",
          row: true,
          formatter: (_row, value) => {
            return this.merchants[value] || value; //
          }
        },
        {
          label: "店铺名称",
          prop: "shopId",
          row: true,
          formatter: (_row, value) => {
            return this.shops[value] || value; //
          }
        },
        {
          label: "订单类型",
          prop: "productType",
          row: true,
          formatter: (_row, value) => {
            return productTypeMap[value] || '未知'; //
          }
        },
        {
          label: "订单状态",
          prop: "orderStatus",
          search: true,
          type: 'select',
          row: true,
          formatter: (_row, value) => {
            return orderStatusMap[value] || '未知'; //
          },
          dicData: mapToOptions(orderStatusMap)
        },
        {
          label: "支付类型",
          prop: "paymentType",
          row: true,
          search: true,
          type: 'select',
          formatter: (_row, value) => {
            return paymentTypeMap[value] || ''; //
          },
          dicData: mapToOptions(paymentTypeMap)
        },
        {
          label: "支付金额",
          prop: "payAmount",
          row: true
        },
        {
          label: "订单总金额",
          prop: "total",
          row: true
        },
        {
          label: "下单时间",
          prop: "insertTime",
          overHidden: true,
          row: true
        }
        ]
      }
    };
  },
  computed: {},
  created() {
    listShop().then(res => {
      if (res.data.data) {
        res.data.data.forEach((item) => {
          this.shops[item.id] = item.name
        })
      }
    })
    listMerchant().then(res => {
      if (res.data.data) {
        res.data.data.forEach((item) => {
          this.merchants[item.id] = item.nickname
        })
      }
    })
  },
  methods: {
    handleSend(orderNo) {
      this.orderNo = orderNo;
      this.visibleSend = true;
      if(this.$refs.orderSend){
      this.$refs.orderSend.initOrder(orderNo);
      }
      console.log(this.$refs.orderSend,'this.$refs.orderSend');
    },
    onLoad(page, params = {}) {
      this.loading = true;
      pageByOrder(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
      });
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    currentChangeRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoad(this.query);
      done();
    },
    tip(row) {
      this.drawer = true;
      this.order = {}
      this.productData = []
      this.orderAddress = {}
      getById({ orderId: row.id }).then(res => {
        this.order = res.data.data;
      })
      getProductByOrderId({ orderId: row.id }).then(res => {
        this.productData = res.data.data.orderProducts;
      })
      getOrderAddress({ id: row.addressId }).then(res => {
        this.orderAddress = res.data.data;
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    del() {

    }
  },
  components: {
    orderSend,
  },
};
</script>

<style scoped="scoped" lang="scss">
.order_info {
  padding: 15px;
}
</style>
