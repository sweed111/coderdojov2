var dry_layers = require('dry-layers');
var express = require('express');

var router = express.Router();

router.all('*', dry_layers.SecurityService.authorize(null, function (req) {
    return -1 != req.user.roles.indexOf('Administrator');
}));

router.get('/', function (req, res) {
    res.render('administrator', {
        title: "Administrator",
        user: req.user
    });
});

module.exports = router;