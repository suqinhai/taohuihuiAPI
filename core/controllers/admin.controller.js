'use strict';
var adminModel = require('../models/admin.model.js');

var admin = {

    findAll: (req, res, next) => {
        var param = req.query || req.params;
        var data = {};
        adminModel.find(data)
            .select('name pwd auth')
            .populate('auth', 'title content author time pic')
            .lean()
            .exec(function(err, results) {
                res.send(results);
            })
    },

    // 添加
    add: (req, res, next) => {
        var param = req.query || req.params;
        var data = {
            name: param.name,
            pwd: param.pwd,
            auth: param.auth
        };

        adminModel.create(data, function(err, results) {
            res.send(results);
        });
    },

    // 删除
    del: (req, res, next) => {
        var param = req.query || req.params;
        var data = {
            _id: param._id
        };
        adminModel.remove(data, function(err, results) {
            res.send(results);
        });
    },

    // 修改
    modify: (req, res, next) => {
        var param = req.query || req.params;
        var _id = param._id
        var data = {
            name: param.name,
            pwd: param.pwd,
            auth: param.auth
        };
        adminModel.update(_id, data, function(err, results) {
            res.send(results);
        });
    },
}

module.exports = admin;
