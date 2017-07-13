'use strict';

var infoModel = require('../models/info.model.js');

var info = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		infoModel.find({},function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			title:param.title,
			content:param.content,
		};

		infoModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		infoModel.remove( data ,function(err,results){
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
		};
		infoModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = info;