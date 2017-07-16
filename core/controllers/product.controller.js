'use strict';
var util = require('../util/util.js');
var productModel = require('../models/product.model.js');

/**
 * 获取商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = function(req, res, next) {
    var param = req.query || req.params
    var data = {};

    productModel.find(data)
        .lean()
        .exec(function(err, results) {
            res.status(200).json({
                'code': '1',
                'data': results
            });
        })
}

/**
 * 添加商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = function(req, res, next) {
    var param = req.query || req.params
    var data = {
        'picUrl': param.picUrl, //商品图片
        'title': param.title, // 标题
        'origPrice': param.origPrice, //原价
        'nowPrice': param.nowPrice, //现价
        'des': param.des, //描述
        'createTime':util.dataFormat(new Date()),
        'updateTime':util.dataFormat(new Date()),
    };

    productModel.create(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    });
}

/**
 * 修改商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.modify = function(req, res, next) {
    var param = req.query || req.params
    var _id = param.id
    var data = {
        'picUrl': param.picUrl, //商品图片
        'title': param.title, // 标题
        'origPrice': param.origPrice, //原价
        'nowPrice': param.nowPrice, //现价
        'des': param.des, //描述
        'updateTime':util.dataFormat(new Date()),
    };
    productModel.update({ '_id': _id }, data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    });
}

/**
 * 删除商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.del = function(req, res, next) {
    var param = req.query || req.params;
    var data = {
        '_id': param.id
    };
    productModel.remove(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    });
}