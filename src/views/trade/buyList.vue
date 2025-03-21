<template>
    <basic-container>
        <el-drawer title="" size="60%" :visible.sync="drawer" :direction="direction" append-to-body>
            <avue-crud :data="room.data" :page.sync="room.page" :option="room.option"
                @search-change="searchChangeRecord" @refresh-change="onLoadRecord"
                @current-change="currentChangeRecord">
            </avue-crud>
        </el-drawer>

        <avue-crud :option="option" :table-loading="loading" :page.sync="page" :data="data"
            @search-change="searchRecord" @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad">
            <template #menu="{ size, row, index }">
                <div style="display: flex;">
                    <el-button @click="tip(row, index)" text type="primary" :size="size">详情</el-button>
                    <el-button @click="getCancelSellOrder(row, index)" v-if="row.status == 0 || row.status == 2" text
                        type="primary" :size="size">撤单</el-button>
                </div>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>

import { buyList, reqBuyOrderDetails, reqCancelBuyOrder, reqTypeList } from "@/api/trade/trade";
import { typeIdMap, tradeStatusMap } from "@/const/trade/trade";
import { mapToOptions } from "@/util/common";

export default {
    name: "wel",
    data() {
        return {
            room: {
                query: {
                    "pageNum": 1,
                    "pageSize": 10,
                    "orderId": null,
                },
                row: {
                    roomId: null,
                },
                page: {
                    total: 0
                },
                data: [

                ],
                option: {
                    delBtn: false,
                    editBtn: false,
                    menu: false,
                    border: true,
                    align: 'center',
                    menuAlign: 'center',
                    addBtn: false,
                    column: [
                        {
                            label: "卖家",
                            prop: "memberId",
                            span: 8,
                            row: true
                        },
                        {
                            label: "总金额",
                            prop: "money",
                            span: 8,
                            row: true
                        },
                        {
                            label: "数量",
                            prop: "num",
                            span: 8,
                            row: true
                        },
                        {
                            label: "单价",
                            prop: "price",
                            span: 8,
                            row: true
                        },
                        {
                            label: "手续费",
                            prop: "fee",
                            span: 8,
                            row: true
                        },
                        {
                            label: "买家",
                            prop: "toMemberId",
                            span: 8,
                            row: true
                        },
                        {
                            label: "订单id",
                            prop: "orderId",
                            span: 8,
                            row: true
                        },
                        {
                            label: "购买时间",
                            prop: "updateTime",
                            span: 8,
                            row: true
                        },
                    ]
                },
            },
            drawer: false,

            direction: 'rtl',

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
            typeStatusMap: [],
            option: {
                delBtn: false,
                editBtn: false,
                menuWidth: 180,
                border: true,
                align: 'center',
                menuAlign: 'center',
                addBtn: false,
                column: [
                    {
                        label: "id",
                        prop: "id"
                    },
                    {
                        label: "手续费",
                        prop: "fee"
                    },
                    {
                        label: "买家",
                        prop: "memberId"
                    },
                    {
                        label: "总数量/剩余数量",
                        prop: "availNum",
                        html: true,
                        formatter: (_row, value) => {
                            return `<p> <span>${_row.num}</span>/<span>${_row.availNum}</span> </p>` //
                        },
                    },

                    {
                        label: "单价",
                        prop: "price"
                    },
                    {
                        label: "类型",
                        prop: "typeId",
                        formatter: (_row, value) => {
                            return this.typeStatusMap[value].name || '未知'; //
                        },
                    },
                    {
                        label: "交易状态",
                        prop: "status",
                        search: true,
                        type: "select",
                        formatter: (_row, value) => {
                            return tradeStatusMap[value] || '未知'; //
                        },
                    },
                    {
                        label: "更新时间",
                        prop: "updateTime"
                    },
                ]
            }
        }
    },
    computed: {},
    created() {
        this.onLoadRecord();
        this.getTypeList()
    },
    methods: {
        getTypeList() {
            reqTypeList().then(res => {
                this.typeStatusMap = res.data.data
            })
        },
        onLoad(page, params = {}) {
            this.onLoadRecord(params);
        },
        tip(row) {
            this.room.query.orderId = row.id;
            this.room.row = row;
            this.onLoadRecordDetail(this.room.query);
            this.drawer = true;
        },
        getCancelSellOrder(row) {
            reqCancelBuyOrder({ orderId: row.id }).then(res => {
                this.onLoad()
            });
        },
        searchChangeRecord(params, done) {
            this.room.query = params;
            this.room.query.pageNum = 1;
            this.room.query.pageSize = 10;
            this.room.query.roomId = this.room.row.id;
            this.onLoadRecordDetail(this.room.query);
            done();
        },
        currentChangeRecord(currentPage, done) {
            this.room.query.pageNum = currentPage;
            this.onLoadRecordDetail(this.room.query);
            done();
        },
        onLoadRecordDetail() {
            this.room.loading = true;
            reqBuyOrderDetails(this.room.query).then(res => {
                const data = res.data.data;
                this.room.data = data.records;
                this.room.page.total = data.total;
                this.room.loading = false;
                // this.selectionClear();
            });
        },

        searchRecord(params, done) {
            this.query = params;
            this.query.pageNum = 1;
            this.query.pageSize = 10;
            this.onLoad(this.query);
            done();
        },
        searchPageRecord(currentPage, done) {
            this.query.pageNum = currentPage;
            this.onLoadRecord();
            done();
        },
        onLoadRecord() {
            this.loading = true;
            buyList(this.query).then(res => {
                const data = res.data.data;
                this.data = data.records;
                this.page.total = data.total;
                this.loading = false;
            })
        },

    }
}
</script>