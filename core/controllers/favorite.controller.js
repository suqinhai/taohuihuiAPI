'use strict';

var favoriteModel = require('../models/favorite.model.js');

var favorite = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};

		favoriteModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			pro:param.pro,
			name:param.name,
			time:param.time
		};

		favoriteModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		favoriteModel.remove( data ,function(err,results){
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
			time:param.time
		};
		favoriteModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}


module.exports = favorite;