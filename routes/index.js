var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require("path");

var storage = multer.diskStorage({
  destination: 'uploads',
  filename: function(req, file, cb) {
    cb(null, file.originalname+path.extname(file.originalname));
  },
});

var upload = multer({storage: storage,
  limits: {fileSize: 5*1000000,
    files:5},
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.jpg'  && ext !== '.jpeg') {
      return cb(new Error('file is not jpg'))
    }
    cb(null, true)
  }
}).array('avatar',5);

router.post('/data', function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        res.render('index', {message : err});
    } else if (err) {
      res.render('index', {message : err});
    }
    else  {
      res.render('index', {message : 'thanh cong'});
    }


  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message : '' });
});



module.exports = router;
