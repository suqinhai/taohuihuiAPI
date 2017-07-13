'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}
}, {
    collection: 'tb_product_type',
    id: false
});

module.exports = mongoose.model('ProductType', userSchema);