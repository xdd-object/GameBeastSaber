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

import { accountBookLog,accountBookType } from "@/api/accountbook/accountbook";
import {currencyMap} from "@/const/currency/currency";
import { mapToOptions } from "@/util/common";
import { numberMap } from "@/const/accountbook/accountbook";
import dayjs from "dayjs";

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
                pageSize: 10,
                types: [34,35,177,178,179]
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
                        label: "账本类型",
                        prop: "type",
                        formatter: (_row, value) =>{
                            return this.typeMap[value] ||'未知'; //
                        }
                    },
                    {
                      label: "资产类型",
                      prop: "currencyIds",
                      type: 'select',
                      search: true,
                      searchMultiple: true,
                      hide: true,
                      dicData: mapToOptions(currencyMap),
                    },
                    {
                        label: "月份",
                        prop: "month",
                        search: true,
                        hide: true,
                        type: "month",
                        format: "yyyy-MM-dd",
                        valueFormat: "yyyy-MM-dd",
                        pinkerOptions: {
                            disableDate(time){
                                return time.getTime() < Date.now();
                            }
                        }
                    },
                    {
                        label: "分表",
                        prop: "tableIndex",
                        search: true,
                        hide: true,
                        type: "number",
                        min: 0,
                        max: 10,
                        rule: {
                            required: true,
                            message: "请输入分表序号",
                            trigger: "blur"
                        }
                    },
                    {
                        label: "用户id",
                        prop: "memberId",
                        span: 8,
                        search: true,
                        row: true
                    },
                    {
                        label: "资产类型",
                        prop: "currencyId",
                        formatter: (_row, value)=> {
                            return currencyMap[value] ||'未知'; //
                        }
                    },
                    {
                        label: "内容",
                        prop: "content"
                    },
                    {
                        label: "收支类型",
                        prop: "numberType",
                        formatter: (_row, value) => {
                            return numberMap[value] || '未知'
                        }
                    },
                    {
                        label: "变动前数量",
                        prop: "current"
                    },
                    {
                        label: "变动数量",
                        prop: "number"
                    },
                    {
                        label: "变动后数量",
                        prop: "after"
                    },
                    {
                        label: "手续费",
                        prop: "fee"
                    },
                    {
                        label: "目标用户",
                        prop: "toMemberId"
                    },
                    {
                        label: "添加时间",
                        prop: "addTime",
                        formatter: (_row, value)=> {
                          return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
                        },
                    },
                    {
                        label: "备注",
                        prop: "adRemark"
                    }
                ]
            }
        }
    },
    computed: {},
    created() {
        this.getTypeOptionFromApi()
        this.onLoadRecord();
    },
    methods: {
        onLoad(page, params = {}){
            this.onLoadRecord(params);
        },
        searchRecord(params, done){
            this.query = params;
            this.query.types = [34,35,177,178,179] ;
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
            accountBookLog(this.query).then(res =>{
                const data = res.data.data;
                this.data = data.records;
                this.page.total = data.total;
                this.loading = false;
            })
        },
        async getTypeOptionFromApi(){
            const res = await accountBookType()
            this.typeMap = res.data.data
            this.option.column[0].dicData.push(...mapToOptions(res.data.data))
            // console.log(this.typeMap)
        }
    }
}
</script>
