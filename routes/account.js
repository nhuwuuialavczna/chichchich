var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res, next) {
    req.session.acc  = undefined;
    res.json({data:'ok'});
});


module.exports = router;
