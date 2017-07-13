phantom.outputEncoding = "UTF-8";
// 页面抓取数据

// var data = {
//   'goodsPics':'', //商品图片
//   'goodsDetailsPics': '', // 商品详情
//}

// var async = require('./includes/async.js');
var casper = require('casper').create({
  clientScripts: [
    // './includes/jquery-2.2.4.js' // These two scripts will be injected in remote
  ],
  pageSettings: {
    loadImages: true, // The WebPage instance used by Casper will
    loadPlugins: false, // use these settings
  },
  logLevel: "info", // Only "info" level messages will be logged
  verbose: true // log messages will be printed out to the console
});

casper.options.waitTimeout = 1000000;
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36')


var params = {
  url: 'https://s.click.taobao.com/3EFx2gw',
}

casper.start();

casper.open(params.url);

casper.then(function() {
  //获取浏览器当前url
  var url = this.evaluate(function() {
    return window.location.href
  })
  
  this.scrollToBottom(2000);

  var _this = this;
  this.waitForSelector('.ke-post', function() {
    var size = this.evaluate(function() {
        var img = document.getElementsByClassName('ke-post')[0].getElementsByTagName('p')[0].getElementsByTagName('img');
        return img
    });
    console.log(size)
    this.capture('google.png')
  })

});

casper.run()
