'use strict';
var mongoose = require('mongoose');

var navSchema = new mongoose.Schema({
	'name':{
		type: String,
		required: true
	},
	'sort':{
		type: Number,
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

module.exports = mongoose.model('nav', navSchema);