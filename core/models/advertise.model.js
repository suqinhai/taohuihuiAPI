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
	link:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	pic:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_advertise',
    id: false
});

module.exports = mongoose.model('Advertise', userSchema);