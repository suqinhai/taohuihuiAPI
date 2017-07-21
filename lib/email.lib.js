/**
 *
 * @Description 邮件发送 
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor
 * @Created 2016/04/26 15:10
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config/email.config.js');

var transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});
var mailOptions = {
    from: config.email.user, // 发送者  
    to: '467456744@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
    subject: 'nodemailer2.5.0邮件发送', // 标题  
    //text: 'Hello world', // 文本  
    html: `<h2>nodemailer基本使用:</h2><h3>  
    <a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">  
    http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a></h3>`,
    // attachments: [{
    //         filename: 'package.json',
    //         path: './package.json'
    //     },
    //     {
    //         filename: 'content',
    //         content: '发送内容'
    //     }
    // ]
};

transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err);
        return;
    }else{
        console.log('邮件发送成功');
    }

      smtpTransport.close(); // 如果没用，关闭连接池
    
});

// module.exports = sendMail;