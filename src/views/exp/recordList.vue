<template>
    <avue-crud :option="option"
               :table-loading="loading"
               :page.sync="page"
               :data="data"
               @search-change="searchRecord"
               @current-change="searchPageRecord"
               @on-load="onLoad"
               @refresh-change="onLoad"/>
  
</template>

<script>

import { recordList} from "@/api/exp/exp";

export default {
    name: "wel",
    data(){
        return{
            page: {
                total: 0
            },
            loading: true,
            query: {
                pageNum: 1,
                pageSize: 10
            },
            data: [

            ],
            typeMap: {},
            option: {
                delBtn: false,
                editBtn: false,
                menuWidth: 150,
                border:true,
                align:'center',
                menuAlign:'center',
                addBtn: false,
                column: [
                    {
                        label: "id",
                        prop: "id"
                    },
                    {
                        label: "用户id",
                        prop: "memberId",
                        hide: true,
                        search: true
                    },
                    {
                        label: "用户id",
                        prop: "inviteeMemberId"
                    },
                    {
                        label: "增加经验类型",
                        prop: "type",
                        search: true,
                        type: "select",
                        dicData: [
                            {
                                label: "开通会员",
                                value: 1
                            },
                            {
                                label: "好友实名",
                                value: 3
                            },
                            {
                                label: "会员过期",
                                value: 4
                            },
                        ]
                    },
                    {
                        label: "处理状态",
                        prop: "status",
                        search: true,
                        type: "select",
                        dicData: [
                            {
                                label: "处理中",
                                value: 1
                            },
                            {
                                label: "已处理",
                                value: 2
                            },
                            {
                                label: "失败",
                                value: 3
                            }
                        ]
                    },
                    {
                        label: "创建时间",
                        prop: "createTime"
                    },
                    {
                        label: "修改时间",
                        prop: "updateTime"
                    }
                ]
            }
        }
    },
    computed: {},
    created() {
        this.onLoadRecord();
    },
    methods: {
        onLoad(page, params = {}){
            this.onLoadRecord(params);
        },
        searchRecord(params, done){
            this.query = params;
            this.query.pageNum = 1;
            this.query.pageSize = 10;
            this.onLoad(this.query);
            done();
        },
        searchPageRecord(currentPage,done){
            this.query.pageNum = currentPage;
            this.onLoadRecord();
            done();
        },
        onLoadRecord(){
            this.loading = true;
            recordList(this.query).then(res =>{
                const data = res.data.data;
                this.data = data.records;
                this.page.total = data.total;
                this.loading = false;
            })
        }
    }
}
</script>