var express = require('express');
var router = express.Router();
const {Pool, Client} = require('pg');
// var nodemailer = require('nodemailer');
// var tools = require('./account');


const pool = new Pool({
    user: 'jenhnltobjifnz',
    host: 'ec2-54-204-21-226.compute-1.amazonaws.com',
    database: 'df07n687imb2qc',
    password: '9b0b4ec6667eaa650169c1b1ee6510a0b81bfaca52643c853d93b3ce609a512a',
    port: 5432, ssl: true

});
/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.acc) {
        res.render('index', {title: 'Trang chủ'});
    } else
        res.render('post', {title: 'Post'});
});


router.get('/login', function (req, res, next) {
    var email = req.query.email;
    var ps = req.query.pass;

    var acc = tools.account(email, ps, '', '', '', '', '', '',);

    console.log(email);
    console.log(ps);
    var isLogin = false;
    // tại đây kiểm tra trong database rồi trả về kết quả
    pool.query('SELECT * from account', (err, data) => {
        if (data === undefined) {
            res.json({data: 'fail'});
            return;
        } else {
            var rows = data.rows;
            var checkaccout = tools.checkaccout(rows, acc);
            if (checkaccout !== -1) {
                req.session.acc = rows[checkaccout];
                res.json({data: 'ok'});
            } else {
                res.json({data: 'fail'});
            }
        }
        // pool.end();
    });
    // console.log('o ngoai'+isLogin);

});

router.get('/register', function (req, res, next) {
    var email = req.query.email;
    var name = req.query.name;
    var duongDan = req.query.duongdan;
    // tại đây thêm vào database và gửi mail về thông báo
    var sql = "insert into account values('" + email + "','nopass','" + name + "','127.0.0.1','" + duongDan + "','','','',0)";
    pool.query(sql, (err, resxx) => {
        if (err) {
            res.json({data: 'fail'});
            return;
        }
        pool.end();
    });
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'nguyentanhau165997@gmail.com',
    //         pass: 'SpringMVC5'
    //     }
    // });
    //
    // var mailOptions = {
    //     from: 'nguyentanhau165997@gmail.com',
    //     to: email,
    //     subject: 'Hình như mày mới đăng kí tài khoản ở web của tao',
    //     html: '<script>window.onload = function() {' +
    //     'var form = document.getElementsByName("form");' +
    //     'form.onsubmit = function(){' +
    //     'var pass = document.getElementsByName("p");  ' +
    //     'var re_pass = document.getElementById("rep");' +
    //     'if(pass!==re_pass){' +
    //     'document.getElementsByName("err").html("Nhập lại mật khẩu không đúng");' +
    //     'return false;' +
    //     '}' +
    //     'return true;' +
    //     '}' +
    //     '}</script>' +
    //     '<b>Nhập mật khẩu của mày ở đây nha</b><br>' +
    //     '<form id="form" action="https://quaytay.herokuapp.com/xacnhan" method="get">' +
    //     '<input type="password" name="p" placeholder="Mật khẩu" required id="p">' +
    //     '<input type="text" name="email" value="'+email+'">' +
    //     '<input type="password" name="rep" placeholder="Nhập lại mật khẩu" required id="rep">' +
    //     '<p id="err"></p>' +
    //     '<input type="submit" value="Xác nhận">' +
    //     '</form>'
    // };
    //
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
    res.json({data: 'ok'});
});

router.get('/xacnhan', function (req, res, next) {
    var us = req.query.email;
    var p = req.query.p;
    // tại đây gửi mail về bên kia cho người ta nhập pass

    var sql = "update account set p='"+p+"' where email='"+us+"'";
    pool.query(sql, (err, resxx) => {
        if (err) {
            res.render('index', {title: 'Xác nhận đã xảy ra lỗi gì đó !'});
            return;
        }
        pool.end();
    });
    res.render('index', {title: 'Trang chủ'});
});

router.get('/forget', function (req, res, next) {
    var us = req.query.email;
    // tại đây gửi mail về bên kia cho người ta nhập pass

    res.json({data: 'ok'});
});

module.exports = router;
