<template>
  <el-main :style="`background-image: url(${img_bg});`">
    <el-row class="pan-top-wrap" :style="`background-image: url(${img_header});`">
    </el-row>
    <el-row class="content-box-wrap">
      <h6 class="pane-title">用户兴趣调查问卷</h6>
      <el-form ref="formAdd" :model="formAdd" :rules="rules" label-width="120px" size="small">
        <el-form-item v-show="step === 0" label="UID" required prop="uid">
          <el-input style="max-width: 300px;" v-model.number="formAdd.uid" placeholder="请输入您的UID" clearable @change="hanleUid"></el-input>
        </el-form-item>
        <div v-show="step === 1">
          <el-form-item label="兴趣盲写" required prop="user_like">
            <el-input type="textarea" :autosize="{minRows: 2}" style="max-width: 300px;" v-model.trim="formAdd.user_like" placeholder="请输入感兴趣的品类/关键词"></el-input>
          </el-form-item>
          <p class="info-tip">请写出4-6个感兴趣的品类/关键词，每个词之间英文逗号（,）分割</p>
        </div>
        <el-form-item v-show="step === 2" label="勾选一级兴趣" required prop="first_tags">
          <el-checkbox :indeterminate="checkStateFirst" v-model="checkAllFirst" @change="handleCheckAllFirstTag">全选</el-checkbox>
          <el-checkbox-group v-model="formAdd.first_tags" @change="handleCheckedFirstTags">
            <el-checkbox v-for="(name, key) in cateArr" :label="name" :key="key">{{name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-show="step === 3" label="勾选二级兴趣" required prop="second_tags">
          <el-checkbox :indeterminate="checkStateSecond" v-model="checkAllSecond" @change="handleCheckAllSecondTag">全选</el-checkbox>
          <el-checkbox-group v-model="formAdd.second_tags" @change="handleCheckedSecondTags">
            <el-collapse v-model="activeNames">
              <el-collapse-item :key="idx" v-for="(item, idx) in secondMap" :title="item.name" :name="idx">
                <el-checkbox v-for="(name, key) in item.list" :label="name" :key="key">{{name}}</el-checkbox>
              </el-collapse-item>
            </el-collapse>
          </el-checkbox-group>
        </el-form-item>
        <div v-if="thirdArr.length > 0" v-show="step === 4">
          <el-form-item label="确认三级兴趣" prop="third_tags">
            <el-checkbox :indeterminate="checkStateThird" v-model="checkAllThird" @change="handleCheckAllThirdTag">全选</el-checkbox>
            <el-checkbox-group v-model="formAdd.third_tags" @change="handleCheckedThirdTags">
              <el-checkbox v-for="(name, key) in thirdArr" :label="name" :key="key">{{name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <p class="info-tip">以上是否为您的三级兴趣，如果正确请勾选</p>
        </div>
        <div v-else v-show="step === 4" class="info-tip-long">填写完毕，请提交问卷！</div>
        <el-form-item v-show="step < 5">
          <div class="clearfix">
            <el-button class="right" type="primary" v-show="step === 4" @click="handleSubmit()">提交问卷</el-button>
            <el-button class="right" type="primary" @click="handleNextStep()" v-show="step < 4">下一步</el-button>
            <el-button class="right" style="margin-right: 5px;margin-bottom: 5px;" @click="step--" v-show="step > 0">上一步</el-button>
          </div>
        </el-form-item>
        <div v-show="step === 5" class="info-tip-long">测评问卷提交成功，感谢您的支持！</div>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
import { Message } from "element-ui";
import { category, cateNameMap } from "@/utils/config"
import img_bg from "@/assets/questionnaire_bg.jpg";
import img_header from "@/assets/questionnaire_header_bg.jpg";

export default {
  name: "Questionnaire",
  data() {
    return {
      img_bg,
      img_header,
      APIConf: {
        getThird: "http://172.16.139.44:23003/user_interest",
        saveTest: "/user/userTest"
      },
      cateArr: [],
      secondArr: [],
      secondMap: [],
      thirdArr: [], // third_random_tags 接口获取长期与短期兴趣，并取其中的50个
      step: 0,
      activeNames: [0],
      formAdd: {
        uid: "",
        user_like: "",
        first_tags: [],
        second_tags: [],
        third_tags: []
      },
      checkAllFirst: false,
      checkStateFirst: false,
      checkAllSecond: false,
      checkStateSecond: false,
      checkAllThird: false,
      checkStateThird: false,
      rules: {
        uid: [
          { required: true, message: "请输入UID", trigger: "blur" },
          { required: true, message: "请输入UID", trigger: "change" },
          { type: 'number', message: '请输入有效的UID'}
        ],
        user_like: [
          { required: true, message: "请输入感兴趣的品类/关键词", trigger: "blur" },
          { required: true, message: "请输入感兴趣的品类/关键词", trigger: "change" }
        ],
        first_tags: [
          { required: true, message: "请勾选感兴趣的一级标签", trigger: "blur" },
          { required: true, message: "请勾选感兴趣的一级标签", trigger: "change" }
        ],
        second_tags: [
          { required: true, message: "请勾选感兴趣的二级标签", trigger: "blur" },
          { required: true, message: "请勾选感兴趣的二级标签", trigger: "change" }
        ]
      }
    };
  },
  created() {
    document.title = "用户兴趣调查问卷";
    this.setAllFirstName(category);
  },
  methods: {
    setAllFirstName(obj) { // 获取所有一级兴趣中文
      this.cateArr = Object.keys(obj).map(key=> obj[key]);
    },
    setSecondName(arr) { // 获取用户选中的一级兴趣下的二级兴趣中文
      this.checkAllSecond = false;
      this.checkStateSecond = false;
      this.formAdd.second_tags = [];
      this.secondArr = [];
      this.secondMap = [];
      this.activeNames = [];
      for (let i=0; i<arr.length; i++){
        this.secondArr.push(...cateNameMap[arr[i]]);
        this.secondMap.push(
          {
            name: arr[i],
            list: [...cateNameMap[arr[i]]]
          }
        );
        this.activeNames.push(i);
      }
    },
    getThirdTags() {
      const tempData = {
        url: this.APIConf.getThird,
        param: {
          uid: this.formAdd.uid
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230,
        isLoad: false
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        try {
          let shortTemp = res[5]['短期小时级增量'][2]['三级领域'];
          let longTemp = res[6]['长期'][2]['三级领域'];
          let cate = [];
          Object.keys(shortTemp).map(key=> {
            cate.push(...shortTemp[key]);
          });
          Object.keys(longTemp).map(key=> {
            cate.push(...longTemp[key]);
          })
          this.setThirdName(cate);
        } catch(err) {
          this.thirdArr = [];
          console.log('三级兴趣获取失败：', err);
        }
      }, err => {
        this.thirdArr = [];
        console.log('获取三级兴趣接口请求失败：', err);
      });
    },
    setThirdName(arr) {
      let allTags = [];
      for (let i=0; i<arr.length; i++){
        if (arr[i] && arr[i].indexOf('1042015:') === -1) {
          const temp = arr[i].split(':');
          allTags.push(temp[0]);
        }
      }
      this.thirdArr = Array.from(new Set(allTags)).slice(0, 50); //数组去重，再选取前50个兴趣标签
    },
    hanleUid(val) {
      if (val && !isNaN(val)) {
        this.checkAllThird =  false;
        this.checkStateThird = false;
        this.formAdd.third_tags = [];
        this.thirdArr = [];
        this.getThirdTags();
      }
    },
    handleCheckAllFirstTag(val) {
      this.formAdd.first_tags = val ? this.cateArr : [];
      this.checkStateFirst = false;
      this.setSecondName(this.formAdd.first_tags);
    },
    handleCheckedFirstTags(val) {
      let count = val.length;
      this.checkAllFirst = count === this.cateArr.length;
      this.checkStateFirst = count > 0 && count < this.cateArr.length;
      this.setSecondName(val);
    },
    handleCheckAllSecondTag(val) {
      this.formAdd.second_tags = val ? this.secondArr : [];
      this.checkStateSecond = false;
    },
    handleCheckedSecondTags(val) {
      let count = val.length;
      this.checkAllSecond = count === this.secondArr.length;
      this.checkStateSecond = count > 0 && count < this.secondArr.length;
    },
    handleCheckAllThirdTag(val) {
      this.formAdd.third_tags = val ? this.thirdArr : [];
      this.checkStateThird = false;
    },
    handleCheckedThirdTags(val) {
      let count = val.length;
      this.checkAllThird = count === this.thirdArr.length;
      this.checkStateThird = count > 0 && count < this.thirdArr.length;
    },
    handleNextStep() {
      switch(this.step) {
        case 0:
          if (this.formAdd.uid && !isNaN(this.formAdd.uid)) {
            this.step++;
          } else {
            Message({
              showClose: true,
              message: "请输入有效的UID！",
              type: "error",
              duration: 3000
            });
          }
          break;
        case 1:
          if (this.formAdd.user_like) {
            this.step++;
          } else {
            Message({
              showClose: true,
              message: "请输入感兴趣的品类/关键词！",
              type: "error",
              duration: 3000
            });
          }
          break;
        case 2:
          if (this.formAdd.first_tags.length > 0) {
            this.step++;
          } else {
            Message({
              showClose: true,
              message: "请勾选感兴趣的一级标签！",
              type: "error",
              duration: 3000
            });
          }
          break;
        case 3:
          if (this.formAdd.second_tags.length > 0) {
            this.step++;
          } else {
            Message({
              showClose: true,
              message: "请勾选感兴趣的二级标签！",
              type: "error",
              duration: 3000
            });
          }
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      this.$confirm("将保存您的问卷, 是否继续?", "确认提交问卷", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.saveTest();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    saveTest() {
      let tempData = {
        uid: this.formAdd.uid,
        user_like: this.formAdd.user_like,
        first_tags: this.formAdd.first_tags.join(','),
        second_tags: this.formAdd.second_tags.join(','),
        third_tags: this.formAdd.third_tags.join(','),
        third_random_tags: this.thirdArr.join(',')
      }
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      const data = {
        url: this.APIConf.saveTest,
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            this.step = 5;
            Message({
              showClose: true,
              message: "问卷提交成功！",
              type: "success",
              duration: 3000
            });
          } else if (res.code && Number(res.code) == 400){
            this.step = 0;
            Message({
              showClose: true,
              message: "UID已存在，请重新输入UID！",
              type: "error",
              duration: 0
            });
          } else {
            Message({
              showClose: true,
              message: "问卷提交失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "问卷提交接口请求错误",
            type: "error",
            duration: 0
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  padding-bottom: 20px;
  height: 100%;
  min-height: 600px;
  color: #333;
  line-height: 100%;
  background-color: #f3f6fa;
  background-repeat: repeat-x;
  background-size: 1px 300px;
  overflow: scroll;
  .pan-top-wrap {
    width: 100%;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 910px 144px;
    padding-top: 120px;
    margin: 0 auto;
  }
  .content-box-wrap {
    margin: 0 auto;
    max-width: 920px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 1px 6px 0px #cddcf5;
    border: 1px solid #cddcf5;
    border-radius: 3px;
    .pane-title {
      margin-bottom: 20px;
      padding: 15px 0;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #5A83E5;
      line-height: 30px;
    }
    .info-tip {
      padding-left: 120px;
      font-size: 12px;
      color: #ebb563;
    }
    .info-tip-long {
      padding: 10px 0;
      line-height: 20px;
      text-align: center;
      font-size: 18px;
      color: #E6A23C;
    }
  }
}
</style>
