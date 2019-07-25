import Vue from 'vue'
import Router from 'vue-router'
import BaseEntire from '@/views/hotcenter/basemonitor/entire' //常规监控-整体数据
import BaseMaterial from '@/views/hotcenter/basemonitor/material'
import BaseTagcover from '@/views/hotcenter/basemonitor/tagcover'
import BaseInstance from '@/views/hotcenter/basemonitor/instance'
import BaseFeatureBusiness from '@/views/hotcenter/basemonitor/feature/business'
import BaseFeatureProject from '@/views/hotcenter/basemonitor/feature/project'
import BaseFeatureException from '@/views/hotcenter/basemonitor/feature/exception'
import BaseFeatureMaterial from '@/views/hotcenter/basemonitor/feature/material'
import BaseFeatureCase from '@/views/hotcenter/basemonitor/feature/case'
import BaseFeatureCaseDetail from '@/views/hotcenter/basemonitor/feature/case/detail'
import DataEntire from '@/views/hotcenter/analysis/data/entire'
import DataTargets from '@/views/hotcenter/analysis/data/targets'
import DataTargetsRealexpose from '@/views/hotcenter/analysis/data/targets/realexpose'
import DataTargetsRealread from '@/views/hotcenter/analysis/data/targets/realread'
import DataFlow from '@/views/hotcenter/analysis/data/flow'
import DataFlowDetail from '@/views/hotcenter/analysis/data/flow/detail'
import DataHotevent from '@/views/hotcenter/analysis/data/hotevent'
import DataRecallUser from '@/views/hotcenter/analysis/data/recall/user'
import DataRecallDevice from '@/views/hotcenter/analysis/data/recall/device'
import DataRecallUV from '@/views/hotcenter/analysis/data/recall/uv'
import DataFresh from '@/views/hotcenter/analysis/data/fresh'
import DataFeedback from '@/views/hotcenter/analysis/data/feedback'
import AnalydataDetail from '@/views/hotcenter/analydata'
import MaterialScale from '@/views/hotcenter/analysis/material/scale'
import MaterialTag from '@/views/hotcenter/analysis/material/tag'
import MaterialSingle from '@/views/hotcenter/analysis/material/single'
import MaterialMultiple from '@/views/hotcenter/analysis/material/multiple'
import MaterialForward from '@/views/hotcenter/analysis/material/forward'
import MaterialStatsSummary from '@/views/hotcenter/analysis/material/stats/summary'
import MaterialStatsUser from '@/views/hotcenter/analysis/material/stats/user'
import MaterialStatsMaterial from '@/views/hotcenter/analysis/material/stats/material'
import MaterialStatsFilter from '@/views/hotcenter/analysis/material/stats/filter'
import MaterialDarwin from '@/views/hotcenter/analysis/material/darwin'
import MaterialCategoryExposure from '@/views/hotcenter/analysis/material/category/exposure'
import MaterialSynergyForward from '@/views/hotcenter/analysis/material/synergy/forward'
import MaterialSynergyReverse from '@/views/hotcenter/analysis/material/synergy/reverse'
import UserSingle from '@/views/hotcenter/analysis/user/single'
import UserInterest from '@/views/hotcenter/analysis/user/interest'
import UserFreshreview from '@/views/hotcenter/analysis/user/freshreview'
import UserFreshreviewDetail from '@/views/hotcenter/analysis/user/freshreview/detail'
import UserRecall from '@/views/hotcenter/analysis/user/recall'
import UserSynergyGroups from '@/views/hotcenter/analysis/user/synergy/groups'
import UserSynergySingle from '@/views/hotcenter/analysis/user/synergy/single'
import UserSynergyReadmid from '@/views/hotcenter/analysis/user/synergy/readmid'
import UserSynergyMetric from '@/views/hotcenter/analysis/user/synergy/metric'
import UserSynergyGrade from '@/views/hotcenter/analysis/user/synergy/grade'
import ExposureBase from '@/views/hotcenter/analysis/exposure/base'
import MetricTargetScale from '@/views/hotcenter/metric/target/scale'
import MetricTargetRetain from '@/views/hotcenter/metric/target/retain'
import MetricTargetAction from '@/views/hotcenter/metric/target/action'
import MetricUserFrequency from '@/views/hotcenter/metric/user/frequency'
import MetricUserPhoto from '@/views/hotcenter/metric/user/photo'
import MetricUserEnvironment from '@/views/hotcenter/metric/user/environment'
import MetricBlogExposureFirstTag from '@/views/hotcenter/metric/blog/exposure/firstTag'
import MetricBlogExposureDivision from '@/views/hotcenter/metric/blog/exposure/division'
import MetricBlogExposureTimediff from '@/views/hotcenter/metric/blog/exposure/timediff'
import MetricBloggerExposureLevel from '@/views/hotcenter/metric/blogger/exposure/level'
import OperateMaterial from '@/views/hotcenter/operatematerial'
import OperateMaterialPush from '@/views/hotcenter/operatematerial/push'
import OperateMaterialMixture from '@/views/hotcenter/operatematerial/mixture'
import OperateMaterialTrigger from '@/views/hotcenter/operatematerial/trigger'
import OperateMaterialChannel from '@/views/hotcenter/operatematerial/channel'
import OperateMaterialHotmenuIcon from '@/views/hotcenter/operatematerial/hotmenu/icon'
import OperateMaterialHotmenuTip from '@/views/hotcenter/operatematerial/hotmenu/tip'
import OperateMaterialPocket from '@/views/hotcenter/operatematerial/pocket'
import OperateMaterialSpring from '@/views/hotcenter/operatematerial/spring'
import OperateMaterialWhitelist from '@/views/hotcenter/operatematerial/whitelist'
import OperateMaterialRegistry from '@/views/hotcenter/operatematerial/registry'
import OperateMaterialDemote from '@/views/hotcenter/operatematerial/demote'
import OperateMaterialRegistryDetail from '@/views/hotcenter/operatematerial/registry/detail'
import RankQuery from '@/views/rank/query'
import ChannelManageMine from '@/views/channel/manage/mine'
import ChannelManageAddchannel from '@/views/channel/manage/addchannel'
import ChannelMaterial from '@/views/channel/material'
import ChannelUserWhitelist from '@/views/channel/user/whitelist'
import ChannelUserWhitelistDocument from '@/views/channel/user/whitelist/document'
import ChannelContentKeywordWhite from '@/views/channel/content/keyword/white'
import ChannelContentKeywordBlack from '@/views/channel/content/keyword/black'
import ChannelContentLink from '@/views/channel/content/link'
import ChannelContentShieldMid from '@/views/channel/content/shield/mid'
import ChannelContentShield from '@/views/channel/content/shield'
import ChannelContentPromote from '@/views/channel/content/promote'
import ChannelContentRecall from '@/views/channel/content/recall'
import ChannelCenterShowchannel from '@/views/channel/center/showchannel'
import ChannelCenterAccredit from '@/views/channel/center/accredit'
import ChannelStats from '@/views/channel/stats'
import CategoryCenterRole from '@/views/category/center/role'
import CategoryCenterAccredit from '@/views/category/center/accredit'
import CategoryCenterShowcategory from '@/views/category/center/showcategory'
import CategoryUserWhite from '@/views/category/user/white'
import CategoryUserBlack from '@/views/category/user/black'
import CategoryUserFlevel from '@/views/category/user/flevel'
import CategoryStatsUser from '@/views/category/stats/user'
import CategoryStatsExposure from '@/views/category/stats/exposure'
import CategoryStatsRank from '@/views/category/stats/rank'
import CategoryEvalMark from '@/views/category/eval/mark'
import CategoryEvalRecords from '@/views/category/eval/records'
import CategoryTagManage from '@/views/category/tag/manage'
import CategoryTagAudit from '@/views/category/tag/audit'
import CategoryTagRecord from '@/views/category/tag/record'
import Speedhot from '@/views/speedhot'
import Project from '@/views/hotcenter/project'
import EvalTag from '@/views/eval/tag'
import EvalPic from '@/views/eval/pic'
import PlatformSetmenu from '@/views/platform/setmenu'
import PlatformUsermanage from '@/views/platform/usermanage'
import LabSmartImgCut from '@/views/lab/smart/imgCut'
import MarkFace from '@/views/mark/face'
import MarkEmoticon from '@/views/mark/emoticon'
import MarkSubtitle from '@/views/mark/subtitle'
import MarkPoint from '@/views/mark/point'
import MarkVideo from '@/views/mark/video'
import LabVideo from '@/views/lab/video'
import MarkHair from '@/views/mark/hair'
import MarkDocsList from '@/views/mark/docs/list'
import MarkDocsDetail from '@/views/mark/docs/detail'
import MarkDocsAdd from '@/views/mark/docs/add'
import MarkDocsCategory from '@/views/mark/docs/category'
import Questionnaire from '@/views/questionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', meta: { title: '404 NOT FOUND | 热门管理' }, component: ()=> import('@/views/404'), hidden: true },
    { path: '/hotcenter', redirect: '/hotcenter/basemonitor/entire', hidden: true },
    { path: '/hotcenter/basemonitor', redirect: '/hotcenter/basemonitor/entire', hidden: true },
    {
      path: '/hotcenter/basemonitor/entire',
      name: '/hotcenter/basemonitor/entire',
      meta: {
        title: '常规监控-整体数据 | 热门管理'
      },
      component: BaseEntire
    },
    {
      path: '/hotcenter/basemonitor/material',
      name: '/hotcenter/basemonitor/material',
      meta: {
        title: '常规监控-物料日增规模 | 热门管理'
      },
      component: BaseMaterial
    },
    {
      path: '/hotcenter/basemonitor/tagcover',
      name: '/hotcenter/basemonitor/tagcover',
      meta: {
        title: '常规监控-兴趣标签覆盖率 | 热门管理'
      },
      component: BaseTagcover
    },
    {
      path: '/hotcenter/basemonitor/instance',
      name: '/hotcenter/basemonitor/instance',
      meta: {
        title: '常规监控-样本数据统计 | 热门管理'
      },
      component: BaseInstance
    },
    {
      path: '/hotcenter/basemonitor/feature/business',
      name: '/hotcenter/basemonitor/feature/business',
      meta: {
        title: '常规监控-动态特征监控-核心业务指标 | 热门管理'
      },
      component: BaseFeatureBusiness
    },
    {
      path: '/hotcenter/basemonitor/feature/project',
      name: '/hotcenter/basemonitor/feature/project',
      meta: {
        title: '常规监控-动态特征监控-核心工程指标 | 热门管理'
      },
      component: BaseFeatureProject
    },
    {
      path: '/hotcenter/basemonitor/feature/exception',
      name: '/hotcenter/basemonitor/feature/exception',
      meta: {
        title: '常规监控-动态特征监控-重点异常指标 | 热门管理'
      },
      component: BaseFeatureException
    },
    {
      path: '/hotcenter/basemonitor/feature/material',
      name: '/hotcenter/basemonitor/feature/material',
      meta: {
        title: '常规监控-动态特征监控-重要特征直观可靠性 | 热门管理'
      },
      component: BaseFeatureMaterial
    },
    {
      path: '/hotcenter/basemonitor/feature/case',
      name: '/hotcenter/basemonitor/feature/case',
      meta: {
        title: '常规监控-动态特征监控-特征变化轨迹跟踪 | 热门管理'
      },
      component: BaseFeatureCase
    },
    {
      path: '/hotcenter/basemonitor/feature/case/detail',
      name: '/hotcenter/basemonitor/feature/case/detail',
      meta: {
        title: '常规监控-动态特征监控-特征变化轨迹跟踪详情 | 热门管理'
      },
      component: BaseFeatureCaseDetail
    },
    { path: '/hotcenter/analysis/data', redirect: '/hotcenter/analysis/data/entire', hidden: true },
    { path: '/hotcenter/datamonitor', redirect: '/hotcenter/analysis/data/entire', hidden: true },
    {
      path: '/hotcenter/analysis/data/entire',
      name: '/hotcenter/analysis/data/entire',
      meta: {
        title: '数据分析-整体数据 | 热门管理'
      },
      component: DataEntire
    },
    // {
    //   path: '/hotcenter/analysis/data/target',
    //   name: '/hotcenter/analysis/data/target',
    //   meta: {
    //     title: '数据分析-KPI指标分析 | 热门管理'
    //   },
    //   component: () => import('@/views/hotcenter/analysis/data/target')
    // },
    { path: '/hotcenter/analysis/data/target', redirect: '/hotcenter/analysis/data/target/click', hidden: true },
    {
      path: '/hotcenter/analysis/data/target/click',
      name: '/hotcenter/analysis/data/target/click',
      meta: {
        title: '数据分析-千次点击 | 热门管理',
        type: 'thd_click',
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/act',
      name: '/hotcenter/analysis/data/target/act',
      meta: {
        title: '数据分析-千次互动 | 热门管理',
        type: 'thd_act'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/refresh',
      name: '/hotcenter/analysis/data/target/refresh',
      meta: {
        title: '数据分析-人均刷新 | 热门管理',
        type: 'average_fresh_times'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/pv',
      name: '/hotcenter/analysis/data/target/pv',
      meta: {
        title: '数据分析-PV | 热门管理',
        type: 'pv'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/uv',
      name: '/hotcenter/analysis/data/target/uv',
      meta: {
        title: '数据分析-UV | 热门管理',
        type: 'uv'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/expose',
      name: '/hotcenter/analysis/data/target/expose',
      meta: {
        title: '数据分析-曝光量 | 热门管理',
        type: 'exposure'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/remain/hotwb',
      name: '/hotcenter/analysis/data/target/remain/hotwb',
      meta: {
        title: '数据分析-热门次日留存 | 热门管理',
        type: 'two_save_rate'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/remain/all',
      name: '/hotcenter/analysis/data/target/remain/all',
      meta: {
        title: '数据分析-首页次日留存 | 热门管理',
        type: 'two_feed_save_rate'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/retweet',
      name: '/hotcenter/analysis/data/target/retweet',
      meta: {
        title: '数据分析-转发量 | 热门管理',
        type: 'retweet'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/comment',
      name: '/hotcenter/analysis/data/target/comment',
      meta: {
        title: '数据分析-评论量 | 热门管理',
        type: 'comment'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/like',
      name: '/hotcenter/analysis/data/target/like',
      meta: {
        title: '数据分析-点赞量 | 热门管理',
        type: 'like_volume'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/interact',
      name: '/hotcenter/analysis/data/target/interact',
      meta: {
        title: '数据分析-互动量 | 热门管理',
        type: 'interact_volume'
      },
      component: DataTargets
    },
    {
      path: '/hotcenter/analysis/data/target/expose/real',
      name: '/hotcenter/analysis/data/target/expose/real',
      meta: {
        title: '数据分析-真实曝光 | 热门管理',
      },
      component: DataTargetsRealexpose
    },
    {
      path: '/hotcenter/analysis/data/target/read/real',
      name: '/hotcenter/analysis/data/target/read/real',
      meta: {
        title: '数据分析-真实阅读时长 | 热门管理',
      },
      component: DataTargetsRealread
    },
    {
      path: '/hotcenter/analysis/data/flow',
      name: '/hotcenter/analysis/data/flow',
      meta: {
        title: '数据分析-流量分析 | 热门管理'
      },
      component: DataFlow
    },
    {
      path: '/hotcenter/analysis/data/flow/detail',
      name: '/hotcenter/analysis/data/flow/detail',
      meta: {
        title: '数据分析-流量分析详情 | 热门管理'
      },
      component: DataFlowDetail
    },
    {
      path: '/hotcenter/analysis/data/hotevent',
      name: '/hotcenter/analysis/data/hotevent',
      meta: {
        title: '数据分析-大事件追溯 | 热门管理'
      },
      component: DataHotevent
    },
    {
      path: '/hotcenter/analysis/data/recall/user',
      name: '/hotcenter/analysis/data/recall/user',
      meta: {
        title: '数据分析-用户召回常规统计 | 热门管理'
      },
      component: DataRecallUser
    },
    {
      path: '/hotcenter/analysis/data/recall/device',
      name: '/hotcenter/analysis/data/recall/device',
      meta: {
        title: '数据分析-分品牌统计可分发设备物料量 | 热门管理'
      },
      component: DataRecallDevice
    },
    {
      path: '/hotcenter/analysis/data/recall/uv',
      name: '/hotcenter/analysis/data/recall/uv',
      meta: {
        title: '数据分析-UV的设备分布 | 热门管理'
      },
      component: DataRecallUV
    },
    {
      path: '/hotcenter/analysis/data/fresh',
      name: '/hotcenter/analysis/data/fresh',
      meta: {
        title: '数据分析-刷新机制 | 热门管理'
      },
      component: DataFresh
    },
    {
      path: '/hotcenter/analysis/data/feedback',
      name: '/hotcenter/analysis/data/feedback',
      meta: {
        title: '数据分析-负反馈分析 | 热门管理'
      },
      component: DataFeedback
    },
    {
      path: '/hotcenter/analydata',
      name: '/hotcenter/analydata',
      meta: {
        title: '数据分析-数据分析详情 | 热门管理'
      },
      component: AnalydataDetail
    },
    { path: '/hotcenter/analysis/material', redirect: '/hotcenter/analysis/material/scale', hidden: true },
    { path: '/hotcenter/querymaterial', redirect: '/hotcenter/analysis/material/single', hidden: true },
    { path: '/hotcenter/monitormaterial', redirect: '/hotcenter/analysis/material/tag', hidden: true },
    { path: '/hotcenter/materialstatus', redirect: '/hotcenter/analysis/material/scale', hidden: true },
    {
      path: '/hotcenter/analysis/material/scale',
      name: '/hotcenter/analysis/material/scale',
      meta: {
        title: '物料分析-物料库规模 | 热门管理'
      },
      component: MaterialScale
    },
    {
      path: '/hotcenter/analysis/material/tag',
      name: '/hotcenter/analysis/material/tag',
      meta: {
        title: '物料分析-内容标签统计 | 热门管理'
      },
      component: MaterialTag
    },
    {
      path: '/hotcenter/analysis/material/single',
      name: '/hotcenter/analysis/material/single',
      meta: {
        title: '物料分析-单条物料分析 | 热门管理'
      },
      component: MaterialSingle
    },
    {
      path: '/hotcenter/analysis/material/multiple',
      name: '/hotcenter/analysis/material/multiple',
      meta: {
        title: '物料分析-多条物料ShowBatch | 热门管理'
      },
      component: MaterialMultiple
    },
    {
      path: '/hotcenter/analysis/material/forward',
      name: '/hotcenter/analysis/material/forward',
      meta: {
        title: '物料分析-转发物料 | 热门管理'
      },
      component: MaterialForward
    },
    {
      path: '/hotcenter/analysis/material/stats/summary',
      name: '/hotcenter/analysis/material/stats/summary',
      meta: {
        title: '物料分析-物料构成总况 | 热门管理'
      },
      component: MaterialStatsSummary
    },
    {
      path: '/hotcenter/analysis/material/stats/user',
      name: '/hotcenter/analysis/material/stats/user',
      meta: {
        title: '物料分析-白名单账号 | 热门管理'
      },
      component: MaterialStatsUser
    },
    {
      path: '/hotcenter/analysis/material/stats/material',
      name: '/hotcenter/analysis/material/stats/material',
      meta: {
        title: '物料分析-白名单原创物料 | 热门管理'
      },
      component: MaterialStatsMaterial
    },
    {
      path: '/hotcenter/analysis/material/stats/filter',
      name: '/hotcenter/analysis/material/stats/filter',
      meta: {
        title: '物料分析-白名单账号发博过滤 | 热门管理'
      },
      component: MaterialStatsFilter
    },
    {
      path: '/hotcenter/analysis/material/darwin',
      name: '/hotcenter/analysis/material/darwin',
      meta: {
        title: '物料分析-达尔文 | 热门管理'
      },
      component: MaterialDarwin
    },
    {
      path: '/hotcenter/analysis/material/category',
      name: '/hotcenter/analysis/material/category',
      meta: {
        title: '物料分析-领域top100曝光物料 | 热门管理'
      },
      component: MaterialCategoryExposure
    },
    {
      path: '/hotcenter/analysis/material/synergy/forward',
      name: '/hotcenter/analysis/material/synergy/forward',
      meta: {
        title: '用户分析-mid协同正向查询 | 热门管理'
      },
      component: MaterialSynergyForward
    },
    {
      path: '/hotcenter/analysis/material/synergy/reverse',
      name: '/hotcenter/analysis/material/synergy/reverse',
      meta: {
        title: '用户分析-mid协同反向查询 | 热门管理'
      },
      component: MaterialSynergyReverse
    },
    { path: '/hotcenter/analysis/user', redirect: '/hotcenter/analysis/user/single', hidden: true },
    {
      path: '/hotcenter/analysis/user/single',
      name: '/hotcenter/analysis/user/single',
      meta: {
        title: '用户分析-单个用户分析 | 热门管理'
      },
      component: UserSingle
    },
    {
      path: '/hotcenter/analysis/user/interest',
      name: '/hotcenter/analysis/user/interest',
      meta: {
        title: '用户分析-兴趣标签覆盖率 | 热门管理'
      },
      component: UserInterest
    },
    {
      path: '/hotcenter/analysis/user/freshreview',
      name: '/hotcenter/analysis/user/freshreview',
      meta: {
        title: '用户分析-用户回看 | 热门管理'
      },
      component: UserFreshreview
    },
    {
      path: '/hotcenter/analysis/user/freshreview/detail',
      name: '/hotcenter/analysis/user/freshreview/detail',
      meta: {
        title: '用户分析-用户回看-预估详情 | 热门管理'
      },
      component: UserFreshreviewDetail
    },
    {
      path: '/hotcenter/analysis/user/recall',
      name: '/hotcenter/analysis/user/recall',
      meta: {
        title: '用户分析-FM召回分析 | 热门管理'
      },
      component: UserRecall
    },
    {
      path: '/hotcenter/analysis/user/synergy/groups',
      name: '/hotcenter/analysis/user/synergy/groups',
      meta: {
        title: '用户分析-用户协同召回分析-用户群体topic分布 | 热门管理'
      },
      component: UserSynergyGroups
    },
    {
      path: '/hotcenter/analysis/user/synergy/single',
      name: '/hotcenter/analysis/user/synergy/single',
      meta: {
        title: '用户分析-用户协同召回分析-单用户topic查询页面 | 热门管理'
      },
      component: UserSynergySingle
    },
    {
      path: '/hotcenter/analysis/user/synergy/readmid',
      name: '/hotcenter/analysis/user/synergy/readmid',
      meta: {
        title: '用户分析-用户协同召回分析-用户阅读mid查询页面 | 热门管理'
      },
      component: UserSynergyReadmid
    },
    {
      path: '/hotcenter/analysis/user/synergy/metric',
      name: '/hotcenter/analysis/user/synergy/metric',
      meta: {
        title: '用户分析-用户协同召回分析-计数正确性监控页面 | 热门管理'
      },
      component: UserSynergyMetric
    },
    {
      path: '/hotcenter/analysis/user/synergy/grade',
      name: '/hotcenter/analysis/user/synergy/grade',
      meta: {
        title: '用户分析-用户协同召回分析-用户协同打分评估页面 | 热门管理'
      },
      component: UserSynergyGrade
    },
    {
      path: '/hotcenter/analysis/exposure/base',
      name: '/hotcenter/analysis/exposure/base',
      meta: {
        title: '用户分析-曝光常规检测 | 热门管理'
      },
      component: ExposureBase
    },
    {
      path: '/hotcenter/metric/target/scale',
      name: '/hotcenter/metric/target/scale',
      meta: {
        title: 'KPI指标-规模类 | 指标管理'
      },
      component: MetricTargetScale
    },
    {
      path: '/hotcenter/metric/target/retain',
      name: '/hotcenter/metric/target/retain',
      meta: {
        title: 'KPI指标-留存类 | 指标管理'
      },
      component: MetricTargetRetain
    },
    {
      path: '/hotcenter/metric/target/action',
      name: '/hotcenter/metric/target/action',
      meta: {
        title: 'KPI指标-行为类 | 指标管理'
      },
      component: MetricTargetAction
    },
    {
      path: '/hotcenter/metric/user/frequency',
      name: '/hotcenter/metric/user/frequency',
      meta: {
        title: '用户主题-用户频次 | 指标管理'
      },
      component: MetricUserFrequency
    },
    {
      path: '/hotcenter/metric/user/photo',
      name: '/hotcenter/metric/user/photo',
      meta: {
        title: '用户主题-用户画像 | 指标管理'
      },
      component: MetricUserPhoto
    },
    {
      path: '/hotcenter/metric/user/environment',
      name: '/hotcenter/metric/user/environment',
      meta: {
        title: '用户主题-流量设备环境 | 指标管理'
      },
      component: MetricUserEnvironment
    },
    {
      path: '/hotcenter/metric/blog/exposure/tag/first',
      name: '/hotcenter/metric/blog/exposure/tag/first',
      meta: {
        title: '博文主题-曝光-一级领域分布 | 指标管理'
      },
      component: MetricBlogExposureFirstTag
    },
    {
      path: '/hotcenter/metric/blog/exposure/division',
      name: '/hotcenter/metric/blog/exposure/division',
      meta: {
        title: '博文主题-曝光-曝光量分布 | 指标管理'
      },
      component: MetricBlogExposureDivision
    },
    {
      path: '/hotcenter/metric/blog/exposure/timediff',
      name: '/hotcenter/metric/blog/exposure/timediff',
      meta: {
        title: '博文主题-曝光-曝光量分布 | 指标管理'
      },
      component: MetricBlogExposureTimediff
    },
    {
      path: '/hotcenter/metric/blogger/exposure/level',
      name: '/hotcenter/metric/blogger/exposure/level',
      meta: {
        title: '博主主题-曝光-用户等级 | 指标管理'
      },
      component: MetricBloggerExposureLevel
    },
    {
      path: '/hotcenter/operatematerial',
      name: '/hotcenter/operatematerial',
      meta: {
        title: '干预后台 | 热门管理'
      },
      component: OperateMaterial
    },
    {
      path: '/hotcenter/operatematerial/push',
      name: '/hotcenter/operatematerial/push',
      meta: {
        title: '干预后台-PUSH降级配置 | 热门管理'
      },
      component: OperateMaterialPush
    },
    {
      path: '/hotcenter/operatematerial/mixture',
      name: '/hotcenter/operatematerial/mixture',
      meta: {
        title: '干预后台-混合流降级配置 | 热门管理'
      },
      component: OperateMaterialMixture
    },
    {
      path: '/hotcenter/operatematerial/trigger',
      name: '/hotcenter/operatematerial/trigger',
      meta: {
        title: '干预后台-trigger配置 | 热门管理'
      },
      component: OperateMaterialTrigger
    },
    {
      path: '/hotcenter/operatematerial/channel',
      name: '/hotcenter/operatematerial/channel',
      meta: {
        title: '干预后台-频道流降级配置 | 热门管理'
      },
      component: OperateMaterialChannel
    },
    {
      path: '/hotcenter/operatematerial/hotmenu/icon',
      name: '/hotcenter/operatematerial/hotmenu/icon',
      meta: {
        title: '干预后台-热门导航-Icon配置 | 热门管理'
      },
      component: OperateMaterialHotmenuIcon
    },
    {
      path: '/hotcenter/operatematerial/hotmenu/tip',
      name: '/hotcenter/operatematerial/hotmenu/tip',
      meta: {
        title: '干预后台-热门导航-Tip配置 | 热门管理'
      },
      component: OperateMaterialHotmenuTip
    },
    {
      path: '/hotcenter/operatematerial/pocket',
      name: '/hotcenter/operatematerial/pocket',
      meta: {
        title: '干预后台-降级配置（新浪口袋） | 热门管理'
      },
      component: OperateMaterialPocket
    },
    {
      path: '/hotcenter/operatematerial/spring',
      name: '/hotcenter/operatematerial/spring',
      meta: {
        title: '干预后台-春晚流物料 | 热门管理'
      },
      component: OperateMaterialSpring
    },
    {
      path: '/hotcenter/operatematerial/whitelist',
      name: '/hotcenter/operatematerial/whitelist',
      meta: {
        title: '干预后台-前端白名单配置 | 热门管理'
      },
      component: OperateMaterialWhitelist
    },
    {
      path: '/hotcenter/operatematerial/registry',
      name: '/hotcenter/operatematerial/registry',
      meta: {
        title: '干预后台-注册中心 | 热门管理'
      },
      component: OperateMaterialRegistry
    },
    {
      path: '/hotcenter/operatematerial/demote',
      name: '/hotcenter/operatematerial/demote',
      meta: {
        title: '干预后台-后端降级详情 | 热门管理'
      },
      component: OperateMaterialDemote
    },
    {
      path: '/hotcenter/operatematerial/registry/detail',
      name: '/hotcenter/operatematerial/registry/detail',
      meta: {
        title: '干预后台-注册中心-服务详情 | 热门管理'
      },
      component: OperateMaterialRegistryDetail
    },
    {
      path: '/rank/query',
      name: '/rank/query',
      meta: {
        title: '榜单管理-榜单查询 | 热门管理'
      },
      component: RankQuery
    },
    { path: '/hotcenter/channel', redirect: '/channel/manage/mine', hidden: true },
    {
      path: '/channel/manage/mine',
      name: '/channel/manage/mine',
      meta: {
        title: '我的频道 | 频道管理'
      },
      component: ChannelManageMine
    },
    {
      path: '/channel/manage/add',
      name: '/channel/manage/add',
      meta: {
        title: '频道创建 | 频道管理'
      },
      component: ChannelManageAddchannel
    },
    {
      path: '/hotcenter/channel/material',
      name: '/hotcenter/channel/material',
      meta: {
        title: '频道物料详情 | 热门管理'
      },
      component: ChannelMaterial
    },
    {
      path: '/channel/user/whitelist',
      name: '/channel/user/whitelist',
      meta: {
        title: '作者管理-用户白名单 | 频道管理'
      },
      component: ChannelUserWhitelist
    },
    {
      path: '/channel/user/whitelist/document',
      name: '/channel/user/whitelist/document',
      meta: {
        title: '作者管理-用户白名单-用户手册 | 频道管理'
      },
      component: ChannelUserWhitelistDocument
    },
    {
      path: '/channel/content/keyword/white',
      name: '/channel/content/keyword/white',
      meta: {
        title: '内容管理-关键词白名单 | 频道管理'
      },
      component: ChannelContentKeywordWhite
    },
    {
      path: '/channel/content/keyword/black',
      name: '/channel/content/keyword/black',
      meta: {
        title: '内容管理-关键词黑名单 | 频道管理'
      },
      component: ChannelContentKeywordBlack
    },
    {
      path: '/channel/content/link',
      name: '/channel/content/link',
      meta: {
        title: '内容管理-URL黑名单 | 频道管理'
      },
      component: ChannelContentLink
    },
    { path: '/channel/content/shield', redirect: '/channel/content/shield/mid', hidden: true },
    {
      path: '/channel/content/shield/mid',
      name: '/channel/content/shield/mid',
      meta: {
        title: '内容管理-mid屏蔽 | 频道管理'
      },
      component: ChannelContentShieldMid
    },
    {
      path: '/channel/content/shield/all',
      name: '/channel/content/shield/all',
      meta: {
        title: '内容管理-屏蔽操作 | 频道管理'
      },
      component: ChannelContentShield
    },
    {
      path: '/channel/content/promote',
      name: '/channel/content/promote',
      meta: {
        title: '内容管理-置顶操作 | 频道管理'
      },
      component: ChannelContentPromote
    },
    {
      path: '/channel/content/recall',
      name: '/channel/content/recall',
      meta: {
        title: '内容管理-物料召回查询 | 频道管理'
      },
      component: ChannelContentRecall
    },
    {
      path: '/channel/center/show',
      name: '/channel/center/show',
      meta: {
        title: '后台管理-频道列表 | 频道管理'
      },
      component: ChannelCenterShowchannel
    },
    {
      path: '/channel/center/accredit',
      name: '/channel/center/accredit',
      meta: {
        title: '后台管理-频道授权 | 频道管理'
      },
      component: ChannelCenterAccredit
    },
    {
      path: '/channel/stats',
      name: '/channel/stats',
      meta: {
        title: '数据统计-频道统计 | 频道管理'
      },
      component: ChannelStats
    },
    {
      path: '/category/center/role',
      name: '/category/center/role',
      meta: {
        title: '后台管理-角色管理 | 领域作者管理'
      },
      component: CategoryCenterRole
    },
    {
      path: '/category/center/accredit',
      name: '/category/center/accredit',
      meta: {
        title: '后台管理-领域授权 | 领域作者管理'
      },
      component: CategoryCenterAccredit
    },
    {
      path: '/category/center/show',
      name: '/category/center/show',
      meta: {
        title: '后台管理-领域操作记录 | 领域作者管理'
      },
      component: CategoryCenterShowcategory
    },
    {
      path: '/category/user/white',
      name: '/category/user/white',
      meta: {
        title: '作者管理-领域白名单 | 领域作者管理'
      },
      component: CategoryUserWhite
    },
    {
      path: '/category/user/black',
      name: '/category/user/black',
      meta: {
        title: '作者管理-领域黑名单 | 领域作者管理'
      },
      component: CategoryUserBlack
    },
    {
      path: '/category/user/flevel',
      name: '/category/user/flevel',
      meta: {
        title: '作者管理-新增头部用 | 领域作者管理'
      },
      component: CategoryUserFlevel
    },
    {
      path: '/category/stats/user',
      name: '/category/stats/user',
      meta: {
        title: '数据统计-分领域黑白名单统计 | 领域作者管理'
      },
      component: CategoryStatsUser
    },
    {
      path: '/category/stats/exposure',
      name: '/category/stats/exposure',
      meta: {
        title: '数据统计-曝光统计 | 领域作者管理'
      },
      component: CategoryStatsExposure
    },
    {
      path: '/category/stats/rank',
      name: '/category/stats/rank',
      meta: {
        title: '数据统计-排行榜 | 领域作者管理'
      },
      component: CategoryStatsRank
    },
    {
      path: '/category/eval/mark',
      name: '/category/eval/mark',
      meta: {
        title: '物料评估-内容评估 | 领域作者管理'
      },
      component: CategoryEvalMark
    },
    {
      path: '/category/eval/records',
      name: '/category/eval/records',
      meta: {
        title: '物料评估-内容评估操作记录 | 领域作者管理'
      },
      component: CategoryEvalRecords
    },
    {
      path: '/category/tag/manage',
      name: '/category/tag/manage',
      meta: {
        title: '标签管理-标签管理 | 领域作者管理'
      },
      component: CategoryTagManage
    },
    {
      path: '/category/tag/audit',
      name: '/category/tag/audit',
      meta: {
        title: '标签管理-标签审核 | 领域作者管理'
      },
      component: CategoryTagAudit
    },
    {
      path: '/category/tag/record',
      name: '/category/tag/record',
      meta: {
        title: '标签管理-标签申请记录 | 领域作者管理'
      },
      component: CategoryTagRecord
    },
    {
      path: '/hotcenter/manage',
      name: '/hotcenter/manage',
      meta: {
        title: '极速版物料审核 | 热门管理'
      },
      component: Speedhot
    },
    {
      path: '/hotcenter/project',
      name: '/hotcenter/project',
      meta: {
        title: '项目管理 | 热门管理'
      },
      component: Project
    },
    {
      path: '/eval/tag',
      name: '/eval/tag',
      meta: {
        title: '标签评估 | 热门管理'
      },
      component: EvalTag
    },
    {
      path: '/eval/pic',
      name: '/eval/pic',
      meta: {
        title: '图片评估 | 热门管理'
      },
      component: EvalPic
    },
    {
      path: '/platform/setmenu',
      name: '/platform/setmenu',
      meta: {
        title: '导航栏设置 | 平台管理'
      },
      component: PlatformSetmenu
    },
    {
      path: '/platform/usermanage',
      name: '/platform/usermanage',
      meta: {
        title: '用户管理 | 平台管理'
      },
      component: PlatformUsermanage
    },
    {
      path: '/lab/smart/imgcut',
      name: '/lab/smart/imgcut',
      meta: {
        title: '图片智能裁剪 | 效果演示'
      },
      component: LabSmartImgCut
    },
    {
      path: '/mark/face',
      name: '/mark/face',
      meta: {
        title: '人像分割 | 标注平台'
      },
      component: MarkFace
    },
    {
      path: '/mark/emoticon',
      name: '/mark/emoticon',
      meta: {
        title: '人脸表情 | 标注平台'
      },
      component: MarkEmoticon
    },
    {
      path: '/mark/subtitle',
      name: '/mark/subtitle',
      meta: {
        title: '字幕识别 | 标注平台'
      },
      component: MarkSubtitle
    },
    {
      path: '/mark/point',
      name: '/mark/point',
      meta: {
        title: '人脸关键点 | 标注平台'
      },
      component: MarkPoint
    },
    {
      path: '/mark/video',
      name: '/mark/video',
      meta: {
        title: '视频标签 | 标注平台'
      },
      component: MarkVideo
    },
    {
      path: '/lab/video',
      name: '/lab/video',
      meta: {
        title: '视频标签 | 演示平台'
      },
      component: LabVideo
    },
    {
      path: '/mark/hair',
      name: '/mark/hair',
      meta: {
        title: '人像分割-头发 | 标注平台'
      },
      component: MarkHair
    },
    {
      path: '/mark/docs/list',
      name: '/mark/docs/list',
      meta: {
        title: '文档列表 | 标注平台'
      },
      component: MarkDocsList
    },
    {
      path: '/mark/docs/detail',
      name: '/mark/docs/detail',
      meta: {
        title: '文档详情 | 标注平台'
      },
      component: MarkDocsDetail
    },
    {
      path: '/mark/docs/add',
      name: '/mark/docs/add',
      meta: {
        title: '文档编辑 | 标注平台'
      },
      component: MarkDocsAdd
    },
    {
      path: '/mark/docs',
      name: '/mark/docs',
      meta: {
        title: '文档展示 | 标注平台'
      },
      component: MarkDocsCategory
    },
    {
      path: '/questionnaire',
      name: '/questionnaire',
      meta: {
        title: '用户兴趣调查问卷'
      },
      component: Questionnaire
    }
  ]
})
