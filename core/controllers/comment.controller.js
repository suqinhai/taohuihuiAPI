'use strict';

var commentModel = require('../models/comment.model.js');

var comment = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var user     = param.user;
		var password = param.password;
		var data     = {};
		
		commentModel.find({},function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			pro:param.pro,
			name:param.name,
			title:param.title,
			content:param.content,
			time:param.time,
			score:param.score
		};

		commentModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		commentModel.remove( data ,function(err,results){
			res.send(results);
		});
	},

	// 修改
	modify:(req, res, next) => {
		var param = req.query || req.params;
		var _id   = param._id
		var data  = {
			pro:param.pro,
			name:param.name,
			title:param.title,
			content:param.content,
			time:param.time,
			score:param.score
		};
		commentModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = comment;