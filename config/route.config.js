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
    '/user/add': {
        'post': 'user.add'
    },
    '/user/modify': {
        'post': 'user.modify'
    },
    '/user/del': {
        'post': 'user.del'
    },
    '/user/login': {
        'post': 'user.login'
    },
    '/user/logout': {
        'get': 'user.logout'
    },


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
    '/goods/getClassifyGoods': {
        'get': 'goods.getClassifyGoods'
    },
    '/goods/getSearchGoods': {
        'get': 'goods.getSearchGoods'
    },


    /*
        前台接口
     */
    '/frontend/goods/getDetails': {
        'get': 'goods.getDetails'
    },
    '/frontend/goods/getItem': {
        'get': 'goods.getItem'
    },
    '/frontend/nav/getNav': {
        'get': 'nav.getNav'
    },
    '/frontend/bottomMenu/getMenu': {
        'get': 'bottomMenu.getMenu'
    },
    '/frontend/poster/getPoster': {
        'get': 'poster.getPoster'
    },
    '/frontend/classify/getClassify': {
        'get': 'classify.getClassify'
    },
    '/frontend/property/getProperty': {
        'get': 'property.getProperty'
    },
    

    

    

    
}

const rs = {};
for (var router in routers){
    rs['/' + project.projectName + router] = routers[router]
}
module.exports = rs
