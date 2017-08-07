'use strict';
const _ = require('lodash');
const util = require('../util/util.js');
const navModel = require('../models/nav.model.js');
const thirdPropertyModel = require('../models/thirdProperty.model.js');

/**
 * 获取前台首页导航列表
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getNav = async function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 15));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await navModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    navModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({'sort':-1}) // -1 降序 1 升序 
        .select('name sort url publish actionType thirdPropertyNames createTime updateTime')
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
 * 获取首页导航列表
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = async function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 15));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await navModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    navModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({'sort':-1}) // -1 降序 1 升序 
        .select('name sort url publish actionType thirdPropertyNames createTime updateTime')
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
 * 添加首页导航列表
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = async function(req, res, next) {

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
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber: { errorMessage: 'sort 需为number类型' }
        },
        'actionType': {
            notEmpty: {
                options: [true],
                errorMessage: 'actionType 不能为空'
            },
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
        'name': param.name,
        'url': param.url,
        'sort': parseInt(param.sort),
        'actionType': param.actionType,
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };
    navModel.create(data, function(err, data) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': data
        });
    })

}

/**
 * 修改首页导航列表
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.modify = async function(req, res, next) {

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
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber: { errorMessage: 'sort 需为number类型' }
        },
        'actionType': {
            notEmpty: {
                options: [true],
                errorMessage: 'actionType 不能为空'
            },
        },
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
        'sort': parseInt(param.sort),
        'actionType': param.actionType,
        'updateTime': util.dataFormat(new Date())
    };
    navModel.update({ '_id': _id }, data, function(err, data) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': data
        });
    })
}

/**
 * 删除首页导航列表
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

    navModel.remove(data)
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
exports.upNav = async function(req, res, next) {
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
    navModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
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
exports.downNav = async function(req, res, next) {
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
    navModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'msg': results
        });
    })
}