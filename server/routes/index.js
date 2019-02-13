var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("123")
});
/* 登录接口 */
router.post('/login', function(req, res, next) {
  console.log("req", req.body);
  res.send("123")
});

module.exports = router;
