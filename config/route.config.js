'use strict';


// 路由配置

module.exports = {
    '/index': {
        get: 'view.index'
    },
    '/': {
        get: 'view.index'
    },
    '/user/add': {
        get: 'user.add'
    },

    '/index/test': {
        get: 'index.test'
    },

    //用户
    '/goods/get': {
        get: 'goods.get'
    },

    //用户
    '/goods/add': {
        post: 'goods.add'
    },

}
