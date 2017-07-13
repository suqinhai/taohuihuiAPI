'use strict';

var guestbookModel = require('../models/guestbook.model.js');

var guestbook = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		guestbookModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			title:param.title,
			content:param.content,
			name:param.name,
			time:param.time,
			type:param.type
		};

		guestbookModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		guestbookModel.remove( data ,function(err,results){
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
			name:param.name,
			time:param.time,
			type:param.type
		};
		guestbookModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = guestbook;