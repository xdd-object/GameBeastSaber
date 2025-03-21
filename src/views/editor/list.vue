<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="应用富文本管理" name="first">
            <basic-container>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addOrUppdate(0)">添加富文本</el-button>
                        <el-button type="primary" @click="getPageRichText">刷新列表</el-button>
                    </el-col>
                </el-row>
                <el-table :data="editorList" style="width: 100%" row-key="id" default-expand-all v-loading="loading">
                    <el-table-column prop="id" label="富文本ID" width="260">
                    </el-table-column>
                    <el-table-column prop="title" label="应用名称" width="260">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="260">
                    </el-table-column>
                    <el-table-column prop="background" label="背景色" width="200">
                        <template slot-scope="{row}">
                            <div :style="{ backgroundColor: row.background, width: '50px', height: '50px' }"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="150">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="150">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="addOrUppdate(scope.row)">修改</el-button>
                            <!-- <el-button type="primary" @click="addOrUppdate(scope.row)">纯文本修改</el-button> -->
                            <el-button type="primary" @click="getGoodsDetail(scope.row)">富文本详情</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin: 50px" background layout="prev, pager, next" :total="total"
                    :current-page="query.pageNum" @current-change="currentChange" :page-size="query.pageSize">
                </el-pagination>

                <el-dialog :title="isaddOrUppdate == 0 ? '添加富文本' : '修改富文本'" :visible.sync="dialogVisible"
                    :close-on-click-modal="false" append-to-body >
                    <el-form ref="form" :model="form">
                        <el-form-item label="背景色" width="60%">
                            <el-color-picker v-model="form.background" show-alpha :predefine="predefineColors">
                            </el-color-picker>
                        </el-form-item>
                        <el-form-item label="应用名称" width="60%">
                            <el-input v-model="form.title" style="width: 100%;"></el-input>
                        </el-form-item>
                        <el-form-item label="富文本模式" width="60%">
                            <el-switch v-model="isShowComponentHTML" active-text="富文本" inactive-text="纯文本">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="备注" width="60%">
                            <el-input v-model="form.remark" style="width: 100%;"></el-input>
                        </el-form-item>
                        <el-form-item label="富文本详情">
                            <richText v-if="isShowComponentHTML" @changedetailMobileHtml="changedetailMobileHtml"
                                :dialogVisible="dialogVisible" :decodeURIComponentHTML="decodeURIComponentHTML"
                                :isaddOrUppdate="isaddOrUppdate">
                            </richText>
                            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 30 }"
                                v-if="!isShowComponentHTML" v-model="form.content" style="width: 100%;"></el-input>

                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="getcreate">确 定</el-button>
                    </span>
                </el-dialog>
            </basic-container>
        </el-tab-pane>
        <el-tab-pane label="富文本详情" v-if="activeName == 'third'" name="third">
            <el-card class="box-card">
                <el-row gutter="40">
                    <el-col :span="8">
                        <el-button @click="activeName = 'first'">返回</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <div>
                <p>商品富文本</p>
                <div v-html="decodeURIComponentHTML"></div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>

import richText from './components/richText'
import { reqPageRichText, reqSaveRichText, reqUpdateRichText } from "@/api/editor/list"
import { Message } from 'element-ui';

export default {
    name: "wel",
    data() {
        return {
            activeName: 'first',
            isaddOrUppdate: null,
            
            query: {
                pageNum: 1,
                pageSize: 10,
            },
            editorList: [],
            form: {
                remark: '',
                content: '',
                background: '',
                title: '',
                type:''
            },
            dialogVisible: false,
            decodeURIComponentHTML: '',
            isShowComponentHTML: true,
            total: 0,
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ]
        };
    },
    mounted() {
        this.getPageRichText()
    },
    methods: {
        // 页码变化
        currentChange(e) {
            this.query.pageNum = e;
            this.getPageRichText();
        },
        async getPageRichText() {
            const result = await reqPageRichText(this.query)
            if (result.data.code == 200) {
                this.editorList = result.data.data.records
                this.total = result.data.data.total
                // console.log(this.total, "this.total ");
            }
        },
        addOrUppdate(val) {
            console.log(val, "val");
            this.isaddOrUppdate = val
            this.dialogVisible = true
            if (val == 0) {
                this.form = {
                    remark: '',
                    content: '',
                    background: '',
                    title: '',
                    type:this.isShowComponentHTML?1:2
                }
                this.decodeURIComponentHTML = ''

            } 
            else {
                this.form = val
                this.decodeURIComponentHTML = val.content
                this.isShowComponentHTML = this.form.type==1?true:false

            }
        },
        changedetailMobileHtml(val) {
            this.form.content = val
        },
        getcreate() {
            if (!this.form.remark || !this.form.content || !this.form.background || !this.form.title) {
                Message({
                    message: "备注，富文本详情，背景色，应用名称必须填写",
                    type: 'error'
                });
                return
            }
            this.form.type=this.isShowComponentHTML?1:2

            if (this.isaddOrUppdate == 0) {
                this.getSaveRichText()
            } else {
                this.getUpdateRichText()
            }
        },
        async getSaveRichText() {

            const result = await reqSaveRichText(this.form)
            if (result.data.code == 200) {
                Message({
                    message: "添加成功",
                    type: 'success'
                });
                this.form = {
                    remark: '',
                    content: '',
                    background: '',
                    title: '',
                    type:'',

                }
                this.getPageRichText()
                this.dialogVisible = false
            } else {
                Message({
                    message: result.data.msg,
                    type: 'error'
                });
            }
        },
        async getUpdateRichText() {
            const result = await reqUpdateRichText(this.form)
            if (result.data.code == 200) {
                Message({
                    message: "修改成功",
                    type: 'success'
                });
                this.form = {
                    remark: '',
                    content: '',
                    background: '',
                    title: '',
                    type:'',


                }
                this.getPageRichText()
                this.dialogVisible = false
            } else {
                Message({
                    message: result.data.msg,
                    type: 'error'
                });
            }
        },
        getGoodsDetail(val) {
            this.activeName = "third"
            this.decodeURIComponentHTML = val.content

        },
    },

    components: {
        richText
    }
};
</script>

<style scoped="scoped" lang="scss"></style>