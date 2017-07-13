'use strict';

var indexModel = require('../models/index.model.js');

var index = {

	test: (req, res, next) => {
		var param = req.query || req.params;
		var user     = param.user;
		var password = param.password;
		var data     = {};
		
		indexModel.find({},function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {

		var param = req.query || req.params;
		var user     = param.user;
		var password = param.password;
		var data     = {};

		
		userModel.find({},function(err,results){
			res.send(results);
		});

	},

	// 删除
	del:(req, res, next) => {

	},

	// 修改
	modify:(req, res, next) => {

	},
}

module.exports = index;





