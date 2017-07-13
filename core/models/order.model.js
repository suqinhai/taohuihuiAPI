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
	phone:{
		type: String,
		required: true
	},
	mobile:{
		type: String,
		required: true
	},
	addr:{
		type: String,
		required: true
	},
	time:{
		type: String,
		required: true
	},
	bz:{
		type: String,
		required: true
	},
	state:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_order',
    id: false
});

module.exports = mongoose.model('Order', userSchema);