'use strict';

var orderModel = require('../models/order.model.js');

var order = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		orderModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			pro:param.pro,
			name:param.name,
			phone:param.phone,
			mobile:param.mobile,
			addr:param.addr,
			time:param.time,
			bz:param.bz,
			state:param.state,
		};

		orderModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		orderModel.remove( data ,function(err,results){
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
			phone:param.phone,
			mobile:param.mobile,
			addr:param.addr,
			time:param.time,
			bz:param.bz,
			state:param.state,
		};
		orderModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = order;