'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user:{
		type: String,
		required: false
	},
	password:{
		type: String,
		required: false
	},
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	createTime:{
		type: String,
		required: false
	},
	updateTime:{
		type: String,
		required: false
	}
}, {
    collection: 'tb_user',
    id: false
});

module.exports = mongoose.model('User', userSchema);