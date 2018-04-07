var express = require('express');
var router = express.Router();
const {Pool, Client} = require('pg');


const pool = new Pool({
    user: 'jenhnltobjifnz',
    host: 'ec2-54-204-21-226.compute-1.amazonaws.com',
    database: 'df07n687imb2qc',
    password: '9b0b4ec6667eaa650169c1b1ee6510a0b81bfaca52643c853d93b3ce609a512a',
    port: 5432, ssl: true

});
/* GET home page. */
router.get('/', function (req, res, next) {
    if(!req.session.acc){
        res.render('index', {title: 'Trang chủ'});
    }else
    res.render('post', {title: 'Post'});
});

router.get('/login', function (req, res, next) {
    var email = req.query.email;
    var ps = req.query.pass;
    console.log(email);
    console.log(ps);
    var isLogin = false;
    // tại đây kiểm tra trong database rồi trả về kết quả
    pool.query('SELECT * from account', (err, data) => {
        var rows = data.rows;
        for (var i = 0; i < rows.length; i++) {
            var vale = rows[i];
            if (vale.email == email && vale.password == ps) {
                isLogin = true;
                var acc = {
                    email: vale.email,
                    password: vale.password,
                    name: vale.name,
                    ip: vale.ip,
                    hinhanh: vale.hinhanh
                };
                req.session.acc = acc;
                res.json({data: 'ok'});
                return;
            }
        }
        pool.end();
    });
    if (isLogin) {
        res.json({data: 'fail'});
    }
});

router.get('/register', function (req, res, next) {
    var email = req.query.email;
    var name = req.query.name;
    // tại đây thêm vào database và gửi mail về thông báo
    var sql = "insert into account values('" + email + "','nopass','" + name + "','127.0.0.1')";
    pool.query(sql, (err, res) => {
        pool.end();
    });
    res.json({data: 'ok'});
});


router.get('/forget', function (req, res, next) {
    var us = req.query.email;
    // tại đây gửi mail về bên kia cho người ta nhập pass

    res.json({data: 'ok'});
});

module.exports = router;
