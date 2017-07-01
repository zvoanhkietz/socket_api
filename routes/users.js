var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var uuid = require('uuid');

/* authenticate. */
router.post('/authenticate', function (req, res, next) {
    var user = {
        username: (req.body.username || req.query.username),
        password: (req.body.password || req.query.password),
        appid: uuid.v4()
    };
    
    // TODO: using DB or API to check login

    // create a token
    var token = jwt.sign(user, req.app.get('superSecret'), {
        expiresIn: '24h' // expires in 24 hours
    });

    res.json({
        success: true,
        message: 'Enjoy your token!',
        appid: user.appid,
        token: token
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
