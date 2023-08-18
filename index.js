const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const uploadFile_cb = async(req, res, next) => {
  const { originalname, mimetype, size } = req.file
  return res.json({
    name: originalname,
    type: mimetype,
    size: size
  })
}
app.post('/api/fileanalyse', upload.single('upfile'), asyncHandler(uploadFile_cb))

const notFound_cb = async(req, res, next) => {
  res.status(404),
  res.type('txt').send('Not found')
}

app.use(asyncHandler(notFound_cb))

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
