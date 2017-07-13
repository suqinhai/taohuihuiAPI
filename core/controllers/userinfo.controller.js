'use strict';

var userinfoModel = require('../models/userinfo.model.js');

var userinfo = {

	findAll: (req, res, next) => {
		var param = req.query || req.params;
		var data     = {};
		
		userinfoModel.find(data,function(err,results){
			res.send(results);
		});
	},

	// 添加
	add:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			name:param.name,
			pwd:param.pwd,
			addr:param.addr,
			zip:param.zip,
			phone:param.phone,
			mobile:param.mobile,
			truename:param.truename,
			sex:param.sex,
			birthday:param.birthday,
			email:param.email,
			regtime:param.regtime,
		};

		userinfoModel.create(data,function(err,results){
			res.send(results);
		});
	},

	// 删除
	del:(req, res, next) => {
		var param = req.query || req.params;
		var data  = {
			_id:param._id
		};
		userinfoModel.remove( data ,function(err,results){
			res.send(results);
		});
	},

	// 修改
	modify:(req, res, next) => {
		var param = req.query || req.params;
		var _id   = param._id
		var data  = {
			name:param.name,
			pwd:param.pwd,
			addr:param.addr,
			zip:param.zip,
			phone:param.phone,
			mobile:param.mobile,
			truename:param.truename,
			sex:param.sex,
			birthday:param.birthday,
			email:param.email,
			regtime:param.regtime,
		};
		userinfoModel.update(_id,data,function(err,results){
			res.send(results);
		});
	},
}

module.exports = userinfo;