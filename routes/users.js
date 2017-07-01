var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* authenticate. */
router.post('/authenticate', function (req, res, next) {
    var user = {
        username: (req.body.username || req.query.username),
        password: (req.body.password || req.query.password)
    };

    // create a token
    var token = jwt.sign(user, req.app.get('superSecret'), {
        expiresIn: '24h' // expires in 24 hours
    });

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
