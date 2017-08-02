'use strict';
const util = require('../util/util.js');
const goodsModel = require('../models/goods.model.js');

/**
 * 获取首页商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.get = async function(req, res, next) {
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));

    var data = {
        'publish': param.publish // 0 未发布  1 发布
    };

    param.name ? data.name = new RegExp(param.name) : '';

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
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
 * 获取前台首页商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getItem = async function(req, res, next) {
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));

    var data = {
        'publish': 1 // 0 未发布  1 发布
    };
    
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
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
 * 前台获取详情商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.getDetails = async function(req, res, next) {
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var data = {
        '_id': param._id
    };
    
    param.name ? data.name = new RegExp(param.name) : '';

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
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
 * 添加首页商品
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */
exports.add = function(req, res, next) {
    var param = req.query || req.params
    var data = {
        'picUrl': param.picUrl, //首页商品图片
        'title': param.title, // 标题
        'origPrice': param.origPrice, //原价
        'nowPrice': param.nowPrice, //现价
        'posterPic':param.poster, //详情轮播
        'detailsPic':param.detailsPic, //详情图
        'peopleBug':param.peopleBug, //购买人数
        'url': param.url, // 购买链接
        'taoCode':param.taoCode, //淘口令
        'des': param.des, //推荐理由
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };

    goodsModel.create(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': results
        });
    });
}

/**
 * @Author   suqinhai
 * @DateTime 2017-07-28
 * @QQ       467456744
 * @return   {[type]}        [description]
 */
exports.status = function(req, res, next) {

    req.checkBody({
        '_ids': {
            notEmpty: {
                options: [true],
                errorMessage: '_ids 不能为空'
            },
            isArray: { errorMessage: '_ids 需为数组' }
        },
        'publish': {
            notEmpty: {
                options: [true],
                errorMessage: 'url 不能为空'
            }
        },
    })

    if (req.validationErrors()) {
        return res.status(400).json({
            'code': '0',
            'data': req.validationErrors()
        });
    }

    var param = req.body
    var _id = { $in: param._ids }
    var data = {
        'publish': parseInt(param.publish), // 0 为上线 1 已上线 -1 已下线
        'updateTime': util.dataFormat(new Date())
    };

    goodsModel.update({ '_id': _id }, data, {'multi': true},function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })

}
/**
 * 修改首页商品
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
        'sort': {
            notEmpty: {
                options: [true],
                errorMessage: 'name 不能为空'
            }
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
        'sort': parseInt(param.sort),
        'updateTime': util.dataFormat(new Date())
    };

    goodsModel.update({ '_id': _id }, data, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': results
        });
    })
}



/**
 * 删除首页商品
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

    goodsModel.remove(data)
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'data': data
            });
        })
}





