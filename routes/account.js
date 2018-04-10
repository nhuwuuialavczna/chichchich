var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.dir(getAllPost());
    res.send('respond with a resource');
});


module.exports = router;
