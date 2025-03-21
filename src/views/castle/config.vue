<template>
    <el-card>
        <avue-crud :option="option" :page.sync="page" :data="data" @search-change="searchRecord"
            @current-change="searchPageRecord" @on-load="onLoad" @refresh-change="onLoad" @row-update="rowUpdate" />
    </el-card>
</template>

<script>

import { getCastleRoomConfigList } from "@/api/castle/castle";
import dayjs from 'dayjs'
import { mapGetters } from "vuex";
import { mapToOptions } from "@/util/common";

// 0:未开始，1:已开始 2：结束中 3：已结束
const statusMap = {
    1: '开启',
    2: '关闭',
}
const typeMap = {
    1: 's6',
    2: 's3',
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
                editBtn: true,
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
                        editDisplay: false,
                        row: true
                    },
                    {
                        label: "等级",
                        prop: "level",
                        span: 8,
                        search: true,
                        row: true
                    }, {
                        label: "名称",
                        prop: "name",
                        span: 8,
                        row: true
                    }, {
                        label: "开通所需数量",
                        prop: "number",
                        span: 8,
                        row: true
                    }, {
                        label: "类型",
                        prop: "type",
                        span: 8,
                        row: true,
                        type: 'select',
                        formatter: (_row, value) => {
                            return typeMap[value] || '未知'; //
                        },
                        dicData: mapToOptions(typeMap),

                    },
                    {
                        label: "状态",
                        prop: "status",
                        span: 8,
                        row: true,
                        type: 'select',
                        formatter: (_row, value) => {
                            return statusMap[value] || '未知'; //
                        },
                        dicData: mapToOptions(statusMap),
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
            getCastleRoomConfigList(this.query).then(res => {
                const data = res.data.data;
                this.page.total = data.total;
                this.data = data.records;
                this.loading = false;
            });
        },
        rowUpdate() {

        },
    },

};
</script>

<style scoped="scoped" lang="scss"></style>