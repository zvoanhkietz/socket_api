var emitter = require('../libs/event_emitter');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// route middleware to verify a token
router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, res.app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

/* api notification */
router.post('/v1/notification/emit', function (req, res, next) {
    var appId = req.body.appId || req.query.appId;
    var users = req.body.users || req.query.users;
    emitter.get('emit.notification').emit(appId, users, req.body);
    res.json({status: "OK"});
});

module.exports = router;
