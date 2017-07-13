'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	pro:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	score:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_comment',
    id: false
});

module.exports = mongoose.model('Comment', userSchema);