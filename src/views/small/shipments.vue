<template>
    <div>
        <el-card class="box-card">
            <el-row gutter="40">
                <el-col :span="4">
                    <el-button type="info" @click="dialogVisible = true">导入文件</el-button>
                </el-col>
            </el-row>

            <el-row gutter="10">
                <el-col :span="3">
                    <div class="search_input">
                        <el-input v-model="searchData.orderNo" placeholder="请输入订单编号"></el-input>

                    </div>
                </el-col>
                <el-col :span="3.5">
                    <el-date-picker v-model="dateObj.startDate" type="date" placeholder="选择开始日期"
                        :picker-options="pickerOptions" value-format="timestamp">
                    </el-date-picker>
                </el-col>
                <el-col :span="3.5">
                    <el-date-picker v-model="dateObj.endDate" type="date" placeholder="选择结束日期"
                        :picker-options="pickerOptions" value-format="timestamp">
                    </el-date-picker>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" @click="searchClick">搜索</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button @click="clearStatus">清空状态</el-button>
                </el-col>
                <el-col :span="3">
                    <el-select filterable placeholder="请选择订单状态" style="margin-left: 10px"
                        v-model="searchData.orderStatus" :clearable="true">
                        <el-option v-for="item in option1" :key="item.status" :label="item.name" :value="item.status">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-select filterable placeholder="请选择支付类型" style="margin-left: 10px"
                        v-model="searchData.paymentType" :clearable="true">
                        <el-option v-for="item in option2" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="2">
                    <el-button type="success" @click="handleExport">导出文件</el-button>
                </el-col>
            </el-row>

            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="订单ID" width="100px"> </el-table-column>
                <el-table-column prop="orderNo" label="订单编号" width="100px"> </el-table-column>
                <el-table-column prop="productName" label="商品名称" width="100px"> </el-table-column>
                <el-table-column prop="userId" label="用户ID" width="100px"> </el-table-column>
                <el-table-column prop="phone" label="用户手机号"> </el-table-column>
                <el-table-column prop="nickname" label="用户昵称" width="100px"> </el-table-column>
                <el-table-column prop="nickname" label="订单类型" width="100px">
                    <template slot-scope={row}>
                        <p v-if="row.productType == 1">普通订单</p>
                        <p v-if="row.productType == 2">线下订单</p>
                        <p v-if="row.productType == 3">特殊订单</p>
                        <p v-if="row.productType == 4">拼团订单</p>
                    </template>
                </el-table-column>
                <el-table-column prop="merchantId" label="商家名称" width="100px">
                    <template slot-scope={row}>
                        <p>{{ row.merchantId == 2 ? '商户' : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="shopId" label="店铺名称" width="100px">
                    <template slot-scope={row}>
                        <p v-if="row.shopId">{{ row.shopId == 2 ? '官方店' : '京东' }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="productType" label="订单类型" width="100px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.productType == 1">实物商品（物流发货）</span>
                        <span v-if="scope.row.productType == 2">线下核销（无需物流）</span>
                        <span v-if="scope.row.productType == 3">特殊商品</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" width="100px">
                    <template slot-scope={row}>
                        <p v-if="row.orderStatus">{{ row.orderStatus | showOrderStatus }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="paymentType" label="支付类型" width="100px">
                    <template slot-scope={row}>
                        <p v-if="row.paymentType">{{ row.paymentType | showPaymentType }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="payAmount" label="支付金额" width="100px"> </el-table-column>
                <el-table-column prop="total" label="订单总金额" width="100px"> </el-table-column>
                <el-table-column prop="insertTime" label="下单时间"> </el-table-column>
            </el-table>
            <el-pagination style="margin: 50px" background layout="prev, pager, next,sizes" :total="pageTotal"
                :current-page="query.pageNum" :page-size="query.pageSize" @current-change="currentChange"
                @size-change="handleSizeChange">
            </el-pagination>
            <el-dialog title="上传文件" :visible.sync="dialogVisible" width="40%" append-to-body>
                <div class="dialog_box">
                    <el-upload class="upload-demo" :drag="true" :limit='1' :auto-upload="true" :on-success="onSuccess"
                        :file-list="fileList"
                        action='/api/blade-game-admin/admin/web/mall/orderQuery/importPayOrder?merchantId=2' :headers="{
                    'Blade-Auth': upploadToken
                }">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
                <div class="dialog_btn">
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { reqExportPayOrder, reqImportPayOrder } from '@/api/small/shipments'
import {
    pageByOrder,
} from "@/api/small/order";
import { exportBlob } from "@/api/common";
import { downloadXls } from "@/util/util";
import { dateNow } from "@/util/date";
import { getToken } from '@/util/auth';
import dayjs from 'dayjs';
export default {

    data() {
        return {
            dialogVisible: false,
            query: {
                "type": "",
                "date": "",
                "pageNum": 1,
                "pageSize": 10
            },
            tableData: [],
            pageTotal: 0,
            option1: [
                {
                    status: 300,
                    name: '待支付'
                },
                {
                    status: 400,
                    name: '已支付'
                },
                {
                    status: 450,
                    name: '待收货'
                },
                {
                    status: 500,
                    name: '交易完成'
                },
                {
                    status: 900,
                    name: '订单取消'
                },
                {
                    status: 920,
                    name: '超时未支付'
                },
            ],
            option2: [
                {
                    id: 'YUNDOU',
                    name: 'ZCoin支付'
                },
                {
                    id: 'JINDOU',
                    name: '精灵石支付'
                },

            ],
            dateObj: {
                startDate: null,
                endDate: null,
            },
            searchData: {
                orderStatus: null,
                paymentType: null,
                orderNo: null,
                phone: null,
                startDate: null,
                endDate: null,
            },
            uppLoadFile: {},
            upploadToken: 'bearer ' + getToken(),
            fileList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
        }
    },
    mounted() {
        this.onLoad()
    },
    methods: {
        onSuccess() {
            this.$message({
                type: 'success',
                message: '上传成功!'
            });
            this.dialogVisible = false
            this.fileList = []
        },

        // 请求订单列表
        onLoad() {
            this.loading = true;
            pageByOrder({ ...this.query, ...this.searchData }).then(res => {
                const data = res.data.data;
                this.tableData = data.records;
                this.pageTotal = data.total;
                this.loading = false;
            });
        },
        // 页码变化
        currentChange(e) {
            this.query.pageNum = e;
            this.onLoad();
        },
        // 每页条数变化
        handleSizeChange(e) {
            this.query.pageSize = e;
            this.onLoad();
        },
        // 点击搜索
        searchClick() {
            if (this.dateObj.startDate && !this.dateObj.endDate) {
                this.$message({
                    type: 'error',
                    message: '结束时间为必选!'
                });
                return
            } else if (this.dateObj.endDate && !this.dateObj.startDate) {
                this.$message({
                    type: 'error',
                    message: '开始时间为必选!'
                });
                return
            } else if (this.dateObj.startDate && this.dateObj.endDate) {
                if (this.dateObj.startDate > this.dateObj.endDate) {
                    this.$message({
                        type: 'error',
                        message: '开始时间必须小于结束时间!'
                    });
                    return
                }
               
            }
            this.searchData.startDate = this.transitionDate(this.dateObj.startDate)
            this.searchData.endDate = this.transitionDate(this.dateObj.endDate)
            console.log(this.dateObj, "this.dateObj");

            this.onLoad()
        },
        transitionDate(date) {
            const result = `${dayjs(date).$y}-${(dayjs(date).$M + 1).toString().padStart(2, '0')}-${dayjs(date).$D.toString().padStart(2, '0')}`
            return result
        },
        // 清空搜索条件
        clearStatus() {
            this.dateObj={
                startDate: null,
                endDate: null,
            }
            this.searchData = {
                orderStatus: null,
                paymentType: null,
                orderNo: null,
                phone: null,
                startDate: null,
                endDate: null,
            }
            this.onLoad()

        },

        handleExport() {
            let that = this
            const sendDate = {
                merchantId: that.tableData[0].merchantId,
                orderNo: that.searchData.orderNo,
                orderStatus: that.searchData.orderStatus,
                paymentType: that.searchData.paymentType,
                phone: this.searchData.phone,
                startDate: this.searchData.startDate ? this.searchData.startDate : '',
                endDate: this.searchData.endDate ? this.searchData.endDate : '',
            }
            this.$confirm("是否导出发货订单数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                NProgress.start();
                exportBlob(`/api/blade-game-admin/admin/web/mall/orderQuery/exportPayOrder`, sendDate).then(res => {
                    downloadXls(res.data, `发货订单数据${dateNow()}.xlsx`);
                    NProgress.done();

                })
            });
        },

    },
    watch: {
        "searchData.orderStatus"() {
            this.onLoad()
        },
        "searchData.paymentType"() {
            this.onLoad()
        },
    },
    filters: {
        showOrderStatus(val) {
            const arr = [
                {
                    status: 300,
                    name: '待支付'
                },
                {
                    status: 400,
                    name: '已支付'
                },
                {
                    status: 450,
                    name: '待收货'
                },
                {
                    status: 500,
                    name: '交易完成'
                },
                {
                    status: 900,
                    name: '订单取消'
                },
                {
                    status: 920,
                    name: '超时未支付'
                },
            ]
            const findObj = arr.find(item => item.status == val)
            return !findObj ? "未知" : findObj.name
        },
        showPaymentType(val) {
            const arr = [
                {
                    id: 'YUNDOU',
                    name: 'ZCoin支付'
                },
                {
                    id: 'JINDOU',
                    name: '精灵石支付'
                },
            ]
            const findObj = arr.find(item => item.id == val)
            return !findObj ? "未知" : findObj.name
        }
    }
}
</script>

<style lang="scss" scoped>
.search_input {
    display: flex;
}

.dialog_box {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;

    .upload-demo {
        margin-top: 80px;
    }
}

.dialog_btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>