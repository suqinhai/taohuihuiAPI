'use strict';


var view = {

	// 初始化视图

	index: (req, res, next) => {
		var param = req.query || req.params;
		var user     = param.user;
		var password = param.password;
		var data     = {};
		res.render('admin/admin');
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


module.exports = view;

