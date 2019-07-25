import Vue from 'vue'
import Router from 'vue-router'
import Querymaterial from '@/views/hotcenter/querymaterial'
import Operatematerial from '@/views/hotcenter/operatematerial'
import Monitormaterial from '@/views/hotcenter/monitormaterial'
import Materialstatus from '@/views/hotcenter/materialstatus'
import Manage from '@/views/hotcenter/manage'
import Datamonitor from '@/views/hotcenter/datamonitor'
import Analydata from '@/views/hotcenter/analydata'
import Basemonitor from '@/views/hotcenter/basemonitor'
import Analysisdata from '@/views/hotcenter/analysis/data'
import Analysismaterial from '@/views/hotcenter/analysis/material'
import Analysisuser from '@/views/hotcenter/analysis/user'
import Channel from '@/views/hotcenter/channel'
import Channelmaterial from '@/views/hotcenter/channel/material'
import Channelwhitelistdoc from '@/views/channel/user/whitelist/document'
import Setmenu from '@/views/platform/setmenu'
import Usermanage from '@/views/platform/usermanage'
import Project from '@/views/hotcenter/project'
import Imgcut from '@/views/lab/smart/imgCut'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/404', meta: {activeidx: '',title: '404 | 热门管理'},component: () => import('@/views/404'), hidden: true },
    { path: '/hotcenter', redirect: '/hotcenter/basemonitor', hidden: true },
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
      component: Manage
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
      path: '/hotcenter/basemonitor',
      name: '/hotcenter/basemonitor',
      meta: {
        activeidx: '7-35',
        title: '常规监控 | 热门管理'
      },
      component: Basemonitor
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
