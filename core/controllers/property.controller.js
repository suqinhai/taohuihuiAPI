'use strict';
const util = require('../util/util.js');
const propertyModel = require('../models/property.model.js');


/**
 * 获取属性
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getProperty = async function(req, res, next) {
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    
    req.checkQuery({
        'classifyId': {
            notEmpty: {
                options: [true],
                errorMessage: 'classifyId 不能为空'
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
        'classifyId':param.classifyId
    };

    param.name ? data.name = new RegExp(param.name) : '';

    var count = await propertyModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    propertyModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('name url sort createTime updateTime')
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
 * 添加属性
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.addProperty = function(req, res, next) {

    req.checkBody({
        'classifyId': {
            notEmpty: {
                options: [true],
                errorMessage: 'classifyId 不能为空'
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
        'sort': parseInt(param.sort),
        'classifyId':param.classifyId,
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };

    propertyModel.create(data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
        });
    })

}

/**
 * 修改属性
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.modifyProperty = function(req, res, next) {

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
        'sort': parseInt(param.sort),
        'updateTime': util.dataFormat(new Date())
    };

    propertyModel.update({ '_id': _id }, data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
        });
    })
}

/**
 * 删除属性
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.delProperty = function(req, res, next) {

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
    console.log()
    propertyModel.remove(data)
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'data': data
            });
        })
}