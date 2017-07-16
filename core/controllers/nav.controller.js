'use strict';
var util = require('../util/util.js');
var navModel = require('../models/nav.model.js');
/**
 * 获取首页导航列表
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = function(req, res, next) {
    var param = req.query || req.params
    var data = {};
    navModel.find(data)
        .lean()
        .exec(function(err, results) {
            res.status(200).json({
                'code': '1',
                'data': results
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
exports.add = function(req, res, next) {
    var param = req.query || req.params
    var data = {
        'name': param.name,
        'sort': parseInt(param.sort),
        'createTime':util.dataFormat(new Date()),
        'updateTime':util.dataFormat(new Date()),
    };
    navModel.create(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
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
exports.modify = function(req, res, next) {
    var param = req.query || req.params
    var _id = param._id
    var data = {
        'name': param.name,
        'sort': parseInt(param.sort),
        'updateTime':util.dataFormat(new Date())
    };
    navModel.update({ '_id': _id }, data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
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
    var param = req.query || req.params
    var data = {
        '_id': param._id
    };
    navModel.remove(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })
}