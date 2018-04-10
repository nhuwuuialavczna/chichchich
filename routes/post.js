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
    var queries = req.query;
    var user = req.session.acc;
    var mabaiviet = Date.now();
    var tenbaiviet = user.name;
    var thoigian = new Date().getDate();
    var danhgia = 0;
    var hinhanh = queries.duongdan; // là hình ảnh
    var dinhkem = queries.dinhkem; // tệp đính kèm
    var email = user.email;
    var noidung = queries.noidung;

    var sql = "insert into baiviet values('" + mabaiviet + "','" + tenbaiviet + "','" + thoigian + "','" + danhgia + "','" + hinhanh + "','" + email + "','" + noidung + "','" + dinhkem + "')";

    pool.query(sql, (err, data) => {
        if(err) {
            res.json({data: 'fail'});
            return;
        }
    });

    res.json({data: 'ok'});
});

router.get('/', function (req, res, next) {
    console.dir(getAllPost());
    res.send('respond with a resource');
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
    pool.query('SELECT * from account', (err, data) => {
        if (err) return undefined;
        return data.rows;
    });
}


module.exports = router;
