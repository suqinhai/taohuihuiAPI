'use strict';
var mongoose = require('mongoose');

var posterSchema = new mongoose.Schema({
	'url':{
		type: String,
		required: true
	},
	'sort':{
		type: Number,
		required: true
	},
	'title':{
		type: String,
		required: false
	},
	'alt':{
		type: String,
		required: false
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
    collection: 'tb_poster',
    id: false
});

module.exports = mongoose.model('poster', navSchema);