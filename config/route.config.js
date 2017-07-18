'use strict';
/** 
 * 路由配置
 * [exports description]
 * @type {Object}
 */
module.exports = {

    // 后台用户管理路由
    '/taohuihui/admin/register': {
        'post': 'admin.register'
    },
    '/taohuihui/admin/login': {
        'post': 'admin.login'
    },
    '/taohuihui/admin/modifyPassWord': {
        'post': 'admin.modifyPassWord'
    },
    '/taohuihui/admin/logout': {
        'get': 'admin.logout'
    },

    // 前台用户管理路由
    '/user/register': {
        'post': 'user.register'
    },
    '/user/login': {
        'get': 'user.login'
    },
    '/user/modifyPassWord': {
        'post': 'user.modifyPassWord'
    },
    '/user/logout': {
        'post': 'user.logout'
    },


    // 首页菜单路由
    '/taohuihui/nav/get': {
        'get': 'nav.get'
    },
    '/taohuihui/nav/add': {
        'post': 'nav.add'
    },
    '/taohuihui/nav/modify': {
        'post': 'nav.modify'
    },
    '/taohuihui/nav/del': {
        'post': 'nav.del'
    },


    // 首页海报轮播
    '/poster/get': {
        'get': 'poster.get'
    },
    '/poster/add': {
        'post': 'poster.add'
    },
    '/poster/modify': {
        'post': 'poster.modify'
    },
    '/poster/del': {
        'post': 'poster.del'
    },


    // 首页底部浮动菜单
    '/bottomMenu/get': {
        'get': 'bottomMenu.get'
    },
    '/bottomMenu/add': {
        'post': 'bottomMenu.add'
    },
    '/bottomMenu/modify': {
        'post': 'bottomMenu.modify'
    },
    '/bottomMenu/del': {
        'post': 'bottomMenu.del'
    },
    


}
