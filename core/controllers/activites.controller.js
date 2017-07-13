'use strict';

var activitesModel = require('../models/activites.model.js');
var adminModel = require('../models/admin.model.js');

var activites = {
    findAll: (req, res, next) => {
        var param = req.body || req.params;
        var data = {};
        activitesModel.find(data)
            .exec(function(err, results) {
                res.send(results);
            })
    },

    // 添加
    add: (req, res, next) => {
        var param = req.body || req.params;
        var data = {
            title: param.title,
            content: param.content,
            author: param.author,
            time: param.time,
            pic: param.pic,
            pwd: param.pwd,
            name: param.name
        };
        activitesModel.create(data, function(err, results) {
            data.auth = results._id;
            adminModel.create(data, function() {
                res.send(results);
            })
        });
    },

    // 删除
    del: (req, res, next) => {
        var param = req.body || req.params;
        var data = {
            _id: param._id
        };
        activitesModel.remove(data, function(err, results) {
            res.send(results);
        });
    },

    // 修改
    modify: (req, res, next) => {
        var param = req.body || req.params;
        var _id = param._id
        var data = {
            title: param.title,
            content: param.content,
            author: param.author,
            time: param.time,
            pic: param.pic,
        };
        activitesModel.update(_id, data, function(err, results) {
            res.send(results);
        });
    },
}

module.exports = activites;
