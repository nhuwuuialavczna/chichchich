var express = require('express');
var router = express.Router();
var moment = require('moment');
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
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        var queries = req.query;
        var user = req.session.acc;
        var mabaiviet = Date.now();
        var tenbaiviet = user.name;
        var thoigian = moment().format('L') + "  " + moment().format('LTS');
        var danhgia = 0;
        var hinhanh = queries.duongdan; // là hình ảnh
        var dinhkem = queries.dinhkem; // tệp đính kèm
        var email = user.email;
        var noidung = queries.noidung;
        var sql = "insert into baiviet values('" + mabaiviet + "','" + tenbaiviet + "','" + thoigian + "','" + danhgia + "','" + hinhanh + "','" + email + "','" + noidung + "','" + dinhkem + "')";
        pool.query(sql, (err, data) => {
            if (err) {
                res.json({data: 'fail'});
                return;
            }
            res.json({data: 'ok'});
        });
    }
});

router.get('/addbinhluan', function (req, res, next) {
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        var maBinhLuan = Date.now();
        var noidung = req.query.noidung;
        var mabaiviet = req.query.mabaiviet;
        var date = new Date();
        var email = req.session.acc.email;
        var thoiGian = date.getHours() + ":" + date.getMinutes() + " - " + date.getDay() + ":" + date.getMonth() + ":" + date.getYear();
        var sql = "insert into binhluanbaiviet values('" + maBinhLuan + "','" + noidung + "','" + mabaiviet + "','" + email + "','" + thoiGian + "')";

        pool.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.json({data: 'fail'});
                return;
            }
            res.json({data: 'ok'});
        });
    }

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

function getAllPost() {
    pool.query('SELECT * from baiviet', (err, data) => {
        if (err) return undefined;
        return data.rows;
    });
}

function getAllAccount() {
    pool.query('SELECT * from account', (err, data) => {
        if (err) return undefined;
        return data.rows;
    });
}

module.exports = router;
