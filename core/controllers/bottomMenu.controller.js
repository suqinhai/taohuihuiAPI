'use strict';
const util = require('../util/util.js');
const bottomMenuModel = require('../models/bottomMenu.model.js');


/**
 * 获取前台首页底部浮动菜单
 * 
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getMenu = async function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await bottomMenuModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    bottomMenuModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('name url sort publish actionType createTime updateTime')
        .sort({'sort':-1}) // -1 降序 1 升序 
        .lean()
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'count': count,
                'list': data,
                'total_page': Math.ceil(count / pageSize),
                'now_page': page
            });
        })

}

/**
 * 获取首页底部浮动菜单
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = async function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await bottomMenuModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    bottomMenuModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('name url sort publish actionType createTime updateTime')
        .sort({'sort':-1}) // -1 降序 1 升序 
        .lean()
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'count': count,
                'list': data,
                'total_page': Math.ceil(count / pageSize),
                'now_page': page
            });
        })

}

/**
 * 添加首页底部浮动菜单
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = function(req, res, next) {

    req.checkBody({
        'name': {
            notEmpty: {
                options: [true],
                errorMessage: 'name 不能为空'
            }
        },
        'url': {
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
        'actionType': {  
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber: { errorMessage: 'sort 需为number类型' }
        }
    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var param = req.body
    var data = {
        'name': param.name,
        'url': param.url,
        'actionType': param.actionType,
        'sort': parseInt(param.sort),
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };

    bottomMenuModel.create(data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
        });
    })

}

/**
 * 修改首页底部浮动菜单
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.modify = function(req, res, next) {

    req.checkBody({
        '_id': {
            notEmpty: {
                options: [true],
                errorMessage: '_id 不能为空'
            }
        },
        'name': {
            notEmpty: {
                options: [true],
                errorMessage: 'name 不能为空'
            }
        },
        'url': {
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
        'actionType': {
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber: { errorMessage: 'sort 需为number类型' }
        }
    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var param = req.body
    var _id = param._id
    var data = {
        'name': param.name,
        'url': param.url,
        'actionType': param.actionType,
        'sort': parseInt(param.sort),
        'updateTime': util.dataFormat(new Date())
    };

    bottomMenuModel.update({ '_id': _id }, data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
        });
    })
}

/**
 * 删除首页底部浮动菜单
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.del = function(req, res, next) {

    req.checkBody({
        '_ids': {
            notEmpty: {
                options: [true],
                errorMessage: '_ids 不能为空'
            },
            isArray: { errorMessage: '_ids 需为数组' }
        },

    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var param = req.body

    var data = {
        '_id': { $in: param._ids }
    }

    bottomMenuModel.remove(data)
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'data': data
            });
        })
}

/**
 *  上线分类
 * 
 * @Author   suqinhai
 * @DateTime 2017-08-03
 * @QQ       467456744
 * @return   {[type]}        [description]
 */
exports.upBottomMenu = async function(req, res, next) {
    req.checkBody({
        '_ids': {
            notEmpty: {
                options: [true],
                errorMessage: '_ids 不能为空'
            },
            isArray: { errorMessage: '_ids 需为数组' }
        },

    })
    var param = req.body
    var data = { 'publish': 1, }
    var _ids = param._ids
    bottomMenuModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'msg': results
        });
    })
}


/**
 *  下线分类
 * 
 * @Author   suqinhai
 * @DateTime 2017-08-03
 * @QQ       467456744
 * @return   {[type]}        [description]
 */
exports.downBottomMenu = async function(req, res, next) {
    req.checkBody({
        '_ids': {
            notEmpty: {
                options: [true],
                errorMessage: '_ids 不能为空'
            },
            isArray: { errorMessage: '_ids 需为数组' }
        },

    })
    var param = req.body
    var data = { 'publish': 0, }
    var _ids = param._ids
    bottomMenuModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'msg': results
        });
    })
}