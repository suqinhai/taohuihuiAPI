'use strict';

var advertiseModel = require('../models/advertise.model.js');

var advertise = {

    findAll: (req, res, next) => {
        var param = req.query || req.params;
        var data     = {};
        
        advertiseModel.find({},function(err,results){
            res.send(results);
        });
    },
    
    // 添加
    add:(req, res, next) => {
        var param = req.query || req.params;
        var data  = {
            title:param.title,
            content:param.content,
            link:param.link,
            time:param.time,
            pic:param.pic
        };

        advertiseModel.create(data,function(err,results){
            res.send(results);
        });
    },

    // 删除
    del:(req, res, next) => {
        var param = req.query || req.params;
        var data  = {
            _id:param._id
        };
        advertiseModel.remove( data ,function(err,results){
            res.send(results);
        });
    },

    // 修改
    modify:(req, res, next) => {
        var param = req.query || req.params;
        var _id   = param._id
        var data  = {
            title:param.title,
            content:param.content,
            link:param.link,
            time:param.time,
            pic:param.pic
        };
        advertiseModel.update(_id,data,function(err,results){
            res.send(results);
        });
    },
}

module.exports = advertise;