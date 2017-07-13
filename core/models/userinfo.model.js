'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	pwd:{
		type: String,
		required: true
	},
	addr:{
		type: String,
		required: true
	},
	zip:{
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true
	},
	mobile:{
		type: String,
		required: true
	},
	truename:{
		type: String,
		required: true
	},
	sex:{
		type: String,
		required: true
	},
	birthday:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	regtime:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_userinfo',
    id: false
});

module.exports = mongoose.model('Userinfo', userSchema);