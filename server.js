'use strict';

const express = require('express');
const app = express();
const multer  = require('multer')
const port = process.env.PORT;
const upload = multer();

app.use('/public', express.static(process.cwd() + '/public'));

// serves static file by default containing instructions to use this microservice
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  })

// retries file size of submitted file, file is not saved
app.post('/get-file-size/', upload.single('file'), function (req, res, next) {
  var filesize = {
    size: req.file.size
  };
  res.json(filesize);
})

// respond not found for all invalid routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// error handling for middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});

