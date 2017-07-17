'use strict';
var express = require('express');
var router = express.Router();
var co = require('co');
var fs = require('fs');
var path = require('path')
var util = require('../util/util.js');
var upload = require('../../lib/fileuploads.lib.js');
var oss = require('../../config/oss.config.js');

router.post('/public/upload',upload.single('file'), function(req, res, next) {
    var file = req.file;
    var fileType = path.basename(file.mimetype);
    var filePath = file.destination;
    var fileName = file.filename;
    var md5FileName;
    var stream = fs.createReadStream( file.destination + '/' + file.filename );

	util.md5File(stream).then(function(md5File){
	 	md5FileName = md5File  // 获取文件加密md5
	 	co(function* () {
	 	  var stream = fs.createReadStream( file.destination + '/' + file.filename );  // 读取文件	 
		  var result = yield oss.putStream( md5FileName + '.' + fileType, stream);  // 上次OSS

		  fs.unlinkSync(file.destination + '/' + file.filename); // 删除文件 

		  res.status(200).json({
                'code': '1',
                'data':{
                	url:result.url
                }
          });
		  
		}).catch(function (err) {
		   res.status(200).json({
                'code': '0',
                'data':[]
           })
		});
	})
});

module.exports = router;
