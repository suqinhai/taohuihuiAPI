'use strict';
/** 
 * 路由配置
 * [exports description]
 * @type {Object}
 */
module.exports = {

    // 后台用户管理路由
    '/admin/register': {
        'post': 'admin.register'
    },
    '/admin/login': {
        'get': 'admin.login'
    },
    '/admin/modifyPassWord': {
        'post': 'admin.modifyPassWord'
    },
    '/admin/logout': {
        'post': 'admin.logout'
    },

    // 后台用户管理路由
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
    '/nav/get': {
        'get': 'nav.get'
    },
    '/nav/add': {
        'post': 'nav.add'
    },
    '/nav/modify': {
        'post': 'nav.modify'
    },
    '/nav/del': {
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
