var express = require('express');
var router = express.Router();
var dry_layers = require('dry-layers');

router.get('/',function(req, res, next){
    res.render('videoUpload');
});

module.exports = router;
