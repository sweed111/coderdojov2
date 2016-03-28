var dryLayers = require('dry-layers');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('eplayer');
});

module.exports = router;