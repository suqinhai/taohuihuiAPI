'use strict';
const mongoose = require('mongoose');

const classifySchema = new mongoose.Schema({
	'name':{
		type: String,
		required: true
	},
	'url':{
		type: String,
		required: true
	},
	'sort':{
		type: Number,
		required: true
	},
	'publish':{
		type: Number,
		required: true,
		default:0,
	},
	'thirdPropertyIds':{
		type: Array,
		required: true
	},
	'thirdPropertyNames':{
		type: Array,
		required: true
	},
	'propertyId':[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true
	}],
	'createTime':{
		type: String,
		required: false,
	},
	'updateTime':{
		type: String,
		required: false,
	},
}, {
    collection: 'tb_classify',
    id: false
});

module.exports = mongoose.model('Classify', classifySchema);