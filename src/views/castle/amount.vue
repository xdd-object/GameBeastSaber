<template>
    <div class="pt-20">
        <div class="date-select">
            <el-date-picker v-model="selectDate" type="datetimerange" :picker-options="pickerOptions"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="onLoadRecord">
            </el-date-picker>
        </div>
        <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
            @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />
    </div>
</template>

<script>

import { getCastleIncome } from "@/api/castle/castle";
import dayjs from 'dayjs'
import { mapGetters } from "vuex";
import { mapToOptions } from "@/util/common";

// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
    0: '未开始',
    1: '进行中',
    2: '结算中',
    3: '已结束',
}
const statusRecordMap = {
    0: '未处理',
    1: '已处理',
}
const typeMap = {
    1: 'ZCoin场',
    2: '金豆场',
}
const selfMap = {
    'left': 'left',
    'right': 'right',
}
export default {
    name: "wel",
    data() {
        return {
            page: {
                total: 0
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            selectDate: [(new Date()).setTime((new Date()).getTime() - 3600 * 1000 * 24 * 30), new Date()],
            query: {
                pageNum: 1,
                pageSize: 10,
                userId: 1,
                startDate: null,
                endDate: null,
            },
            data: [
            ],
            option: {
                delBtn: false,
                editBtn: false,
                menuWidth: 150,
                border: true,
                align: 'center',
                menuAlign: 'center',
                addBtn: false,
                column: [
                    {
                        label: "id",
                        prop: "id",
                        span: 8,
                        row: true
                    },
                    {
                        label: "用户Id",
                        prop: "userId",
                        span: 8,
                        search: true,
                        row: true
                    }, {
                        label: "奖励金额",
                        prop: "amount",
                        span: 8,
                        row: true
                    }, {
                        label: "创建时间",
                        prop: "createDate",
                        span: 8,
                        row: true
                    }
                ]
            }
        };
    },
    computed: {},
    created() {
        // this.onLoadRecord()
    },
    methods: {
        onLoad(page, params = {}) {
            this.onLoadRecord();
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
            this.onLoadRecord(this.query);
            done();
        },
        onLoadRecord() {
            this.loading = true;
            if (this.page.pageSize) {
                this.query.pageSize = this.page.pageSize;
            }
            if (this.selectDate && this.selectDate[0] && this.selectDate[1]) {
                this.query.startDate = dayjs(this.selectDate[0]).format('YYYY-MM-DD hh:mm:ss');
                this.query.endDate = dayjs(this.selectDate[1]).format('YYYY-MM-DD hh:mm:ss');
            }else{
                this.query.startDate = null;
                this.query.endDate = null;
            }

            getCastleIncome(this.query).then(res => {
                const data = res.data.data;
                this.page.total = data.total;
                this.data = data.records;
                this.loading = false;
            });
        }
    },

};
</script>

<style scoped="scoped" lang="scss">
.date-select {
    background-color: #fff;
    padding: 16px;
}
</style>