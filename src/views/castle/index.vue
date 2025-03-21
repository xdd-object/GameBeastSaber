<template>
    <basic-container>
        <el-descriptions title="统计信息">
                <el-descriptions-item label="首次投入金额">{{pageData.firstAmount}}</el-descriptions-item>
                <el-descriptions-item label="总支出奖励">{{ pageData.expenditureAmount }}</el-descriptions-item>
                <el-descriptions-item label="结余（首次投入-总支出奖励）">{{ pageData.balanceAmount }}</el-descriptions-item>
                <el-descriptions-item label="平台总收入"> {{ pageData.platformAmount }}</el-descriptions-item>
            </el-descriptions>
    </basic-container>
</template>

<script>

import { getCastleStatistics } from "@/api/castle/castle";

export default {
    name: "wel",
    data() {
        return {
            pageData: ''
        };
    },
    computed: {},
    created() {
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.loading = true;
            getCastleStatistics(this.query).then(res => {
                console.log(res);
                this.pageData = res.data.data;
             this.loading = false;

            });
        },
    },
};
</script>

<style scoped="scoped" lang="scss"></style>