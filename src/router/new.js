import Vue from 'vue'
import Router from 'vue-router'
import Entiremonitor from '@/views/hotcenter/basemonitor/entire'
import Materialmonitor from '@/views/hotcenter/basemonitor/material'
import Tagcover from '@/views/hotcenter/basemonitor/tagcover'
import Entiredata from '@/views/hotcenter/analysis/data/entire'
import Targetdata from '@/views/hotcenter/analysis/data/target'
import Scalematerial from '@/views/hotcenter/analysis/material/scale'
import Tagmaterial from '@/views/hotcenter/analysis/material/tag'
import Singlematerial from '@/views/hotcenter/analysis/material/single'
import Singleuser from '@/views/hotcenter/analysis/user/single'
import Interestuser from '@/views/hotcenter/analysis/user/interest'
import Minechannel from '@/views/channel/manage/mine'
import Addchannel from '@/views/channel/manage/addchannel'
import Whitechannel from '@/views/channel/user/whitelist'
import Shieldchannel from '@/views/channel/content/shield'
import Whitekeywordchannel from '@/views/channel/content/keyword/white'
import Blackkeywordchannel from '@/views/channel/content/keyword/black'
import Showchannel from '@/views/channel/center/showchannel'
import Accreditchannel from '@/views/channel/center/accredit'


import Querymaterial from '@/views/hotcenter/querymaterial'
import Operatematerial from '@/views/hotcenter/operatematerial'
import Monitormaterial from '@/views/hotcenter/monitormaterial'
import Materialstatus from '@/views/hotcenter/materialstatus'
// import Manage from '@/views/hotcenter/manage'
import Speedhot from '@/views/speedhot'
import Datamonitor from '@/views/hotcenter/datamonitor'
import Analydata from '@/views/hotcenter/analydata'
import Analysisdata from '@/views/hotcenter/analysis/data'
import Analysismaterial from '@/views/hotcenter/analysis/material'
import Analysisuser from '@/views/hotcenter/analysis/user'
// import Channel from '@/views/hotcenter/channel'
// import Channelmaterial from '@/views/hotcenter/channel/material'
import Channel from '@/views/channel'
import Channelmaterial from '@/views/channel/material'
import Channelwhitelistdoc from '@/views/channel/user/whitelist/document'
import Setmenu from '@/views/platform/setmenu'
import Usermanage from '@/views/platform/usermanage'
import Project from '@/views/hotcenter/project'
import Imgcut from '@/views/lab/smart/imgCut'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/404', meta: {activeidx: '',title: '404 | 热门管理'},component: () => import('@/views/404'), hidden: true },
    { path: '/hotcenter', redirect: '/hotcenter/basemonitor/entire', hidden: true },
    { path: '/hotcenter/basemonitor', redirect: '/hotcenter/basemonitor/entire', hidden: true },
    {
      path: '/hotcenter/basemonitor/entire',
      name: '/hotcenter/basemonitor/entire',
      meta: {
        activeidx: '',
        title: '常规监控-整体数据 | 热门管理'
      },
      component: Entiremonitor
    },
    {
      path: '/hotcenter/basemonitor/material',
      name: '/hotcenter/basemonitor/material',
      meta: {
        activeidx: '',
        title: '常规监控-物料日增规模 | 热门管理'
      },
      component: Materialmonitor
    },
    {
      path: '/hotcenter/basemonitor/tagcover',
      name: '/hotcenter/basemonitor/tagcover',
      meta: {
        activeidx: '',
        title: '常规监控-兴趣标签覆盖率 | 热门管理'
      },
      component: Tagcover
    },
    { path: '/hotcenter/analysis/data', redirect: '/hotcenter/analysis/data/entire', hidden: true },
    {
      path: '/hotcenter/analysis/data/entire',
      name: '/hotcenter/analysis/data/entire',
      meta: {
        activeidx: '',
        title: '数据分析-整体数据 | 热门管理'
      },
      component: Entiredata
    },
    {
      path: '/hotcenter/analysis/data/target',
      name: '/hotcenter/analysis/data/target',
      meta: {
        activeidx: '',
        title: '数据分析-KPI指标分析 | 热门管理'
      },
      component: Targetdata
    },
    { path: '/hotcenter/analysis/material', redirect: '/hotcenter/analysis/material/scale', hidden: true },
    {
      path: '/hotcenter/analysis/material/scale',
      name: '/hotcenter/analysis/material/scale',
      meta: {
        activeidx: '',
        title: '物料分析-物料库规模 | 热门管理'
      },
      component: Scalematerial
    },
    {
      path: '/hotcenter/analysis/material/tag',
      name: '/hotcenter/analysis/material/tag',
      meta: {
        activeidx: '',
        title: '物料分析-内容标签统计 | 热门管理'
      },
      component: Tagmaterial
    },
    {
      path: '/hotcenter/analysis/material/single',
      name: '/hotcenter/analysis/material/single',
      meta: {
        activeidx: '',
        title: '物料分析-单条物料分析 | 热门管理'
      },
      component: Singlematerial
    },
    { path: '/hotcenter/analysis/user', redirect: '/hotcenter/analysis/user/single', hidden: true },
    {
      path: '/hotcenter/analysis/user/single',
      name: '/hotcenter/analysis/user/single',
      meta: {
        activeidx: '',
        title: '用户分析-单个用户分析 | 热门管理'
      },
      component: Singleuser
    },
    {
      path: '/hotcenter/analysis/user/interest',
      name: '/hotcenter/analysis/user/interest',
      meta: {
        activeidx: '',
        title: '用户分析-单个用户分析 | 热门管理'
      },
      component: Interestuser
    },
    { path: '/hotcenter/channel', redirect: '/channel/manage/mine', hidden: true },
    {
      path: '/channel/manage/mine',
      name: '/channel/manage/mine',
      meta: {
        activeidx: '',
        title: '我的频道 | 频道管理'
      },
      component: Minechannel
    },
    {
      path: '/channel/manage/add',
      name: '/channel/manage/add',
      meta: {
        activeidx: '',
        title: '频道创建 | 频道管理'
      },
      component: Addchannel
    },
    {
      path: '/channel/user/whitelist',
      name: '/channel/user/whitelist',
      meta: {
        activeidx: '',
        title: '作者管理-用户白名单 | 频道管理'
      },
      component: Whitechannel
    },
    {
      path: '/channel/content/keyword/white',
      name: '/channel/content/keyword/white',
      meta: {
        activeidx: '',
        title: '内容管理-关键词白名单 | 频道管理'
      },
      component: Whitekeywordchannel
    },
    {
      path: '/channel/content/keyword/black',
      name: '/channel/content/keyword/black',
      meta: {
        activeidx: '',
        title: '内容管理-关键词黑名单 | 频道管理'
      },
      component: Blackkeywordchannel
    },
    {
      path: '/channel/content/shield',
      name: '/channel/content/shield',
      meta: {
        activeidx: '',
        title: '内容管理-mid屏蔽 | 频道管理'
      },
      component: Shieldchannel
    },
    {
      path: '/channel/center/show',
      name: '/channel/center/show',
      meta: {
        activeidx: '',
        title: '后台管理-频道列表 | 频道管理'
      },
      component: Showchannel
    },
    {
      path: '/channel/center/accredit',
      name: '/channel/center/accredit',
      meta: {
        activeidx: '',
        title: '后台管理-频道授权 | 频道管理'
      },
      component: Accreditchannel
    },





    
    {
      path: '/hotcenter/querymaterial',
      name: '/hotcenter/querymaterial',
      meta: {
        activeidx: '',
        title: '物料查询 | 热门管理'
      },
      component: Querymaterial
    },
    {
      path: '/hotcenter/operatematerial',
      name: '/hotcenter/operatematerial',
      meta: {
        activeidx: '7-99',
        title: '干预后台 | 热门管理'
      },
      component: Operatematerial
    },
    {
      path: '/hotcenter/monitormaterial',
      name: '/hotcenter/monitormaterial',
      meta: {
        activeidx: '',
        title: '物料库监控 | 热门管理'
      },
      component: Monitormaterial
    },
    {
      path: '/hotcenter/materialstatus',
      name: '/hotcenter/materialstatus',
      meta: {
        activeidx: '',
        title: '物料库现状 | 热门管理'
      },
      component: Materialstatus
    },
    {
      path: '/hotcenter/manage',
      name: '/hotcenter/manage',
      meta: {
        activeidx: '7-94',
        title: '管理后台 | 热门管理'
      },
      component: Speedhot
    },
    {
      path: '/hotcenter/datamonitor',
      name: '/hotcenter/datamonitor',
      meta: {
        activeidx: '',
        title: '热门流数据监控 | 热门管理'
      },
      component: Datamonitor
    },
    {
      path: '/hotcenter/analydata',
      name: '/hotcenter/analydata',
      meta: {
        activeidx: '',
        title: '热门流数据分析 | 热门管理'
      },
      component: Analydata
    },
    {
      path: '/hotcenter/analysis/data',
      name: '/hotcenter/analysis/data',
      meta: {
        activeidx: '7-36',
        title: '数据分析 | 热门管理'
      },
      component: Analysisdata
    },
    {
      path: '/hotcenter/analysis/material',
      name: '/hotcenter/analysis/material',
      meta: {
        activeidx: '7-37',
        title: '物料分析 | 热门管理'
      },
      component: Analysismaterial
    },
    {
      path: '/hotcenter/analysis/user',
      name: '/hotcenter/analysis/user',
      meta: {
        activeidx: '7-98',
        title: '用户分析 | 热门管理'
      },
      component: Analysisuser
    },
    {
      path: '/hotcenter/channel',
      name: '/hotcenter/channel',
      meta: {
        activeidx: '7-64',
        title: '频道管理 | 热门管理'
      },
      component: Channel
    },
    {
      path: '/hotcenter/channel/material',
      name: '/hotcenter/channel/material',
      meta: {
        activeidx: '',
        title: '频道物料 | 热门管理'
      },
      component: Channelmaterial
    },
    {
      path: '/channel/user/whitelist/document',
      name: '/channel/user/whitelist/document',
      meta: {
        activeidx: '',
        title: '作者管理-用户白名单-用户手册 | 频道管理'
      },
      component: Channelwhitelistdoc
    },
    {
      path: '/platform/setmenu',
      name: '/platform/setmenu',
      meta: {
        activeidx: '19-38',
        title: '导航栏设置 | 平台管理'
      },
      component: Setmenu
    },
    {
      path: '/platform/usermanage',
      name: '/platform/usermanage',
      meta: {
        activeidx: '19-90',
        title: '用户管理 | 平台管理'
      },
      component: Usermanage
    },
    {
      path: '/hotcenter/project',
      name: '/hotcenter/project',
      meta: {
        activeidx: '7-109',
        title: '项目管理 | 热门管理'
      },
      component: Project
    },
    {
      path: '/lab/smart/imgcut',
      name: '/lab/smart/imgcut',
      meta: {
        activeidx: '47-54',
        title: '图片智能裁剪 | 效果演示'
      },
      component: Imgcut
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
