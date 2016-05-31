var express = require('express');
var router = express.Router();

var Photo = require('../app/controllers/photo'),
    User = require('../app/controllers/user'),
    Tag = require('../app/controllers/tag');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/captcha', User.captcha);
router.post('/user/register', User.register);
router.post('/user/login', User.sign);
router.post('/user/logout', User.logout);

router.get('/photo/list',Photo.list);
router.post('/photo/save',User.adminRequired, Photo.save);

router.get('/tag/list', Tag.list);
router.post('/tag/add', User.signinRequired, User.adminRequired, Tag.add);


module.exports = router;
