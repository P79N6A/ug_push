<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-bell hidden-xs-only" style="margin-right: 6px;"></i>整体数据监控</h6>
        </el-row>
        <!-- 热门微博各个业务场景的规模化数据 -->
        <el-row v-if="localData" class="content-box-wrap">
            <div class="table-title left">热门微博各个业务场景的规模化数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formLocal.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getLocalData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadLocalLoading" @click="handleDownloadLocal">导出</el-button>
            <el-table :data="localData" style="width: 100%;" border stripe size="mini">
                <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
                <el-table-column width="110" prop="stream_type" label="流类型">
                </el-table-column>
                <el-table-column prop="pv" sortable label="PV">
                  <template slot-scope="scope">
                    <span>{{_formatNum(scope.row.pv)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="uv" sortable label="UV">
                  <template slot-scope="scope">
                    <span>{{_formatNum(scope.row.uv)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="exposure" sortable label="曝光量">
                  <template slot-scope="scope">
                    <span>{{_formatNum(scope.row.exposure)}}</span>
                  </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 热门微博整体规模数据及主要流规模数据 -->
        <el-row v-if="entireData" class="content-box-wrap">
            <div class="table-title left">热门微博整体规模数据及主要流规模数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formEntire.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getEntireData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadEntireLoading" @click="handleDownloadEntire">导出</el-button>
            <el-table :data="entireData" style="width: 100%;" border stripe size="mini">
                <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                    <template slot-scope="scope">
                        <span>{{_parseTime(scope.row.dt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="70" prop="day" label="星期">
                </el-table-column>
                <el-table-column label="热门微博整体数据" align="center">
                  <el-table-column prop="pv_hotwb_all" sortable label="PV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.pv_hotwb_all)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="uv_hotwb_all" sortable label="UV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.uv_hotwb_all)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_hotwb_all" sortable label="曝光量" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure_hotwb_all)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="real_expo_hotwb_all" sortable label="真实曝光量" min-width="106">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.real_expo_hotwb_all)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="热门流" align="center">
                  <el-table-column prop="pv_hot" sortable label="PV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.pv_hot)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="uv_hot" sortable label="UV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.uv_hot)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_hot" sortable label="曝光量" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure_hot)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="real_expo_hot" sortable label="真实曝光量" min-width="106">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.real_expo_hot)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="频道流" align="center">
                  <el-table-column prop="pv_channel" sortable label="PV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.pv_channel)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="uv_channel" sortable label="UV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.uv_channel)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_channel" sortable label="曝光量" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure_channel)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="访客流" align="center">
                  <el-table-column prop="pv_youke" sortable label="PV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.pv_youke)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="uv_youke" sortable label="UV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.uv_youke)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_youke" sortable label="曝光量" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure_youke)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="real_expo_youke" sortable label="真实曝光量" min-width="106">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.real_expo_youke)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="榜单流" align="center">
                  <el-table-column prop="pv_list" sortable label="PV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.pv_list)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="uv_list" sortable label="UV" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.uv_list)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_list" sortable label="曝光量" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure_list)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="real_expo_list" sortable label="真实曝光量" min-width="106">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.real_expo_list)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 热门流体验类指标数据 -->
        <el-row v-if="hotData" class="content-box-wrap">
            <div class="table-title left">热门流体验类指标数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formHot.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getHotData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadHotLoading" @click="handleDownloadHot">导出</el-button>
            <el-table :data="hotData" style="width: 100%;" border stripe size="mini">
                <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                    <template slot-scope="scope">
                        <span>{{_parseTime(scope.row.dt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="70" prop="day" label="星期">
                </el-table-column>
                <el-table-column prop="thd_click" sortable label="千次点击" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_click)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="thd_act" sortable label="千次互动" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_act)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="average_fresh_times" sortable label="人均刷新" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.average_fresh_times)}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="pv" sortable label="PV" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uv" sortable label="UV" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatIntNum(scope.row.uv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="exposure" sortable label="曝光量" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.exposure)}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="two_save_rate" sortable label="次日留存(热门)" min-width="126">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.two_save_rate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="two_feed_save_rate" sortable label="次日留存(首页)" min-width="126">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.two_feed_save_rate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="online_time_exposure" sortable label="平均时长" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.online_time_exposure)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_online_time" sortable label="人均时长" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_online_time)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_list_online_time" sortable label="人均列表页时长" min-width="132">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_list_online_time)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_page_online_time" sortable label="人均详情页时长" min-width="132">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_page_online_time)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="follow_uv" sortable label="人均加关注" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.follow_uv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ad_first_exposure" sortable label="首位广告曝光量" min-width="132">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.ad_first_exposure)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="retweet" sortable label="转发量" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.retweet)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="comment" sortable label="评论量" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.comment)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="like_volume" sortable label="点赞量" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatIntNum(scope.row.like_volume)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="interact_volume" sortable label="互动量" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.interact_volume)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 访客流体验类指标数据 -->
        <el-row v-if="visitData" class="content-box-wrap">
            <div class="table-title left">访客流体验类指标数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formVisit.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getVisitData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadVisitLoading" @click="handleDownloadVisit">导出</el-button>
            <el-table :data="visitData" style="width: 100%;" border stripe size="mini">
                <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                    <template slot-scope="scope">
                        <span>{{_parseTime(scope.row.dt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="70" prop="day" label="星期">
                </el-table-column>
                <el-table-column prop="thd_thick" sortable label="千曝点击" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_thick)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv_uv" sortable label="人均刷新" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv_uv, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="two_save_rate" sortable label="次日留存" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.two_save_rate, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="seven_save_rate" sortable label="7日留存" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.seven_save_rate, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_online_time" sortable label="人均时长" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_online_time, 4)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_list_online_time" sortable label="人均列表页时长" min-width="132">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_list_online_time, 4)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="follow_uv" sortable label="人均加关注" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.follow_uv, 4)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 榜单流体验类指标数据 -->
        <el-row v-if="rankData" class="content-box-wrap">
            <div class="table-title left">榜单流体验类指标数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formVisit.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getRankData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadRankLoading" @click="handleDownloadRank">导出</el-button>
            <el-table :data="rankData" style="width: 100%;" border stripe size="mini">
                <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                    <template slot-scope="scope">
                        <span>{{_parseTime(scope.row.dt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="70" prop="day" label="星期">
                </el-table-column>
                <el-table-column prop="thd_thick" sortable label="千曝点击" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_thick)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="thd_act" sortable label="千曝互动" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_act)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv_uv" sortable label="人均刷新" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv_uv, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="two_save_rate" sortable label="次日留存" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.two_save_rate, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="seven_save_rate" sortable label="7日留存" min-width="96">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.seven_save_rate, 4)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avg_list_online_time" sortable label="人均列表页时长" min-width="132">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.avg_list_online_time, 4)}}（mins）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="follow_uv" sortable label="人均加关注" min-width="110">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.follow_uv, 4)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 热门流召回分析 -->
        <el-row v-if="callbackData" class="content-box-wrap">
            <div class="table-title left">热门流召回分析</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formCallback.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getCallbackData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadEntireLoading" @click="handleDownloadCallback">导出</el-button>
            <el-table :data="callbackData" style="width: 100%;" border stripe size="mini">
                <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
                <el-table-column width="120" prop="name" label="召回方式">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="曝光" align="center" >
                  <el-table-column prop="exposure" sortable label="数值" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.exposure)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="exposure_ratio" sortable label="占比" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_parsePercent(scope.row.exposure_ratio)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="thd_click" sortable label="千曝点击" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_click)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="thd_act" sortable label="千曝互动" min-width="86">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.thd_act)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 热门流物料来源分析 -->
        <!-- <el-row v-if="materialSourcesData" class="content-box-wrap">
            <div class="table-title left">热门流物料来源分析</div>
            <el-date-picker class="left" style="width: 290px;" v-model="formMaterial.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getMaterialSourcesData()">
            </el-date-picker>
            <el-button class="right" type="primary" size="mini" :loading="downloadMaterialSourcesLoading" @click="handleDownloadMaterialSources">导出</el-button>
            <el-table :data="materialSourcesData" style="width: 100%;" border stripe size="mini">
                <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
                <el-table-column align="center" width="100" prop="name" label="物料来源">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="物料日增数量" align="center" >
                  <el-table-column prop="daily_ruku_num" sortable label="数值" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.daily_ruku_num)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="daily_ruku_num_ratio" sortable label="占比" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_parsePercent(scope.row.daily_ruku_num_ratio)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="物料曝光个数" align="center" >
                  <el-table-column prop="whole_expo_weibo" sortable label="数值" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.whole_expo_weibo)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="whole_expo_weibo_ratio" sortable label="占比" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_parsePercent(scope.row.whole_expo_weibo_ratio)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="物料曝光总数" align="center" >
                  <el-table-column prop="whole_expo_num" sortable label="数值" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_formatNum(scope.row.whole_expo_num)}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="whole_expo_num_ratio" sortable label="占比" align="center" min-width="86">
                      <template slot-scope="scope">
                          <span>{{_parsePercent(scope.row.whole_expo_num_ratio)}}</span>
                      </template>
                  </el-table-column>
                </el-table-column>
            </el-table>
        </el-row> -->
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum, parseTime, formatIntNum, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth
  },
  data() {
    return {
      downloadEntireLoading: false,
      downloadHotLoading: false,
      downloadVisitLoading: false,
      downloadRankLoading: false,
      downloadCallbackLoading: false,
      downloadMaterialSourcesLoading: false,
      downloadLocalLoading: false,
      formEntire: {
        date: []
      },
      formHot: {
        date: []
      },
      formVisit: {
        date: []
      },
      formRank: {
        date: []
      },
      formCallback: {
        date: []
      },
      formMaterial: {
        date: []
      },
      formLocal: {
        date: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      entireData: [], //整体数据
      hotData: [], //热门流数据
      visitData: [], //访客流数据
      rankData: [], //榜单流数据
      callbackData: [], //热门流召回数据
      materialSourcesData: [], //热门流物料来源
      localData: [] //热门微博各个业务场景的规模化数据
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "entireMonitor"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(Date.now() - 3600 * 1000 * 24 * 8, "{y}{m}{d}");
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 2, "{y}{m}{d}");
        this.formEntire.date = [start, end];
        this.formHot.date = [start, end];
        this.formVisit.date = [start, end];
        this.formRank.date = [start, end];
        this.formCallback.date = [start, end];
        this.formMaterial.date = [start, end];
        this.formLocal.date = [start, end];
        this.getLocalData();
        this.getEntireData();
        this.getHotData();
        this.getVisitData();
        this.getRankData();
        this.getCallbackData();
        // this.getMaterialSourcesData();
      }
    },
    getLocalData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAllStreamPvUv.html",
        param: {
          dt_start: this.formLocal.date[0],
          dt_end: this.formLocal.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.localData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "热门微博各个业务场景的规模化数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "热门微博各个业务场景的规模化数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getEntireData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getScaleEntireDayTableData.html",
        param: {
          dt_start: this.formEntire.date[0],
          dt_end: this.formEntire.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.entireData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "热门微博整体数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "热门微博整体数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getCallbackData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getRecommendSourceExpCliActAna.html",
        param: {
          dt_start: this.formCallback.date[0],
          dt_end: this.formCallback.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.callbackData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "热门流召回数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "热门流召回数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getHotData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getEntireDayTableData.html",
        param: {
          dt_start: this.formHot.date[0],
          dt_end: this.formHot.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.hotData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "热门流体验类指标数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "热门流体验类指标数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getVisitData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getFkEntireDayTableData.html",
        param: {
          dt_start: this.formVisit.date[0],
          dt_end: this.formVisit.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.visitData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "访客整体指标数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "访客整体指标数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getRankData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getRankingListMonitorData.html",
        param: {
          dt_start: this.formRank.date[0],
          dt_end: this.formRank.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.rankData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "榜单整体指标数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "榜单整体指标数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getMaterialSourcesData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getMaterialComponentsTable2.html",
        param: {
          dt_start: this.formMaterial.date[0],
          dt_end: this.formMaterial.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.materialSourcesData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "热门流物料来源数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "热门流物料来源数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    _formatNum(num, dec) {
      return formatNum(num, dec);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    _parseTime(time) {
      const year = time.substr(0, 4);
      const month = time.substr(4, 2);
      const date = time.substr(6, 2);
      return `${year}-${month}-${date}`;
    },
    _formatIntNum(num) {
      return formatIntNum(num);
    },
    handleDownloadEntire() {
      this.downloadEntireLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "热门微博整体规模数据及主要流规模数据";
        const tHeader = [
          "日期",
          "星期",
          "PV（热门微博整体）",
          "UV（热门微博整体）",
          "曝光量（热门微博整体）",
          "真实曝光量（热门微博整体）",
          "PV（热门流）",
          "UV（热门流）",
          "曝光量（热门流）",
          "真实曝光量（热门流）",
          "PV（频道流）",
          "UV（频道流）",
          "曝光量（频道流）",
          "PV（访客流）",
          "UV（访客流）",
          "曝光量（访客流）",
          "真实曝光量（访客流）",
          "PV（榜单流）",
          "UV（榜单流）",
          "曝光量（榜单流）",
          "真实曝光量（榜单流）"
        ];
        const filterVal = [
          "dt",
          "day",
          "pv_hotwb_all",
          "uv_hotwb_all",
          "exposure_hotwb_all",
          "real_expo_hotwb_all",
          "pv_hot",
          "uv_hot",
          "exposure_hot",
          "real_expo_hot",
          "pv_channel",
          "uv_channel",
          "exposure_channel",
          "pv_youke",
          "uv_youke",
          "exposure_youke",
          "real_expo_youke",
          "pv_list",
          "uv_list",
          "exposure_list",
          "real_expo_list"
        ];
        const list = this.entireData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadEntireLoading = false;
      });
    },
    handleDownloadHot() {
      this.downloadHotLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "热门流体验类指标数据";
        const tHeader = [
          "日期",
          "星期",
          "千次点击",
          "千次互动",
          "人均刷新",
        //   "PV",
        //   "UV",
        //   "曝光量",
          "次日留存（热门）",
          "次日留存（首页）",
          "平均时长",
          "人均时长",
          "人均列表页时长",
          "人均详情页时长",
          "人均加关注",
          "转发量",
          "评论量",
          "点赞量",
          "互动量"
        ];
        const filterVal = [
          "dt",
          "day",
          "thd_click",
          "thd_act",
          "average_fresh_times",
        //   "pv",
        //   "uv",
        //   "exposure",
          "two_save_rate",
          "two_feed_save_rate",
          "online_time_exposure",
          "avg_online_time",
          "avg_list_online_time",
          "avg_page_online_time",
          "follow_uv",
          "retweet",
          "comment",
          "like_volume",
          "interact_volume"
        ];
        const list = this.hotData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadHotLoading = false;
      });
    },
    handleDownloadVisit() {
      this.downloadVisitLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "访客流体验类指标数据";
        const tHeader = [
          "日期",
          "星期",
          "千曝点击",
          "人均刷新",
          "次日留存",
          "7日留存",
          "人均时长",
          "人均列表页时长",
          "人均加关注"
        ];
        const filterVal = [
          "dt",
          "day",
          "thd_thick",
          "pv_uv",
          "two_save_rate",
          "seven_save_rate",
          "avg_online_time",
          "avg_list_online_time",
          "follow_uv",
        ];
        const list = this.visitData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadVisitLoading = false;
      });
    },
    handleDownloadRank() {
      this.downloadRankLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "榜单流体验类指标数据";
        const tHeader = [
          "日期",
          "星期",
          "千曝点击",
          "千曝互动",
          "人均刷新",
          "次日留存",
          "7日留存",
          "人均列表页时长",
          "人均加关注"
        ];
        const filterVal = [
          "dt",
          "day",
          "thd_thick",
          "thd_act",
          "pv_uv",
          "two_save_rate",
          "seven_save_rate",
          "avg_list_online_time",
          "follow_uv",
        ];
        const list = this.rankData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadRankLoading = false;
      });
    },
    handleDownloadCallback() {
      this.downloadCallbackLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "热门流召回分析数据";
        const tHeader = [
          "召回方式",
          "数值（曝光占比）",
          "增值（曝光占比）",
          "千曝点击",
          "千曝互动",
        ];
        const filterVal = [
          "name",
          "exposure",
          "exposure_ratio",
          "thd_click",
          "thd_act",
        ];
        const list = this.callbackData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadCallbackLoading = false;
      });
    },
    handleDownloadMaterialSources() {
        this.downloadMaterialSourcesLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
            const filename = "热门流物料来源分析";
            const tHeader = [
            "物料来源",
            "物料日增量（数值）",
            "物料日增量（占比）",
            "物料曝光个数（数值）",
            "物料曝光个数（占比）",
            "物料曝光总量（数值）",
            "物料曝光总量（占比）"
            ];
            const filterVal = [
            "name",
            "daily_ruku_num",
            "daily_ruku_num_ratio",
            "whole_expo_weibo",
            "whole_expo_weibo_ratio",
            "whole_expo_num",
            "whole_expo_num_ratio"
            ];
            const list = this.materialSourcesData;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, filename);
            this.downloadMaterialSourcesLoading = false;
        });
    },
    handleDownloadLocal() {
      this.downloadLocalLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
            const filename = "热门微博各个业务场景的规模化数据";
            const tHeader = [
            "流类型",
            "PV",
            "UV",
            "曝光量"
            ];
            const filterVal = [
            "stream_type",
            "pv",
            "uv",
            "exposure"
            ];
            const list = this.localData;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, filename);
            this.downloadLocalLoading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "dt") {
            return this._parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
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
body {
  .el-container {
    .el-noauth {
      background-color: #fff;
    }
  }
  .el-main {
    padding: 0;
    // background-color: #f0f2f5;
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
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-left: 2px solid #409eff;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
