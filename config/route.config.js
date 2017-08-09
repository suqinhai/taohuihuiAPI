'use strict';
/** 
 * 路由配置
 * [exports description]
 * @type {Object}
 */
const project = require('./project.config.js');


const routers = {
    // 后台用户管理路由
    '/admin/get': {
        'get': 'admin.get'
    },
    '/admin/add': {
        'post': 'admin.add'
    },
    '/admin/modify': {
        'post': 'admin.modify'
    },
    '/admin/del': {
        'post': 'admin.del'
    },
    '/admin/login': {
        'post': 'admin.login'
    },
    '/admin/logout': {
        'get': 'admin.logout'
    },

    // 前台用户管理路由
    '/user/get': {
        'get': 'user.get'
    },
    // '/user/del': {
    //     'post': 'user.del'
    // },



    // 首页头部菜单
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
    '/nav/upNav': {
        'post': 'nav.upNav'
    },
    '/nav/downNav': {
        'post': 'nav.downNav'
    },
    '/nav/activityActionTypeof': {
        'get': 'nav.activityActionTypeof'
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
    '/poster/upPoster': {
        'post': 'poster.upPoster'
    },
    '/poster/downPoster': {
        'post': 'poster.downPoster'
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
    '/bottomMenu/upBottomMenu': {
        'post': 'bottomMenu.upBottomMenu'
    },
    '/bottomMenu/downBottomMenu': {
        'post': 'bottomMenu.downBottomMenu'
    },


    // 分类管理接口
    '/classify/get': {
        'get': 'classify.get'
    },
    '/classify/add': {
        'post': 'classify.add'
    },
    '/classify/modify': {
        'post': 'classify.modify'
    },
    '/classify/del': {
        'post': 'classify.del'
    },
    '/classify/upClassify': {
        'post': 'classify.upClassify'
    },
    '/classify/downClassify': {
        'post': 'classify.downClassify'
    },

    // 分类管理接口
    '/classify/getThirdPropertySelect': {
        'get': 'classify.getThirdPropertySelect'
    },
    '/classify/getThirdProperty': {
        'get': 'classify.getThirdProperty'
    },
    '/classify/addThirdProperty': {
        'post': 'classify.addThirdProperty'
    },
    '/classify/modifyThirdProperty': {
        'post': 'classify.modifyThirdProperty'
    },
    '/classify/delThirdProperty': {
        'post': 'classify.delThirdProperty'
    },

    // 分类属性管理接口
    '/property/getProperty': {
        'get': 'property.getProperty'
    },
    '/property/addProperty': {
        'post': 'property.addProperty'
    },
    '/property/modifyProperty': {
        'post': 'property.modifyProperty'
    },
    '/property/delProperty': {
        'post': 'property.delProperty'
    },

    // 商品管理接口
    '/goods/get': {
        'get': 'goods.get'
    },
    '/goods/status': {
        'post': 'goods.status'
    },
    '/goods/modify': {
        'post': 'goods.modify'
    },
    '/goods/del': {
        'post': 'goods.del'
    },
}


/*
   前台接口
*/
const frontend = {
    '/goods/getDetails': {
        'get': 'goods.getDetails'
    },
    '/goods/getItem': {
        'get': 'goods.getItem'
    },
    '/nav/getNav': {
        'get': 'nav.getNav'
    },
    '/bottomMenu/getMenu': {
        'get': 'bottomMenu.getMenu'
    },
    '/poster/getPoster': {
        'get': 'poster.getPoster'
    },
    '/classify/getClassify': {
        'get': 'classify.getClassify'
    },
    '/property/getProperty': {
        'get': 'property.getProperty'
    },
    '/goods/getClassifyGoods': {
        'get': 'goods.getClassifyGoods'
    },
    '/goods/getActivityClassGoods': {
        'get': 'goods.getActivityClassGoods'
    },
    '/goods/getSearchGoods': {
        'get': 'goods.getSearchGoods'
    },
    '/user/login': {
        'post': 'user.login'
    },
    '/user/logout': {
        'get': 'user.logout'
    },
    '/user/register': {
        'post': 'user.register'
    },
    '/user/modify': {
        'post': 'user.modify'
    },

}

const rs = {};

for (var router in routers) {
    rs['/' + project.projectName + router] = routers[router]
}
for (var router in frontend) {
    rs['/' + project.projectName + '/frontend' + router] = frontend[router]
}

module.exports = rs