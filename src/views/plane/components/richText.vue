<template>
    <div>
        <quill-editor class='editor' v-model="content" ref="myQuillEditor" :options="editorOption"
            @change="onEditorChange($event)">
        </quill-editor>
        <el-upload action="/api/blade-game-admin/aliyun/oss/multiFileUpload" list-type="picture" :multiple="true"
            :show-file-list="false" :on-success="handleUploadSuccess" accept=".jpg,.png,.jpeg,.gif"
            :on-preview="handlePreview" :headers="{
            'Blade-Auth': upploadToken
        }">
            <el-button size="small" type="primary" id="upload" style="display: none;">点击上传</el-button>

        </el-upload>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getToken } from '@/util/auth';
import * as Quill from 'quill'
// 调整上传图片大小
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
const titleConfig = [
    { Choice: '.ql-insertMetric', title: '跳转配置' },
    { Choice: '.ql-bold', title: '加粗' },
    { Choice: '.ql-italic', title: '斜体' },
    { Choice: '.ql-underline', title: '下划线' },
    { Choice: '.ql-header', title: '段落格式' },
    { Choice: '.ql-strike', title: '删除线' },
    { Choice: '.ql-blockquote', title: '块引用' },
    { Choice: '.ql-code', title: '插入代码' },
    { Choice: '.ql-code-block', title: '插入代码段' },
    { Choice: '.ql-font', title: '字体' },
    { Choice: '.ql-size', title: '字体大小' },
    { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
    { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
    { Choice: '.ql-direction', title: '文本方向' },
    { Choice: '.ql-header[value="1"]', title: 'h1' },
    { Choice: '.ql-header[value="2"]', title: 'h2' },
    { Choice: '.ql-align', title: '对齐方式' },
    { Choice: '.ql-color', title: '字体颜色' },
    { Choice: '.ql-background', title: '背景颜色' },
    { Choice: '.ql-image', title: '图像' },
    { Choice: '.ql-video', title: '视频' },
    { Choice: '.ql-link', title: '添加链接' },
    { Choice: '.ql-formula', title: '插入公式' },
    { Choice: '.ql-clean', title: '清除字体格式' },
    { Choice: '.ql-script[value="sub"]', title: '下标' },
    { Choice: '.ql-script[value="super"]', title: '上标' },
    { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
    { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
    { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
    { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
    { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
    { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
    { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
    { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
    { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
    { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
    { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
    { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
    { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
    { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
    { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' }
]
export default {
    props: ['dialogVisible'],
    data() {
        return {
            upploadToken: 'bearer ' + getToken(),
            content: '',
            editorOption: {
                placeholder: '请输入',
                theme: "snow",
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                            ['blockquote', 'code-block'], // 引用  代码块
                            [{ header: 1 }, { header: 2 }], // 1、2 级标题
                            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                            [{ indent: '-1' }, { indent: '+1' }], // 缩进
                            // [{ direction: 'rtl' }], // 文本方向
                            [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
                            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
                            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                            // [{ font: ['songti'] }], // 字体种类
                            [{ align: [] }], // 对齐方式
                            ['clean'], // 清除文本格式
                            ['image'] // 链接、图片，需要视频的可以加上video
                        ],
                        handlers: {   //此处是图片上传时候需要使用到的
                            'image': function (value) {
                                console.log(value)
                                if (value) {  // 点击图片
                                    document.querySelector('#upload').click()
                                }
                            }
                        }
                    },
                    imageDrop: true,   // 图片拖拽
                    imageResize: {     // 图片放大缩小
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    }
                }
            }
        }
    },
    mounted() {
        for (let item of titleConfig) {
            let tip = document.querySelector('.quill-editor ' + item.Choice)
            if (!tip) continue
            tip.setAttribute('title', item.title)
        }
    },
    methods: {

        // 内容改变事件，只需要这一个方法就够了
        onEditorChange({ quill, html, text }) {
            this.$emit('changedetailMobileHtml', html)
            // console.log('editor change!', quill, html, text)
            // this.content = html
        },
        // 上传sku图片
        handleUploadSuccess(res, file) {
            // 获取光标所在位置
            console.log(this.$refs.myQuillEditor);
            let quill = this.$refs.myQuillEditor.quill
            console.log(quill);
            let length = quill.getSelection().index
            // 插入图片  
            quill.insertEmbed(length, 'image', file.response.data[0])  // imageUrl:图片地址
            // 调整光标到最后
            quill.setSelection(length + 1)
        },
    },
    components: {   //界面组件引用
        quillEditor
    },
    watch: {
        dialogVisible(val) {
            console.log(val, '22222222');
            if (val) {
                this.content = ''
            }
        }
    }
}
</script>

<style lang="scss">
.editor {
    line-height: normal !important;
    height: 400px;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12"]::before {
    content: '12px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14"]::before {
    content: '14px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16"]::before {
    content: '16px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18"]::before {
    content: '18px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20"]::before {
    content: '20px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22"]::before {
    content: '22px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24"]::before {
    content: '24px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28"]::before {
    content: '28px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32"]::before {
    content: '32px';
    vertical-align: top;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36"]::before {
    content: '36px';
    vertical-align: top;
}



/* 这个是字号数字对应的px值 */
.ql-editor .ql-size-12 {
    font-size: 12px;
}

.ql-editor .ql-size-14 {
    font-size: 14px;
}

.ql-editor .ql-size-16 {
    font-size: 16px;
}

.ql-editor .ql-size-18 {
    font-size: 18px;
}

.ql-editor .ql-size-20 {
    font-size: 20px;
}

.ql-editor .ql-size-22 {
    font-size: 22px;
}

.ql-editor .ql-size-24 {
    font-size: 24px;
}

.ql-editor .ql-size-28 {
    font-size: 28px;
}

.ql-editor .ql-size-32 {
    font-size: 32px;
}

.ql-editor .ql-size-36 {
    font-size: 36px;
}

/* 选择字号富文本字的大小 */
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12"]::before {
    font-size: 12px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14"]::before {
    font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16"]::before {
    font-size: 16px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18"]::before {
    font-size: 18px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20"]::before {
    font-size: 20px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22"]::before {
    font-size: 22px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24"]::before {
    font-size: 24px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28"]::before {
    font-size: 28px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32"]::before {
    font-size: 32px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36"]::before {
    font-size: 36px;
}
</style>