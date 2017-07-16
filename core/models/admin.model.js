'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	user:{
		type: String,
		required: true
	},
	passwd:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_user',
    id: false
});

module.exports = mongoose.model('User', userSchema);