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
	time:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_favorite',
    id: false
});

module.exports = mongoose.model('Favorite', userSchema);