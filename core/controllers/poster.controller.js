'use strict';
const util = require('../util/util.js');
const posterModel = require('../models/poster.model.js');


/**
 * 获取前台首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getPoster = async function(req, res, next) {
    var param = req.query || req.params
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 15));
    var data = {};
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await posterModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        });

    posterModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('title url img sort publish alt createTime updateTime')
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
        });
}

/**
 * 获取首页轮播
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

    var count = await posterModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        });

    posterModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('title url img sort publish alt createTime updateTime')
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
        });
}

/**
 * 添加首页轮播
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = function(req, res, next) {

    req.checkBody({
        'url': {
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
        'img': {
            notEmpty: {
                options: [true],
                errorMessage: 'img 不能为空'
            }
        },
        'title': {
            notEmpty: {
                options: [true],
                errorMessage: 'title 不能为空'
            }
        },
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'sort 不能为空'
            },
            isNumber: { errorMessage: 'sort 需为number类型' }
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
        'url': param.url,
        'sort': parseInt(param.sort),
        'img': param.img,
        'title': param.title,
        'alt': param.alt,
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };

   

    posterModel.create(data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
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

    req.checkBody({
        '_id': {
            notEmpty: {
                options: [true],
                errorMessage: '_id 不能为空'
            }
        },
        'title': {
            notEmpty: {
                options: [true],
                errorMessage: 'title 不能为空'
            }
        },
        'img': {
            notEmpty: {
                options: [true],
                errorMessage: 'img 不能为空'
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
            isNumber: { errorMessage: 'sort 不是一个number类型' }
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
        'url': param.url,
        'img': param.img,
        'sort': parseInt(param.sort),
        'title': param.title,
        'alt': param.alt,
        'updateTime': util.dataFormat(new Date())
    };
    posterModel.update({ '_id': _id }, data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
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

    posterModel.remove(data)
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
exports.upPoster = async function(req, res, next) {
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
    posterModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
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
exports.downPoster = async function(req, res, next) {
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
    posterModel.update({ '_id': { $in: _ids } }, data, { 'multi': true }, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'msg': results
        });
    })
}