const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const port = process.env.PORT|| 8080;

app.use(fileUpload);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));



app.get('/*', function (req, res) {
    console.log(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/get', (req, res) => {
  console.log(req);
  res.json({msg:'hello'});
  }
);


app.post('/upload', (req, res) => {
    console.log(req);
    let pdfFile = req.files.file;
  
    pdfFile.mv(`${__dirname}/upload/${req.body.filename}.jpg`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json({file: `public/${req.body.filename}.jpg`});
    });
  
  })

app.listen(port, () => console.log(`wat_transcript started on ${port}!`))