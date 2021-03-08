let tba = require('../model/tba');
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var body = req.query;

  var signature = tba.iterate_signature.from_base();
  signature = tba.digest1(signature);

  console.log("Signature:");
  console.log(signature);

  res.send(`Signature gotten: ${ signature }`);
});

router.post('/', async function(req, res) {
  var body = req.body;

  var signature = tba.iterate_signature.from_base();

  console.log("Signature:");
  console.log(signature);

  res.status(200).json(signature);
});

module.exports = router;
