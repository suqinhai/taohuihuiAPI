'use strict';
var userModel = require('../models/admin.model.js');
var userServers = require('../servers/admin.servers.js');

/**
 * 注册
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.register = function(req, res, next) {
    var param = req.query || req.params
    var user = param.user;
    var passwd = param.passwd;

    /*判断有没有这个用户*/
    userModel.findOne({ 'user': user })
        .then(function(result) {
            if (result) {
                res.status(200).json({
                    'code':'1',
                    'msg': '已存在该用户！'
                });
            } else {
                /*新增用户*/
                userModel.create({ 'user': user, 'passwd': passwd });
                res.status(200).json({
                    'code':'1',
                    'msg': '新增用户成功！'
                });
            }
        });
}

/**
 *
 * 用户登录
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.login = function(req, res, next) {
    var param = req.query || req.params
    var user = param.user;
    var passwd = param.passwd;

    /*已登陆判断*/
    if (req.session.id) {
        res.status(200).send('用户已登陆！');
        return false;
    }

    /*登陆判断*/
    userModel.findOne({ 'user': user, 'passwd': passwd })
        .then(function(result) {

            req.session.userId = result.id;

            if (result) {
                res.status(200).json({
                    'code':'1',
                    'msg': '登陆成功！'
                });
            } else {
                res.status(200).json({
                    'code':'1',
                    'msg': '登陆失败！'
                });
            }
        });
}

/**
 * 修改密码
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.modifyPassWord = function(req, res, next){
    var param = req.query || req.params
    var user = param.user;
    var passwd = param.passwd;

    /*判断有没有这个用户*/
    userModel.findOne({ 'user': user })
        .then(function(result) {
            if (!result) {
                res.status(200).json({
                    'code':'1',
                    'msg': '不存在该用户！'
                });
            } else {

                /* 更新密码*/
                userModel.update({ 'passwd': passwd }, { where: { 'user': user } })
                    .then(function(result) {
                        if (result) {
                            res.status(200).json({
                                'code':'1',
                                'msg': '修改密码成功！'
                            });
                        } else {
                            res.status(200).json({
                                'code':'1',
                                'msg': '修改密码失败！'
                            });
                        }
                    });
            }

        });
}


/**
 * 注销登录
 * @Author   suqinhai
 * @DateTime 2017-07-16
 * @QQ       467456744
 * @return   {[type]}
 */

exports.logout =  function(req, res, next) {
    req.session.userId = null;
    if (!req.session.userId) {
        res.status(200).json({
            'code':'1',
            'msg': '注销成功！'
        });
    }
}
