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
router.get('/', function (req, res, next) {
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        pool.query("SELECT * from account ORDER BY diem DESC", (err, bangxephang) => {
            res.render('training', {
                User: req.session.acc,
                title: 'Luyen tap',
                BangXepHang: bangxephang.rows,
                getHangOfUser: getHangOfUser
            });
        });
    }
});

router.get('/batdau', function (req, res, next) {
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        var loai = req.query.loai;
        var trungLap = req.query.trungLap;
        var us = req.session.acc;
        req.session.trungLap = trungLap;
        req.session.caudalam = [];
        pool.query("SELECT * from cauhoi where loaicauhoi='" + loai + "'", (err, cauhoi) => {
            if (err) return res.send({data: 'fail'});
            req.session.listCauHoi = getListCauHoi(cauhoi.rows, us.caudalam, trungLap);
            console.log(req.session.listCauHoi);
            res.send({data: 'ok'});
        });
    }
});

router.get('/trainingpage', function (req, res, next) {
    let listCauHoi = req.session.listCauHoi;
    let us = req.session.acc;
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        let cauHoi = getCauHoiNganNhien(listCauHoi, req.session.caudalam, req.session.trungLap);

        res.render('trainingpage', {
            title: 'Training',
            User: req.session.acc,
            cauhoi: cauHoi
        });
    }
});

router.get('/thongbao', function (req, res, next) {
    let id = req.query.id;
    res.render('thongbao', {
        User: req.session.acc,
        title: 'Thông báo',
        id: id
    });
});

router.get('/next', function (req, res, next) {
    let macauhoi = req.query.macauhoi;
    let listCauHoi = req.session.listCauHoi;
    let liest = req.session.caudalam;
    liest.push(macauhoi);
    let us = req.session.acc;
    if (req.session.acc === undefined) {
        res.redirect('/');
    } else {
        req.session.caudalam = liest;
        let cauHoi = getCauHoiNganNhien(listCauHoi, liest, req.session.trungLap);
        res.send({cauhoi: cauHoi});
    }
});

function getCauHoiNganNhien(listCauHoi, danhsachdalam, trunglap) {
    if (danhsachdalam === undefined || danhsachdalam === null || danhsachdalam === '') {
        let index = Math.floor(Math.random() * listCauHoi.length);
        return listCauHoi[index];
    }
    var danhSachDaLam = danhsachdalam;
    if (danhSachDaLam !== undefined && danhSachDaLam.length === 0) {
        let index = Math.floor(Math.random() * listCauHoi.length);
        return listCauHoi[index];
    }

    if (trunglap === 'yes') {
        console.log('trùng lập là yes');
        let index = Math.floor(Math.random() * listCauHoi.length);
        return listCauHoi[index];
    }
    if (trunglap === 'no') {
        var listCauHoiCanLam = [];
        for (let ch of listCauHoi) {
            if (danhSachDaLam.indexOf(ch.macauhoi.trim()) === -1) {
                listCauHoiCanLam.push(ch);
            }
        }
        if (listCauHoiCanLam.length === 0) {
            return undefined;
        }
        let index = Math.floor(Math.random() * listCauHoiCanLam.length);
        return listCauHoiCanLam[index];
    }
}


function getListCauHoi(cauhoi, danhsachdalam, trunglap) {
    if (danhsachdalam === undefined || danhsachdalam === null || danhsachdalam === '') {
        return cauhoi;
    }
    var danhSachDaLam = danhsachdalam.split(',');
    if (danhSachDaLam !== undefined && danhSachDaLam.length === 0) {
        return cauhoi;
    }

    if (trunglap === 'yes') {
        return cauhoi;
    }
    if (trunglap === 'no') {
        var listCauHoiCanLam = [];
        for (let ch of cauhoi) {
            if (danhSachDaLam.indexOf(ch.macauhoi.trim()) === -1) {
                listCauHoiCanLam.push(ch);
            }
        }
        return listCauHoiCanLam;
    }
}


function getHangOfUser(bangxephang, email) {
    for (let i = 0; i < bangxephang.length; i++) {
        if (bangxephang[i].email === email) {
            return i;
        }
    }
    return -1;
}

module.exports = router;
