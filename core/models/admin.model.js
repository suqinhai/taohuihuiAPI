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
	auth:{
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'Activites',
	    required: true
	}
}, {
    collection: 'tb_admin',
    id: false
});

module.exports = mongoose.model('Admin', userSchema);