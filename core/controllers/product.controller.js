'use strict';

var productModel = require('../models/product.model.js');

var product = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		productModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			name:param.name,
			type:param.type,
			description:param.description,
			simg:param.simg,
			bimg:param.bimg,
			price:param.price,
			param1:param.param1,
			param2:param.param2,
			param3:param.param3,
		};

		productModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		productModel.remove( data ,function(err,results){
			res.send(results);
		});
	},

	// 修改
	modify:(req, res, next) => {
		var param = req.query || req.params;
		var _id   = param._id
		var data  = {
			name:param.name,
			type:param.type,
			description:param.description,
			simg:param.simg,
			bimg:param.bimg,
			price:param.price,
			param1:param.param1,
			param2:param.param2,
			param3:param.param3,
		};
		productModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = product;