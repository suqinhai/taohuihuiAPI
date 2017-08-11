'use strict';
const util = require('../util/util.js');
const goodsModel = require('../models/goods.model.js');
const classifyModel = require('../models/classify.model.js');
const navModel = require('../models/nav.model.js');
const goodsDetails = require('../models/goodsDetails.model.js');
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
    param.name ? data.name = new RegExp(param.name) : '';

    if (param.publish === 0 || param.publish === '0') {
        var data = { 'publish': { $in: ['', 0] } };
    }
    if (param.publish == 1) {
        var data = { 'publish': param.publish };
    }

    var data = { 'publish': param.publish }; // 0 未发布  1 发布

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
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
 * 获取活动商品
 * 
 * @Author   suqinhai
 * @DateTime 2017-08-05
 * @QQ       467456744
 * @param    {[type]}   req  [description]
 * @param    {[type]}   res  [description]
 * @param    {Function} next [description]
 * @return   {[type]}        [description]
 */
exports.getActivityClassGoods = async function(req, res, next) {
    
    req.checkQuery({
        'activityClass': {
            notEmpty: {
                options: [true],
                errorMessage: 'activityClass 不能为空'
            },
        }
    })

    var goodIds = [];
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var data = {promoType:{$in:param.activityClass}}

  
    var goodId = await goodsDetails.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('goodId')

    goodId.forEach(function(val,index){
       goodIds.push(val.goodId)
    })

    var count = await goodsModel.count({'_id':{$in:goodIds},'publish':1})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    var goodIds = goodsModel.find({'_id':{$in:goodIds},'publish':1})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('auctionId auctionUrl reservePrice biz30day clickUrl couponAmount couponEffectiveEndTime couponEffectiveStartTime couponInfo couponLeftCount couponLink couponLinkTaoToken couponShortLinkUrl couponStartFee couponTotalCount shopTitle pictUrl taoToken title tkCommFee tkRate zkPrice userType category sort publish createTime updateTime')
        .lean()
        .exec(function(err, data) {
            err ? res.send(err) : '';
            var len = data.length;
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
 *
 * 获取分类商品
 * 
 * @Author   suqinhai
 * @Contact  467456744@qq.com
 * @DateTime 2017-08-04
 * @param    {[type]}         req  [description]
 * @param    {[type]}         res  [description]
 * @param    {Function}       next [description]
 * @return   {[type]}              [description]
 */
exports.getClassifyGoods = async function(req, res, next) {

    req.checkQuery({
        'classifyId': {
            notEmpty: {
                options: [true],
                errorMessage: 'classifyId 不能为空'
            },
        }
    })

    var data = {}
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    var thirdPropertyData = await classifyModel.findOne({ '_id': param.classifyId }).select('thirdPropertyNames');
    param.name ? data.title = new RegExp(param.name) : '';

    // 销量降序
    if (param.biz30day == 'desc') {
        var sort = { 'biz30day': -1 }
    }

    // 销量升序
    if (param.biz30day == 'asc') {
        var sort = { 'biz30day': 1 }
    }

    // 价格降序
    if (param.zkPrice == 'desc') {
        var sort = { 'zkPrice': -1 }
    }

    // 价格升序
    if (param.zkPrice == 'asc') {
        var sort = { 'zkPrice': 1 }
    }

    // 淘宝
    if (param.userType == '0') {
        data.userType = 0;
    }

    // 天猫 
    if (param.userType == '1') {
        data.userType = 1;
    }

    // 优惠券最底 
    if (param.couponAmount == 'desc') {
        var sort = { 'couponAmount': -1 }
    }

    // 优惠券最高
    if (param.couponAmount == 'asc') {
        var sort = { 'couponAmount': 1 }
    }

    data.publish = 1;
    data.category = thirdPropertyData.thirdPropertyNames;

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sort) // -1 降序 1 升序 
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
 *
 * 搜索商品
 * 
 * @Author   suqinhai
 * @Contact  467456744@qq.com
 * @DateTime 2017-08-04
 * @param    {[type]}         req  [description]
 * @param    {[type]}         res  [description]
 * @param    {Function}       next [description]
 * @return   {[type]}              [description]
 */
exports.getSearchGoods = async function(req, res, next) {

    var data = {}
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));
    param.name ? data.title = new RegExp(param.name) : '';
    // 商品名称
     // 销量降序
    if (param.biz30day == 'desc') {
        var sort = { 'biz30day': -1 }
    }

    // 销量升序
    if (param.biz30day == 'asc') {
        var sort = { 'biz30day': 1 }
    }

    // 价格降序
    if (param.zkPrice == 'desc') {
        var sort = { 'zkPrice': -1 }
    }

    // 价格升序
    if (param.zkPrice == 'asc') {
        var sort = { 'zkPrice': 1 }
    }

    // 淘宝
    if (param.userType == '0') {
        data.userType = 0;
    }

    // 天猫 
    if (param.userType == '1') {
        data.userType = 1;
    }

    // 优惠券最底 
    if (param.couponAmount == 'desc') {
        var sort = { 'couponAmount': -1 }
    }

    // 优惠券最高
    if (param.couponAmount == 'asc') {
        var sort = { 'couponAmount': 1 }
    }

    data.publish = 1;


    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sort) // -1 降序 1 升序 
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

    req.checkQuery({
        '_id': {
            notEmpty: {
                options: [true],
                errorMessage: '_id 不能为空'
            },
        }
    })

    console.log(req.query._id)
    
    var param = req.query
    var page = parseInt((param.page ? param.page : 1));
    var pageSize = parseInt((param.pageSize ? param.pageSize : 30));

    var data = {
        'goodId': param._id
    };

    param.name ? data.name = new RegExp(param.name) : '';

    var count = await goodsModel.count(data)
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    goodsDetails.findOne(data)
        .select('goodId brand popular sellerPromise payMethod promoType goldSellers mainPic detailsPic')
        .populate('goodId','auctionId auctionUrl reservePrice biz30day clickUrl couponAmount couponEffectiveEndTime couponEffectiveStartTime couponInfo couponLeftCount couponLink couponLinkTaoToken couponShortLinkUrl couponStartFee couponTotalCount shopTitle pictUrl taoToken title tkCommFee tkRate zkPrice userType category sort publish createTime updateTime')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
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
        'posterPic': param.poster, //详情轮播
        'detailsPic': param.detailsPic, //详情图
        'peopleBug': param.peopleBug, //购买人数
        'url': param.url, // 购买链接
        'taoCode': param.taoCode, //淘口令
        'des': param.des, //推荐理由
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date()),
    };

    goodsModel.create(data, function(err, results) {
        res.status(200).json({
            'code': '1',
            'data': 'ok'
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

    goodsModel.update({ '_id': _id }, data, { 'multi': true }, function(err, results) {
        err ? res.send(err) : '';
        res.status(200).json({
            'code': '1',
            'data': 'ok'
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
            'data': 'ok'
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


