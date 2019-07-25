/**
 * page white list
 * 页面路由白名单：不需要引入头部模块与左侧导航的页面
 */

 export const pagelist = [
     '/mark/subtitle',
     '/hotcenter/operatematerial/pocket',
     '/questionnaire'
 ];

 /**
 * 无需判断登录状态的页面路由白名单
 */
 export const unloginpage = [
    '/hotcenter/analysis/material/darwin'
];