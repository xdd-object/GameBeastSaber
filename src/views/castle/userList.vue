<template>
    <el-card>
        <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
            @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" />
    </el-card>
</template>

<script>

import { getCastleUserStatistics } from "@/api/castle/castle";
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
            query: {
                pageNum: 1,
                pageSize: 10,
                userId: null,
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
                        label: "城堡等级",
                        prop: "level",
                        span: 8,
                        row: true
                    }, {
                        label: "首次投入金额",
                        prop: "amount",
                        span: 8,
                        row: true
                    }, {
                        label: "复投次数",
                        prop: "openNumber",
                        span: 8,
                        row: true
                    },
                    {
                        label: "奖励总和",
                        prop: "expenditureAmount",
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
            getCastleUserStatistics(this.query).then(res => {
                const data = res.data.data;
                this.page.total = data.total;
                this.data = data.records;
                this.loading = false;
            });
        }
    },

};
</script>

<style scoped="scoped" lang="scss"></style>