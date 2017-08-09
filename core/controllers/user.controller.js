'use strict';
const util = require('../util/util.js');
const userModel = require('../models/user.model.js');
// const userServers = require('../servers/admin.servers.js');



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

    var count = await userModel.count({})
        .exec(function(err, count) {
            err ? res.send(err) : '';
            return count
        })

    userModel.find(data)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('user password name email createTime updateTime')
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

exports.register = async function(req, res, next) {

    req.checkBody({
        'user': {
            notEmpty: {
                options: [true],
                errorMessage: 'user 不能为空'
            }
        },
        'password': {
            notEmpty: {
                options: [true],
                errorMessage: 'password 不能为空'
            }
        },
        'confirmPassword': {
            notEmpty: {
                options: [true],
                errorMessage: 'confirmPassword 不能为空'
            }
        },
        'email': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
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

    if (　param.password != param.confirmPassword) {
        res.status(200).json({
            'code': '0',
            'msg': '2次输入的密码不一致'
        });
    }

    var data = {
        'user': param.user,
        'password': param.password,
        'name': 'H_' + param.user,
        'email': param.email,
        'createTime': util.dataFormat(new Date()),
        'updateTime': util.dataFormat(new Date())
    }

    /*判断有没有这个用户*/
    var isUser = await userModel.findOne({ 'user': data.user })
        .then(function(data) {
            if (data) {
                res.status(200).json({
                    'code': '0',
                    'msg': '已存在该用户！'
                });
                return true;
            }
            return false
        });

    //新增用户
    if (!isUser) {
        userModel.create(data, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.status(200).json({
                'code': '1',
                'msg': '注册成功！'
            });
        })
    }
}

/**
 * 后台修改密码
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.modify = async function(req, res, next) {

    req.checkBody({
        'user': {
            notEmpty: {
                options: [true],
                errorMessage: 'user 不能为空'
            }
        },
        'password': {
            notEmpty: {
                options: [true],
                errorMessage: 'password 不能为空'
            }
        },
        'email': {
            notEmpty: {
                options: [true],
                errorMessage: 'email 不能为空'
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
        'user': param.user,
        'email': param.email,
        'password': param.password,
        'updateTime': util.dataFormat(new Date()),
    }

    /*判断有没有这个用户*/
    var isUser = await userModel.findOne({ 'user': param.user, 'email': param.email })
        .then(function(data) {
            if (data) {
                return true;
            }
            res.status(200).json({
                'code': '0',
                'msg': '用户名或邮箱不正确'
            });
            return false
        });
    /* 更新密码*/
    if (isUser) {
        userModel.update({ 'user': param.user,'email': param.email }, {'password':param.password,'updateTime':util.dataFormat(new Date())}, function(err,data) {
            err ? res.send(data) : '';
            if (data) {
                res.status(200).json({
                    'code': '1',
                    'msg': '修改成功！'
                });
            } else {
                res.status(200).json({
                    'code': '0',
                    'msg': '修改失败！'
                });
            }
        });
    }

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

    userModel.remove(data)
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
        'password': {
            notEmpty: {
                options: [true],
                errorMessage: 'password 不能为空'
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
        user: param.user,
        password: param.password,
    }

    /*登陆判断*/
    userModel.findOne(data)
        .select('email name user')
        .lean()
        .exec(function(err, result) {
            if (result) {
                req.session.userId = result._id;
                res.status(200).json({
                    'code': '1',
                    'msg': '登陆成功！',
                    'data': result
                });
            } else {
                res.status(200).json({
                    'code': '0',
                    'msg': '账号名或密码错误，请重试'
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