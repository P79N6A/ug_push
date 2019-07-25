<template>
  <el-main>
    <el-row type="flex" justify="center" class="pane-title-wrap">
      <el-col :span="23">
        <h6 class="pane-title">
          <i class="el-icon-document" style="margin-right: 6px;"></i>{{title}}</h6>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="23" style="font-size: 14px; color: #606266;">
        <p>白名单管理后台，是提供给各垂直领域业务方，针对头部白名单账号的管理与运营工具，同时应用于热门流的作者特征挖掘。</p><br />
        <p>目标是促进用户可持续的稳定的生产健康的专业的内容，将流量资源计算分配给更有成长性和收益性的作者，提升兴趣消费的效率与规模。</p><br />
        <h3>管理后台功能概括：</h3><br>
        <ol style="padding-left: 20px;">
          <li>更新领域白名单，包括：增加单个UID、批量上传UID、将UID从白名单中踢出（下线）。</li>
          <li>筛选白名单，包括：编辑状态、F层级</li>
          <li>编辑单个白名单账号，包括：
            <ul style="padding-left: 20px;">
              <li>针对受保护账号的选项：是否为新拓展大V，是否为有降频流失风险，是否已签MCN机构；</li>
              <li>选择账号类型：个人账号、自媒体、媒体、企业、营销号；依次的示例账号分别为：@李永乐老师 、@互联网的那点事、@人民日报、@爱奇艺、@娱乐搜查</li>
              <li>选择账号级别：用户生产内容的原创度、垂直度、健康度。分五个档。运营根据经验、观察、理解进行判断选择。</li>
            </ul>
          </li>
        </ol>
        <p>以下针对用户分级标准做详细说明和举例。</p><br>
        <p>头部用户分级评估，是从内容生产角度衡量头部用户生产状况的一个划分机制。</p><br>
        <p>考量的维度包括三项：原创度、垂直度、健康度。会从人工和机器两个方向进行交叉评估。</p><br><br>
        <p>三个维度的指标定义和分级说明如下</p><br>
        <h3>1. 原创度</h3><br>
        <h4 style="padding-left: 20px;">1）定义</h4><br>
        <div style="padding-left: 40px;">
          <p>鼓励作者原创，优先在微博平台发布。</p><br>
          <p>考量直发（区分于转发）微博中，原创和搬运内容的比例。</p><br>
        </div>
        <h4 style="padding-left: 20px;">2）分级</h4><br>
        <div style="padding-left: 40px;">
          <el-table :data="originData" style="width: 100%" border stripe :show-header="false">
            <el-table-column align="left" prop="degree"></el-table-column>
            <el-table-column align="left" prop="value"></el-table-column>
            <el-table-column align="left" prop="info"></el-table-column>
          </el-table>
        </div><br>
        <h3>2. 垂直度</h3><br>
        <h4 style="padding-left: 20px;">1）定义</h4><br>
        <div style="padding-left: 40px;">
          <p>鼓励作者专注于某专业领域持续深度创作内容。</p><br>
          <p>考量直发微博中，其内容是否跟当前垂直领域一致。</p><br>
        </div>
        <h4 style="padding-left: 20px;">2）分级</h4><br>
        <div style="padding-left: 40px;">
          <el-table :data="verticalhData" style="width: 100%" border stripe :show-header="false">
            <el-table-column align="left" prop="degree"></el-table-column>
            <el-table-column align="left" prop="value"></el-table-column>
            <el-table-column align="left" prop="info"></el-table-column>
          </el-table>
        </div><br>
        <h3>3. 健康度</h3><br>
        <h4 style="padding-left: 20px;">1）定义</h4><br>
        <div style="padding-left: 40px;">
          <p>鼓励作者健康言论，命中垃圾、营销、广告等关键词、敏感词、链接等扣分。</p><br>
          <p>考量发布微博中，违规、不良或广告营销信息的比例。</p><br>
        </div>
        <h4 style="padding-left: 20px;">2）分级</h4><br>
        <div style="padding-left: 40px;">
          <el-table :data="healthData" style="width: 100%" border stripe :show-header="false">
            <el-table-column align="left" prop="degree"></el-table-column>
            <el-table-column align="left" prop="value"></el-table-column>
            <el-table-column align="left" prop="info"></el-table-column>
          </el-table>
        </div>
        <br>
        <h3>举例：</h3><br>
        <p>以下示例仅供参考。</p><br>
        <div style="width: 100%;overflow: auto;">
          <img style="width: 650px;border-radius: 5px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);border: 1px solid #ebeef5;" title="用户白名单编辑示例" alt="用户白名单编辑示例" :src="img_doc" />
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import img_doc from "@/assets/doc.png";

export default {
  name: "whiteListDocument",
  data() {
    return {
      title: "用户分级标准与编辑手册",
      img_doc,
      originData: [
        {
          degree: "原创度1级",
          value: "极低",
          info: "直发微博原创比例20%以下"
        },
        {
          degree: "原创度2级",
          value: "较低",
          info: "直发微博原创比例21%-40%"
        },
        {
          degree: "原创度3级",
          value: "一般",
          info: "直发微博原创比例41%-60%"
        },
        {
          degree: "原创度4级",
          value: "良好",
          info: "直发微博原创比例61%-80%"
        },
        {
          degree: "原创度5级",
          value: "极好",
          info: "直发微博原创比例81%-100%"
        }
      ],
      verticalhData: [
        {
          degree: "垂直度1级",
          value: "极低",
          info: "同领域匹配度20%以下"
        },
        {
          degree: "垂直度2级",
          value: "较低",
          info: "同领域匹配度21%-40%"
        },
        {
          degree: "垂直度3级",
          value: "一般",
          info: "同领域匹配度41%-60%"
        },
        {
          degree: "垂直度4级",
          value: "良好",
          info: "同领域匹配度61%-80%"
        },
        {
          degree: "垂直度5级",
          value: "极好",
          info: "同领域匹配度81%-100%"
        }
      ],
      healthData: [
        {
          degree: "健康度1级",
          value: "极低",
          info: "不健康内容占比51%以上"
        },
        {
          degree: "健康度2级",
          value: "较低",
          info: "不健康内容占比21%-50%"
        },
        {
          degree: "健康度3级",
          value: "一般",
          info: "不健康内容占比11%-20%"
        },
        {
          degree: "健康度4级",
          value: "良好",
          info: "不健康内容占比5%-10%"
        },
        {
          degree: "健康度5级",
          value: "极好",
          info: "不健康内容占比0%-4%"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
// .pane-title-wrap {
//   margin-bottom: 20px;
//   .pane-title {
//     font-size: 20px;
//     color: #409eff;
//     text-align: center;
//   }
// }
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
  .content-box-wrap {
    padding: 10px;
  }
}
</style>