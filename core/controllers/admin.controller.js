'use strict';
const util = require('../util/util.js');
const adminModel = require('../models/admin.model.js');
const adminServers = require('../servers/admin.servers.js');


/**
 * 获取用户列表
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

    var count = await adminModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    adminModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('user name email user createTime updateTime')
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
 * 后台注册
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
        'email': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
            }
        },
        'user': {
            notEmpty: {
                options: [true],
                errorMessage: 'user 不能为空'
            }
        },
        'newPasswd': {
            notEmpty: {
                options: [true],
                errorMessage: 'newPasswd 不能为空'
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
    var data = {
        'name':param.name,
        'email':param.email,
        'user':param.user,
        'passwd':param.newPasswd,
        'createTime':util.dataFormat(new Date()),
        'updateTime':util.dataFormat(new Date())
    }

    /*判断有没有这个用户*/
    adminModel.findOne({ 'user': data.user })
        .then(function(result) {
            if (result) {
                res.status(200).json({
                    'code': '1',
                    'msg': '已存在该用户！'
                });
            } else {
                /*新增用户*/
                adminModel.create(data,function(err,data){
                    if (err){
                        console.log(err)
                    }
                    res.status(200).json({
                        'code': '1',
                        'msg': '新增用户成功！'
                    });
                })
                
            }
        });
}

/**
 * 后台修改密码
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.modify = function(req, res, next) {

     req.checkBody({
        'name': {
            notEmpty: {
                options: [true],
                errorMessage: 'name 不能为空'
            }
        },
        'email': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
            }
        },
        'newPasswd':{
            notEmpty: {
                options: [true],
                errorMessage: 'newPasswd 不能为空'
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
        'name':param.name,
        'email':param.email,
        'updateTime':util.dataFormat(new Date()),
    }

    /*判断有没有这个用户*/
    adminModel.findOne({ '_id':_id,'passwd':param.passwd})
        .then(function(result) {
            if ( !result ) {
                res.status(200).json({
                    'code': '0',
                    'msg': '密码错误！'
                });
            } else {
                data.passwd = param.newPasswd
                /* 更新密码*/
                adminModel.update({'_id':_id}, data , function(result) {
                        if (result) {
                            res.status(200).json({
                                'code': '1',
                                'msg': '修改成功！'
                            });
                        } else {
                            res.status(200).json({
                                'code': '1',
                                'msg': '修改失败！'
                            });
                        }
                });
            }

        });
}

/**
 * 删除用户
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

    adminModel.remove(data)
        .exec(function(err, data) {
            err ? res.send(err) : '';
            res.status(200).json({
                'code': '1',
                'data': data
            });
        })
}



/**
 *
 * 后台用户登录
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.login = function(req, res, next) {

    req.checkBody({
        'user': {
            notEmpty: {
                options: [true],
                errorMessage: 'user 不能为空'
            }
        },
        'passwd': {
            notEmpty: {
                options: [true],
                errorMessage: 'passwd 不能为空'
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
    var data = {
        user:param.user,
        passwd:param.passwd,
    }

    /*登陆判断*/
    adminModel.findOne(data)
        .select('name user email createTime updateTime')
        .lean()
        .exec(function(err, result) {
            if (result) {
                req.session.userId = result._id;
                res.status(200).json({
                    'code': '1',
                    'msg': '登陆成功！',
                    'data':result
                });
            } else {
                res.status(200).json({
                    'code': '0',
                    'msg': '账号或密码错误！'
                });
            }
        });
}




/**
 * 后台注销登录
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.logout = function(req, res, next) {
    req.session.userId = null;
    if (!req.session.userId) {
        res.status(200).json({
            'code': '1',
            'msg': '注销成功！'
        });
    }
}

