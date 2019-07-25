<template>
    <el-container>
        <a @click='showUpdate' class="update">申请修改</a>
        <el-dialog title="修改三级标签" :visible.sync="dialogFormVisible" align='left' :style="{ fontWeight: 'bold'}" width='800px'>
            <el-form :model="data" label-position='left' :label-width="formLabelWidth" >
                <el-form-item label="一级标签词" required>
                <el-select v-model="form.first_tagname" disabled placeholder="请选择一级标签词">
                </el-select>
                </el-form-item>
                <el-form-item label="二级标签词" required>
                <el-select v-model="form.second_tagname" disabled placeholder="请选择二级标签词">
                </el-select>
                </el-form-item>
                <el-form-item label="三级标签词" required>
                    <el-input v-model="form.third_tagname" placeholder="请输入三级标签" class='inp' disabled></el-input>
                </el-form-item>
                <el-form-item label="三级标签类型" required>
                <el-select v-model="form.type" placeholder="请选择三级标签类型" filterable clearable>
                    <el-option v-for='(item,index) in thirdType' :key='index' :label="item.label" :value="item.value"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="是否有歧义" required>
                <el-select v-model="form.is_mbiguity">
                    <el-option label="有歧义" :value="1"></el-option>
                    <el-option label="无歧义" :value="0" ></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="别名或昵称">
                    <el-input v-model="form.nickname" placeholder="请输入别名或昵称" class='inp' clearable></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.keywords" placeholder="请输入关键词" class='inp' clearable></el-input>
                    <span class='lib'>可添加多个关键词，关键词之间用";"分隔，组合关键词用#$#分隔。</span>
                </el-form-item>
                <el-form-item label="举例微博链接" required>
                    <el-input type="url" v-model="form.weibo_mid" placeholder="请输入微博链接" class='inp' clearable></el-input>
                    <span class='lib'>至少举例一个微博case证明提及关键词或组合关键词符合打上标签的标准。</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideUpdate">取 消</el-button>
                <el-button type="primary" @click="update" style='margin-left:20px;'>修 改</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { tag3type } from "@/utils/tag3typeconf";

export default {
    props: [ "data"],
    data() {
        return {
            apiConf: {
                //API
                operatorFieldTag: "/tag/operatorFieldTag" //领域标签相关操作，增、删、改
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                first_tagid: '',
                second_tagid: '',
                third_tagname: '',
                type: '',
                is_mbiguity: 1,
                nickname: '',
                keywords: '',
                weibo_mid: ''
            },
            is_mbiguity: '',
            thirdType: null
        }
    },
    computed: {
        ...mapGetters(["email"])
    },
    methods: {
        showUpdate() {
            this.dialogFormVisible = true;
        },
        hideUpdate() {
            this.dialogFormVisible = false;
        },
        update() {
            let lock = false
            for (var i in this.data) {
                if ( this.data[i] !== this.form[i]) {
                    lock = true;
                } 
            }
            if (this.form.weibo_mid) {
                lock = true;
            }
            if (!lock) {
                Message({
                    showClose: true,
                    message: "请至少修改一项！",
                    type: "error",
                    duration: 1000
                })
                return 
            }
            // if (!this.form.third_tagname) {
            //     Message({
            //     showClose: true,
            //     message: "请填写三级标签词！",
            //     type: "error",
            //     duration: 1000
            //     });
            //     return;
            // }
            if (!this.form.type) {
                Message({
                showClose: true,
                message: "请选择三级标签类型！",
                type: "error",
                duration: 1000
                });
                return;
            }
            if (!this.form.weibo_mid) {
                Message({
                showClose: true,
                message: "请填写举例微博链接！",
                type: "error",
                duration: 1000
                });
                return;
            }
            this.form.operator = this.email;
            this.form.update = 2;
            let data = {
                url: this.apiConf.operatorFieldTag,
                params: this.form
            }
            this.$store.dispatch("CommonGet", data).then(res => {
                if (res.code && res.code === 200) {
                    Message({
                        showClose: true,
                        message: "申请修改成功！",
                        type: "success",
                        duration: 1000
                    });
                } else {
                    Message({
                        showClose: true,
                        message: res.msg,
                        type: "error",
                        duration: 1000
                    });
                }
            }, error => {
                Message({
                        showClose: true,
                        message: "申请修改失败",
                        type: "error",
                        duration: 1000
                    });
            })
            this.dialogFormVisible = false;
        }
    },
    created() {
        for (var i in this.data) {
            this.form[i] = this.data[i];
        }
        this.form.originalinfo = this.data;
        this.thirdType = tag3type;
    }
    
}
</script>
<style lang="scss" scoped>
.el-container {
    display: inline-block;
}
.update:hover {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
}
.lib {
    margin-left: 20px;
    font-size: 12px;
    color: #888;
    font-weight: normal;
}
a {
  font-size:14px; 
  color:#409eff; 
  &:hover {
    text-decoration: underline;
  }
}
.el-form-item {
    margin-bottom: 10px;
}
.dialog-footer {
    height: 50px;
    padding-right: 50px;
}
.inp {
  width: 217px;
}
</style>

