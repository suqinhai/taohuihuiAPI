'use strict';

var spawn = require("child_process").spawn;
// var goodsModel = require('../models/goods.model.js');

var goods = {
  start: function() {
    goods.starCasper()
  },
  get: function(req, res, next) {
    var param = req.body || req.params;
    var data = {};
    
    // goods.starCasper();
    res.send('111')
    // goodsModel.find(data)
    //   .exec(function(err, results) {

    //     //res.render('index',{'title':results });
    //       res.send(results)
         
    //   })

  },

  // 添加
  add: function(req, res, next) {
    var param = req.body || req.params;

    var data = JSON.parse(param.data)[0]
   
    goodsModel.create(data, function(err, results) {
    });

  },

  // 启动casperjs线程
  starCasper: function(fn) {
    var _this = this;
    var child = spawn('casperjs', ['./core/casper/taoBaoGoods.js','--web-security=no']);

    child.stdout.on('data', function(results) {
      console.log('标准输出: ' + results.toString());
    });

    child.stderr.on('data', function(data) {
      console.log('标准错误: ' + data);
    });

    child.on('close', function(code) {
      switch (code) {
        case 0:
          console.log("casperjs.js正常退出");
          break;
        case 1:
          console.log("casperjs.js访问失败");
          break;
        case 2:
          console.log("casperjs.js超时退出");
          break;
        default:
          console.log("casperjs.js异常退出");
          break;
      };
    });
  },
}

module.exports = goods;
