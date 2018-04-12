var express = require('express');
var router = express.Router();
const {Pool, Client} = require('pg');
var nodemailer = require('nodemailer');


const pool = new Pool({
    user: 'jenhnltobjifnz',
    host: 'ec2-54-204-21-226.compute-1.amazonaws.com',
    database: 'df07n687imb2qc',
    password: '9b0b4ec6667eaa650169c1b1ee6510a0b81bfaca52643c853d93b3ce609a512a',
    port: 5432, ssl: true

});
router.get('/logout', function (req, res, next) {
    req.session.acc  = undefined;
    res.json({data:'ok',
        TrangThai: req.session.trangthai});
});


router.get('/profile', function (req, res, next) {
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {

        var email = req.query.email;
        pool.query("SELECT * from account where email='" + email + "'", (err, account) => {
            pool.query("SELECT * from baiviet where email='" + email + "'", (err, baiviet) => {
                res.render('profile', {
                    title: email,
                    User: req.session.acc,
                    UserProfile: account.rows[0],
                    DsBaiVietCuaUS: baiviet.rows,
                    TrangThai: req.session.trangthai
                });
            });
        });
    }
});

module.exports = router;
