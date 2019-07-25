<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>{{title || '关键词'}}</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline" v-if="channelList" size="mini">
          <el-form-item label="关键词">
            <el-input v-model="formInline.keyword" placeholder="请输入关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择频道">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道">
              <el-option label="所有频道" value="all:all"></el-option>
              <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-else-if="channelApi == null">
        loading……
      </el-col>
      <el-col :span="24" v-else-if="channelApi == 'response failed'">
        <el-alert title="网络请求异常，请重试~" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
      <el-col :span="24" v-else-if="channelApi == true">
        <el-alert title="暂无有权限的频道" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix" v-if="channelList && channelList.length > 0">
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加关键词</el-button>
        </div>
        <el-dialog title="添加关键词" :visible.sync="dialogVisible">
          <el-form :model="formWord" label-position="left">
            <el-form-item label="选择频道" label-width="80px" required v-if="channelList" size="small">
              <el-select v-model="formWord.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词" label-width="80px" required size="small">
              <el-input v-model="formWord.keyword" placeholder="请输入关键词" clearable style="max-width: 194px"></el-input>
            </el-form-item>
            <el-form-item size="small">
              <el-checkbox v-model="isAddTag">添加标签</el-checkbox>
              <el-form :model="formTag" size="mini" class="inner-form-box" v-if="isAddTag">
                <el-form-item label="内容标签" label-width="100px" required>
                  <el-select v-model="formTag.first_level" filterable placeholder="请选择一级分类" clearable @change="setTypeList()">
                    <el-option v-for="(item, key) in tagList" :key="key" :label="item.name" :value="key"></el-option>
                  </el-select>
                  <el-select v-model="formTag.type" filterable placeholder="请选择内容标签类型" clearable>
                    <el-option v-for="(val, key) in typeList" :key="key" :label="val" :value="val"></el-option>
                  </el-select>
                  <div style="color: #e6a23c;font-size: 12px;">请先选择一级分类，再选择内容标签类型！</div>
                </el-form-item>
                <el-form-item label="辅助关键词" label-width="100px">
                  <el-input type="textarea" v-model="formTag.keywords" placeholder="使用#$#当分割符" clearable style="max-width: 360px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="formTag.is_ambiguous" :true-label="1" :false-label="0">有歧义</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="formTag.is_interest" :true-label="1" :false-label="0">添加兴趣标签</el-checkbox>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-form>
          <div style="color: #e6a23c;text-align: right;">此处只支持单个添加，一次性添加多个请联系
            <a class="link-btn" title="QQ联系">@侯雷平（QQ：35675340）、 @李坤（QQ：46163936）</a>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="formWord.popover">
              <p>确定添加关键词？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formWord.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="keywordList && keywordList.data">
          <el-table :data="keywordList.data" style="width: 100%" border stripe size="mini">
            <el-table-column fixed align="left" prop="keyword" label="关键词">
            </el-table-column>
            <el-table-column align="left" prop="channel_name" label="频道">
            </el-table-column>
            <el-table-column align="left" prop="create_time" label="添加时间">
              <template slot-scope="scope">{{_parseTime(scope.row.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</template>
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column width="70" align="left" prop="status" label="状态">
              <template slot-scope="scope">{{scope.row.status === 1 ? '在线上' : '已下线'}}</template>
            </el-table-column>
            <el-table-column align="left" label="操作项" min-width="90">
              <template slot-scope="scope">
                <operate-keyword :data="scope.row" :kapi="kapi" :callback="onSearch"></operate-keyword>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.curPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
            </el-pagination>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { tags } from "@/utils/tagmap";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import OperateKeyword from "./operate";

export default {
  name: "keywordList",
  components: {
    Auth,
    OperateKeyword
  },
  data() {
    return {
      title: "关键词白名单",
      kapi: {
        //关键词白名单API
        get: "/channel/getKeywordByCid",
        add: "/channel/addChannelKeyword",
        set: "/channel/setCKeyStatus",
        del: "/channel/delChannelKeyword"
      },
      dialogVisible: false,
      defaultChannel: "",
      formInline: {
        ckey: "all:all",
        keyword: "",
        curPage: 1,
        count: 5,
        total: 0
      },
      formWord: {
        keyword: "",
        ckey: "",
        popover: false
      },
      isAddTag: false,
      formTag: {
        first_level: "",
        type: "",
        keywords: "",
        is_ambiguous: 0,
        is_interest: 0
      },
      tagList: tags,
      typeList: [],
      keywordList: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelList", "channelApi"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.setChannelList();
      }
    },
    setChannelList() {
      const data = {
        url: "/channel/getAuthChannelList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetChannelList", data);
    },
    onSearch() {
      const keyArr = this.formInline.ckey.split(":");
      const data = {
        url: this.kapi.get,
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          keyword: this.formInline.keyword,
          username: this.email,
          page: this.formInline.curPage,
          count: this.formInline.count,
          cip: 230
        }
      };
      this.$store.dispatch("GetKeywordList", data).then(res => {
        this.keywordList = res;
      });
    },
    showAdd() {
      this.formWord.ckey =
        this.formInline.ckey == "all:all"
          ? this.defaultChannel
          : this.formInline.ckey;
      this.dialogVisible = true;
    },
    addEvent() {
      //添加单个关键词
      this.formWord.popover = false;
      if (!this.formWord.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formWord.keyword) {
        Message({
          showClose: true,
          message: "请输入关键词！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.isAddTag) {
        if (!this.formTag.first_level) {
          Message({
            showClose: true,
            message: "请选择内容标签一级分类！",
            type: "error",
            duration: 3000
          });
          return;
        }
        if (!this.formTag.type) {
          Message({
            showClose: true,
            message: "请选择内容标签类型！",
            type: "error",
            duration: 3000
          });
          return;
        }
        this.setTag();
      }
      this.dialogVisible = false;
      const keyArr = this.formWord.ckey.split(":");
      const data = {
        url: this.kapi.add,
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          keyword: this.formWord.keyword,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("AddKeywordList", data).then(() => {
        this.cancelEvent();
        this.onSearch();
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formWord = {
        keyword: "",
        ckey: ""
      };
      this.isAddTag = false;
      this.formTag = {
        first_level: "",
        type: "",
        keywords: "",
        is_ambiguous: 0,
        is_interest: 0
      };
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.curPage = val;
      this.onSearch();
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    setTypeList() {
      if (this.formTag.first_level) {
        this.typeList = tags[this.formTag.first_level].typeList;
      } else {
        this.formTag.type = "";
        this.typeList = [];
      }
    },
    setTag() {
      const tempData = {
        url: "http://10.77.6.239:9905/addtag",
        param: {
          username: this.email,
          name: this.formWord.keyword,
          ...this.formTag
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (!(res && res.errno == 200)) {
            Message({
              showClose: true,
              message: "标签添加失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "标签添加失败！",
            type: "error",
            duration: 0
          });
        }
      );
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    channelList() {
      if (this.channelList && this.channelList.length > 0) {
        this.defaultChannel = `${this.channelList[0].channel_history}:${
          this.channelList[0].cid
        }`;
        this.formInline.ckey = this.defaultChannel;
        this.onSearch();
      }
    },
    keywordList() {
      this.keywordList && (this.formInline.total = this.keywordList.total);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  .pane-title-wrap {
    padding: 20px 14px;
    background: #fff;
    border-bottom: 1px solid #f0f2f5;
    .pane-title {
      font-size: 16px;
      color: #409eff;
      text-align: left;
    }
  }
  .search-form-wrap {
    padding-left: 14px;
    padding-top: 18px;
    background-color: #fff;
    border-bottom: 1px solid #f0f2f5;
  }
  .content-box-wrap {
    padding: 10px;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.inner-form-box {
  margin-top: 10px;
  margin-left: 24px;
  padding: 10px;
  border: 1px dashed #ddd;
  border-radius: 5px;
}
</style>