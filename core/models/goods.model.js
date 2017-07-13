'use strict';


// 商品表
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    picUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    coupon: {
        type: String,
        required: true
    },
    commissionPercent: {
        type: String,
        required: true
    },
    commission: {
        type: String,
        required: true
    },
    shopTitle: {
        type: String,
        required: true
    },
    sales: {
        type: String,
        required: true
    },
    remainDays: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    couponUrl: {
        type: String,
        required: true
    },
    couponCode: {
        type: String,
        required: true
    },
    goodsCode: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    collection: 'tb_goods',
    id: false
});

module.exports = mongoose.model('Goods', userSchema);
