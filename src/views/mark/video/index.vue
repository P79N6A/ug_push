<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">视频打标签</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline :model="formInline" size="small">
          <el-form-item label="视频id">
            <el-input
              style="min-width: 290px;"
              v-model="formInline.id"
              placeholder="请输入视频mid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              style="min-width: 290px;"
              v-model="searchName"
              placeholder="请输入用户名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.type" placeholder="请选择标注类型" clearable>
              <el-option label="未标注" :value="0"></el-option>
              <el-option label="已标注" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formInline.checkType" placeholder="请选择审核状态" clearable>
              <el-option label="未审核" :value="1"></el-option>
              <el-option label="审核未通过" :value="2"></el-option>
              <el-option label="审核通过" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频范围">
            <el-input v-model="formInline.group" placeholder="图片范围，英文逗号分隔" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              style="margin-bottom: 5px;width: 170px;"
              v-model="time"
              type="date"
              format="yyyy年MM月dd日"
              value-format="timestamp"
              placeholder="选择时间"
            ></el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
          <el-form-item label="显示博文">
            <el-switch v-model="textBtnState"></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <item-list
        :key="idx"
        v-for="(item, idx) in list"
        :item="item"
        :index="(formInline.page - 1) * formInline.count + idx + curIndex"
        :textBtnState="textBtnState"
        :label="label"
        :label_list="label_list"
      ></item-list>
      <div style="padding-top: 10px;overflow: auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.page"
          :page-sizes="[5, 10, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/itemList";

export default {
  name: "Markvideo",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      formInline: {
        id: "", // 图片id
        type: "", // 数字0/1， 0表示未标注，1表示标注
        group: "1,50", // 图片范围， 逗号分隔的字符串
        page: 1, // 查询的页码
        count: 5, // 每页的数量
        isLabel: "",
        checkType: ""
      },
      searchName: "",
      textBtnState: false,
      time: "", // 时间戳，标注时间 13位
      total: 0,
      list: [],
      label_list: [],
      curIndex: 1,
      label: [
        {
          id: 0,
          label: "美食",
          children: [
            {
              id: 40,
              label: "烹饪教程"
            },
            {
              id: 41,
              label: "甜品"
            },
            {
              id: 42,
              label: "水果"
            },
            {
              id: 43,
              label: "酒"
            },
            {
              id: 44,
              label: "茶"
            },
            {
              id: 45,
              label: "饮料"
            },
            {
              id: 46,
              label: "点评"
            },
            {
              id: 47,
              label: "菜谱"
            },
            {
              id: 48,
              label: "厨具"
            },
            {
              id: 49,
              label: "餐具"
            },
            {
              id: 50,
              label: "其他"
            }
          ]
        },
        {
          id: 1,
          label: "体育",
          children: [
            {
              id: 51,
              label: "体育资讯"
            },
            {
              id: 52,
              label: "足球"
            },
            {
              id: 53,
              label: "篮球"
            },
            {
              id: 54,
              label: "羽毛球"
            },
            {
              id: 55,
              label: "兵兵球"
            }
          ]
        },
        {
          id: 2,
          label: "搞笑幽默",
          children: [
            {
              id: 56,
              label: "表情包"
            },
            {
              id: 57,
              label: "神评论"
            },
            {
              id: 58,
              label: "萌娃熊宝"
            },
            {
              id: 59,
              label: "相声"
            }
          ]
        },
        {
          id: 3,
          label: "动漫",
          children: [
            {
              id: 60,
              label: "火影忍者"
            },
            {
              id: 61,
              label: "表情包"
            },
            {
              id: 62,
              label: "表情包"
            },
            {
              id: 63,
              label: "表情包"
            }
          ]
        },
        {
          id: 4,
          label: "旅游出行",
          children: [
            {
              id: 64,
              label: "风景"
            },
            {
              id: 65,
              label: "旅游攻略"
            },
            {
              id: 66,
              label: "其他"
            }
          ]
        },
        {
          id: 5,
          label: "家装家居",
          children: [
            {
              id: 67,
              label: "厨卫电器"
            },
            {
              id: 68,
              label: "家庭设计"
            },
            {
              id: 69,
              label: "其他"
            }
          ]
        },
        {
          id: 6,
          label: "美妆",
          children: [
            {
              id: 70,
              label: "化妆"
            },
            {
              id: 71,
              label: "美甲"
            },
            {
              id: 72,
              label: "纹身"
            },
             {
              id: 73,
              label: "纹眉"
            },
            {
              id: 74,
              label: "香水"
            },
            {
              id: 75,
              label: "丰胸"
            },
             {
              id: 76,
              label: "整形"
            },
            {
              id: 77,
              label: "美发"
            },
            {
              id: 78,
              label: "其他"
            }
          ]
        },
        {
          id: 7,
          label: "时尚",
          children:[
            {
              id: 79,
              label: "时装周"
            },
            {
              id: 80,
              label: "街拍"
            },
            {
              id: 81,
              label: "时尚杂志"
            },
            {
              id: 82,
              label: "时尚服饰"
            },
            {
              id: 83,
              label: "时尚腕表"
            },
            {
              id: 84,
              label: "其他"
            },
          ]
        },
        {
          id: 8,
          label: "汽车",
          children: [
            {
              id: 85,
              label: "汽车"
            },
            {
              id: 86,
              label: "F1"
            },
            {
              id: 87,
              label: "摩托车"
            },
            {
              id: 88,
              label: "车展"
            },
            {
              id: 89,
              label: "其他"
            },
          ]
        },
        {
          id: 9,
          label: "人文艺术",
          children:[
            {
              id: 90,
              label: "舞蹈"
            },
            {
              id: 91,
              label: "曲艺"
            },
            {
              id: 92,
              label: "茶道"
            },
             {
              id: 93,
              label: "其他"
            },
            
          ]
        },
        {
          id: 10,
          label: "收藏"
        },
        {
          id: 11,
          label: "数码"
        },
        {
          id: 12,
          label: "音乐"
        },
        {
          id: 13,
          label: "运动健身"
        },
        {
          id: 14,
          label: "电视剧"
        },
        {
          id: 15,
          label: "电影"
        },
        {
          id: 16,
          label: "教育"
        },
        {
          id: 17,
          label: "财经"
        },
        {
          id: 18,
          label: "休闲娱乐"
        },
        {
          id: 19,
          label: "职场"
        },
        {
          id: 20,
          label: "游戏"
        },
        {
          id: 21,
          label: "星座命理"
        },
        {
          id: 22,
          label: "科学科普"
        },
        {
          id: 23,
          label: "奢侈品"
        },
        {
          id: 24,
          label: "军事"
        },
        {
          id: 25,
          label: "明星"
        },
        {
          id: 26,
          label: "婚庆"
        },
        {
          id: 27,
          label: "社会"
        },
        {
          id: 28,
          label: "时政"
        },
        {
          id: 29,
          label: "美女"
        },
        {
          id: 30,
          label: "帅哥"
        },
        {
          id: 31,
          label: "育儿"
        },
        {
          id: 32,
          label: "宠物"
        },
        {
          id: 33,
          label: "动物"
        },
        {
          id: 34,
          label: "植物"
        },
        {
          id: 35,
          label: "综艺"
        },
        {
          id: 36,
          label: "孕产"
        },
        {
          id: 37,
          label: "民俗"
        },
        {
          id: 38,
          label: "影视"
        },
        {
          id: 39,
          label: "其他"
        }
      ]
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
      const that = this;
      this.list = [];
      let uploadTime = this.time;
      uploadTime = uploadTime ? uploadTime : 0;
      const tempData = {
        url: "http://10.85.125.61:13142/query.json", // 接口请求地址
        param: {
          ...this.formInline,
          time: uploadTime,
          username: this.searchName // 用户邮箱前缀
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.curIndex = Number(this.formInline.group.split(",")[0]);
            this.list = res.result.data;
            this.total = res.result.total;
          } else {
            Message({
              showClose: true,
              message: res.msg || "视频查询失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "视频查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
    }
  },
  created() {
    this.label.forEach(row => {
      this.label_list.push({
        id: row.id,
        label: row.label
      });
    });
    this.label.forEach(row => {
      if ("children" in row) {
        row.children.forEach(item => {
          this.label_list.push(item);
        });
      }
    });
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  background-color: #f0f2f5;
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
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
    }
  }
}
</style>
