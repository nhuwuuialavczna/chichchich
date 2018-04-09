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
/* GET users listing. */
router.get('/add', function (req, res, next) {
    console.dir(req.query);
    pool.query('SELECT * from account', (err, data) => {
        if (!req.session.acc) {
            res.render('index', {title: 'Trang chủ', listUser: data.rows, User: undefined});
        } else
            res.render('post', {title: 'Post', listUser: data.rows, User: req.session.acc});
    });

    res.send('respond with a resource');
});

router.get('/', function (req, res, next) {
    pool.query('SELECT * from account', (err, data) => {
        if (!req.session.acc) {
            res.render('index', {title: 'Trang chủ', listUser: data.rows, User: undefined});
        } else
            res.render('post', {title: 'Post', listUser: data.rows, User: req.session.acc});
    });
});

function Post(mabaiviet, tenbaiviet, thoigian, danhgia, hinhanh, email, noidung, dinhkem) {
    this.mabaiviet = mabaiviet;
    this.tenbaiviet = tenbaiviet;
    this.thoigian = thoigian;
    this.danhgia = danhgia;
    this.hinhanh = hinhanh;
    this.email = email;
    this.noidung = noidung;
    this.dinhkem = dinhkem;
}

module.exports = router;
