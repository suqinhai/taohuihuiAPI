'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_guestbook',
    id: false
});

module.exports = mongoose.model('Guestbook', userSchema);