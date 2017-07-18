'use strict';
const util = require('../util/util.js');
const posterModel = require('../models/poster.model.js');
/**
 * 获取首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    posterModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('url sort title alt createTime updateTime')
        .lean()
        .exec(function(err, results) {
            res.status(200).json({
                'code': '1',
                'data': results
            });
        })
}

/**
 * 添加首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = function(req, res, next) {
    var param = req.query || req.params
    req.checkQuery({
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
            isNumber:{ errorMessage: 'sort 不是一个number类型'}
        },
    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var data = {
        'url': param.url,
        'sort': parseInt(param.sort),
        'title': param.title,
        'alt': param.alt,
        'createTime':util.dataFormat(new Date()),
        'updateTime':util.dataFormat(new Date()),
    };
    posterModel.create(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })

}

/**
 * 修改首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.modify = function(req, res, next) {
    var param = req.query || req.params
    req.checkQuery({
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
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber:{ errorMessage: 'sort 不是一个number类型'}
        },
    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var _id = param._id
    var data = {
        'url': param.url,
        'sort': parseInt(param.sort),
        'title': param.title,
        'alt': param.alt,
        'updateTime':util.dataFormat(new Date())
    };
    posterModel.update({ '_id': _id }, data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })
}

/**
 * 删除首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.del = function(req, res, next) {
    var param = req.query || req.params
    req.checkQuery({
        '_id': {
            notEmpty: {
                options: [true],
                errorMessage: '_id 不能为空'
            }
        }
    })
    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var data = {
        '_id': param._id
    };
    posterModel.remove(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })
}