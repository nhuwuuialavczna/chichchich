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


router.get('/registerpage', function (req, res, next) {
    pool.query("select * from livecode", (err, data) => {
        if(err) {
            res.json({data: 'fail'});
            return;
        }
        var ds = data.rows;
        var us = req.session.acc;
        for(var i=0;i<ds.length;i++){
            var livecode = ds[i];
            if(livecode.email === us.email){
                res.render('registerlivecode',{liveCodeList:data.rows,User:req.session.acc,DaDK:'ok'});
                return;
            }
        }
        res.render('registerlivecode',{liveCodeList:data.rows,User:req.session.acc,DaDK:'chua'});
    });
});


router.get('/register', function (req, res, next) {
    var malive = req.query.malivecode;
    var ten = req.query.tenlivecode;
    var mota = req.query.mota;
    var a =  req.session.acc;
    var sql = "update livecode set tenlivecode='"+ten+"',email='"+a.email+"',mota='"+mota+"' where malivecode='"+malive+"'";
    pool.query(sql, (err, data) => {
        if(err) {
            res.json({data: 'fail'});
            return;
        }
        res.json({data: 'ok'});
    });
});

module.exports = router;