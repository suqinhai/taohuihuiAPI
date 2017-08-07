'use strict';
const mongoose = require('mongoose');

const navSchema = new mongoose.Schema({
	'name':{
		type: String,
		required: true
	},
	'url':{
		type: String,
		required: true
	},
	'sort':{
		type: Number,
		required: true
	},
	'actionType':{
		type: String,
		required: true,
		enum:['popular','taoSnap','tmall','special','brand','goldSellers','overseas','cheap'] //超级人气榜 淘抢购 天猫商品 天天特价  品牌直购  金牌卖家 海淘  聚划算  
	},
	'publish':{
		type: Number,
		required: true,
		default:0,
	},
	'thirdPropertyIds':{
		type: Array,
		required: true
	},
	'thirdPropertyNames':{
		type: Array,
		required: true
	},
	'createTime':{
		type: String,
		required: false,
	},
	'updateTime':{
		type: String,
		required: false,
	},
}, {
    collection: 'tb_nav',
    id: false
});

module.exports = mongoose.model('Nav', navSchema);