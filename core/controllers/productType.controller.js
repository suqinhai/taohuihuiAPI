'use strict';

var productTypeModel = require('../models/productType.model.js');

var productType = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		productTypeModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			name:param.name,
		};

		productTypeModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		productTypeModel.remove( data ,function(err,results){
			res.send(results);
		});
	},

	// 修改
	modify:(req, res, next) => {
		var param = req.query || req.params;
		var _id   = param._id
		var data  = {
			name:param.name,
		};
		productTypeModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = productType;