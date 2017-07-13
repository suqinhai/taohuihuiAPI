'use strict';

var userModel = require('../models/user.model.js');
var userServers = require('../servers/user.servers.js');



var user = {
  
  /*
    注册账号*/
  register:function(req, res, next){

    var param = req.query || req.params;
    var user  = param.user;
    var passwd=param.passwd;


    /*判断有没有这个用户*/
    userModel.find({user:user})
      .then(function(result){
          if(result){
            res.status(200).json({
              'msg':'已存在该用户！'
            });
          }else{
             /*新增用户*/
            userModel.create({user:user,passwd:passwd});
            res.status(200).json({
              'msg':'新增用户成功！'
            });
          }
     });
  },

   /*
     用户登录*/
  login:function(req, res, next){
  	
  	var param = req.query || req.params;
    var user  = param.user;
    var passwd=param.passwd;

    /*已登陆判断*/

    if(req.session.id && req.session.user) {
      res.status(200).send('用户已登陆！');
      return false;
    }

    /*登陆判断*/
    userModel.findOne({user:user,passwd:passwd})
      .then(function(result){
         
          req.session.userId = result.id;
          req.session.user = result.user;

          if(result){
            res.status(200).json({
              'msg':'登陆成功！'
            });
          }else{
            res.status(200).json({
              'msg':'登陆失败！'
            });
          }
      });
  },
  /*修改密码 */
  modifyPassWord:function(req, res, next){
    var param = req.query || req.params;
    var user  = param.user;
    var passwd=param.passwd;

    /*判断有没有这个用户*/
    userModel.findOne({user:user})
      .then(function(result){
          console.log(result)
          if(!result){
            res.status(200).json({
              'msg':'不存在该用户！'
            });
          }else{

           /* 更新密码*/
            userModel.update({passwd:passwd},{where:{user:user}})
            .then(function(result){
              if(result){
                  res.status(200).json({
                    'msg':'修改密码成功！'
                  });
                }else{
                  res.status(200).json({
                    'msg':'修改密码失败！'
                  });
                }
            });
          }
          
      });
  },
  /*注销登陆*/
  logout:function(req, res, next){
    req.session.userId = null;
    req.session.user = null;
    if(!req.session.userId && !req.session.user){
      res.status(200).json({
              'msg':'注销成功！'
      });
    }
  },
};

module.exports = user;