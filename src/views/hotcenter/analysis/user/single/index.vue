<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="search-form-wrap">
      <el-col>
        <el-form
          :inline="true"
          size="small"
        >
          <el-form-item>
            <el-select
              v-model="formInline.flag"
              placeholder="请选择"
              style="max-width: 72px;"
              @change="formInline.input = ''"
            >
              <el-option
                label="uid"
                :value="1"
              ></el-option>
              <el-option
                label="昵称"
                :value="2"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              style="max-width: 170px"
              v-model="formInline.input"
              placeholder="请输入"
              clearable
            ></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSearch"
            >
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row
      v-if="featureData"
      class="thumb-box content-box-wrap"
    >
      <el-col>
        <el-row>
          <el-col v-if="featureData.main">
            <el-row
              type="flex"
              align="middle"
              class="thumb-wrap"
            >
              <a
                style="display:inline-block;font-size:12px;color:#606266;"
                :title="`进入<${featureData.main.name}>的主页`"
                :href="`//weibo.com/u/${featureData.main.uid}`"
                target="_blank"
              >
                <pan-thumb
                  class="thumb-content"
                  :image="featureData.main.head"
                  width="60px"
                  height="60px"
                >{{featureData.main.name}}</pan-thumb>
              </a>
              <a
                class="author-name"
                :title="featureData.main.name"
                :href="`//weibo.com/u/${featureData.main.uid}`"
                target="_blank"
              >{{featureData.main.name}}</a>
            </el-row>
          </el-col>
          <el-col v-if="featureData.main_tag">
            <el-tag
              :key="key"
              v-for="(item, key) in featureData.main_tag"
              type="primary"
            >{{item}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            v-if="featureData.acount_status"
            style="margin-top:10px;"
          >
            <el-card>
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="danger"
                  size="small"
                >账号属性</el-button>
              </div>
              <div style="margin-bottom:50px;">
                <el-col
                  :xs="8"
                  :span="5"
                  class="text-center"
                >
                  <a class="pan-btn yellow-btn">粉丝数<br />{{_formatNum(featureData.acount_status.followers)}}</a>
                </el-col>
                <el-col
                  :xs="8"
                  :span="5"
                  class="text-center"
                >
                  <a class="pan-btn green-btn">关注数<br />{{_formatNum(featureData.acount_status.followings)}}</a>
                </el-col>
                <el-col
                  :xs="8"
                  :span="3"
                  class="text-center"
                >
                  <a class="pan-btn pink-btn">用户类型<br />{{featureData.acount_status.user_type}}</a>
                </el-col>
                <el-col
                  :xs="8"
                  :span="3"
                  class="text-center"
                >
                  <a class="pan-btn yellow-btn">V类型<br />{{featureData.acount_status.user_V_type}}</a>
                </el-col>
                <el-col
                  :xs="8"
                  :span="4"
                  class="text-center"
                >
                  <a class="pan-btn green-btn">用户cLevel<br />{{featureData.acount_status.user_C_level}}</a>
                </el-col>
                <el-col
                  :xs="8"
                  :span="4"
                  class="text-center"
                >
                  <a class="pan-btn pink-btn">登录频次<br />{{featureData.acount_status.user_freq_type}}</a>
                </el-col>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :span="8"
            v-if="featureData.nature_status"
            style="margin-top:10px;"
          >
            <el-card>
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="success"
                  size="small"
                >自然属性</el-button>
              </div>
              <div style="margin-bottom:50px;">
                <el-col
                  :span="7"
                  class="text-center"
                >
                  <a class="pan-btn pink-btn">性别<br />{{featureData.nature_status.gender}}</a>
                </el-col>
                <el-col
                  :span="8"
                  class="text-center"
                >
                  <a class="pan-btn yellow-btn">年龄段<br />{{featureData.nature_status.age}}</a>
                </el-col>
                <el-col
                  :span="8"
                  class="text-center"
                >
                  <a class="pan-btn green-btn">居住地<br />{{featureData.nature_status.position}}</a>
                </el-col>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :span="16"
            v-if="featureData.ago_status"
            style="margin-top:10px;"
          >
            <el-card>
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="info"
                  size="small"
                >历史画像</el-button>
              </div>
              <div style="margin-bottom:50px;">
                <el-col
                  :xs="12"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="6"
                  class="text-center"
                >
                  <a class="pan-btn blue-btn">本周互动<br />{{_formatNum(featureData.ago_status.week_interact)}}</a>
                </el-col>
                <el-col
                  :xs="12"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="6"
                  class="text-center"
                >
                  <a class="pan-btn light-blue-btn">本周曝光<br />{{_formatNum(featureData.ago_status.week_expo)}}</a>
                </el-col>
                <el-col
                  :xs="12"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="6"
                  class="text-center"
                >
                  <a class="pan-btn blue-btn">本月互动<br />{{_formatNum(featureData.ago_status.month_interact)}}</a>
                </el-col>
                <el-col
                  :xs="12"
                  :sm="6"
                  :md="6"
                  :lg="6"
                  :xl="6"
                  class="text-center"
                >
                  <a class="pan-btn light-blue-btn">本月曝光<br />{{_formatNum(featureData.ago_status.month_expo)}}</a>
                </el-col>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_first_long"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >长期一级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_first_long"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_second_long"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >长期二级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_second_long"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_third_long"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >长期三级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_third_long"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_first_short"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >短期一级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_first_short"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_second_short"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >短期二级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_second_short"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.interest_third_short"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >短期三级兴趣</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.interest_third_short"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.intimacy_status"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="warning"
                  size="small"
                >亲密度</el-button>
              </div>
              <el-row
                type="flex"
                justify="space-between"
                align="middle"
                class="thumb-wrap"
                style="margin-bottom: 10px;"
                :key="key"
                v-for="(item, key) in featureData.intimacy_status"
              >
                <a
                  style="display:inline-block;font-size:12px;color:#606266;"
                  :title="`进入<${item.name}>的主页`"
                  :href="`//weibo.com/u/${item.uid}`"
                  target="_blank"
                >
                  <span style="position: relative;top: -8px;display: inline-block;width: 50px">NO.{{key + 1}}</span>
                  <pan-thumb
                    class="thumb-content"
                    :image="item.head"
                    width="30px"
                    height="30px"
                  >{{item.name}}</pan-thumb>
                </a>
                <a
                  class="author-name"
                  :title="item.name"
                  :href="`//weibo.com/u/${item.uid}`"
                  target="_blank"
                >{{item.name}}</a>
                <span>{{_parsePercent(formatWeight(item.weight))}}</span>
              </el-row>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.ability1"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >一级能力</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.ability1"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.display_name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="featureData.ability1"
            style="margin-top:10px;"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <el-button
                  type="primary"
                  size="small"
                >二级能力</el-button>
              </div>
              <div class="progress-box">
                <div
                  class='progress-item'
                  :key="key"
                  v-for="(item, key) in featureData.ability2"
                >
                  <span style="display: inline-block;width: 50px; color: #666">No.{{key + 1}}</span>
                  <span>{{item.display_name}}</span>
                  <el-progress :percentage="formatWeight(item.weight)"></el-progress>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import Auth from "@/components/Tips/Auth";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { formatNum, parsePercent } from "@/utils";

export default {
  name: "querymaterial",
  components: {
    Auth,
    PanThumb
  },
  data() {
    return {
      formInline: {
        input: "1111681197",
        flag: 1
      },
      featureData: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      const data = {
        url: "/feature/getFeature",
        params: {
          input: this.formInline.input,
          flag: this.formInline.flag,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetFeature", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.featureData = res.result;
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
        } else {
          const tips = res.msg || "查询失败";
          Message({
            showClose: true,
            message: tips,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    _formatNum(num) {
      return isNaN(num) ? num || "暂无" : formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    formatWeight(num) {
      return Number(formatNum(num, 2));
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    email() {}
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  // background-color: #f0f2f5;
  color: #333;
  line-height: 100%;
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
.thumb-box {
  margin-bottom: 20px;
  .thumb-wrap {
    .thumb-content {
      cursor: pointer;
    }
    .author-name {
      margin-left: 5px;
      font-size: 14px;
      color: #606266;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}

.box-card {
  height: 585px;
}
.pan-btn {
  position: relative;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  min-height: 60px;
  font-size: 14px;
  text-align: center;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: all 0.6s ease;
  &:hover {
    background: #fff;
    &:after,
    &:before {
      width: 0;
      transition: all 0.6s ease;
    }
  }
  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 100%;
    transition: all 0.4s ease;
  }
  &:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
}
.blue-btn {
  color: #324157;
  &:after,
  &:before {
    background: #324157;
  }
}
.light-blue-btn {
  color: #3a71a8;
  &:after,
  &:before {
    background: #3a71a8;
  }
}
.pink-btn {
  color: #f56c6c;
  &:after,
  &:before {
    background: #f56c6c;
  }
}
.green-btn {
  color: #67c23a;
  &:after,
  &:before {
    background: #67c23a;
  }
}
.yellow-btn {
  color: #fec171;
  &:after,
  &:before {
    background: #fec171;
  }
}
.tiffany-btn {
  color: #4ab7bd;
  &:after,
  &:before {
    background: #4ab7bd;
  }
}
</style>
<style lang="scss">
body {
  .progress-box {
    height: 475px;
    overflow: auto;
    .progress-item {
      margin-bottom: 14px;
      font-size: 14px;
      .el-progress-bar {
        width: 90%;
      }
    }
  }
}
</style>
