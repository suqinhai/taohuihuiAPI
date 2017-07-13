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
	}
}, {
    collection: 'tb_info',
    id: false
});

module.exports = mongoose.model('Info', userSchema);