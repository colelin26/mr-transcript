const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const scraper = require('./server/scrape/transcriptScraper');
const utils = require('./server/utils/utils');
const UWAPI = require('./server/utils/UWAPI');

const demoPath = './upload/cole.pdf';

const app = express();
const port = process.env.PORT || 8080;

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.post('/upload', async (req, res) => {
  const pdfFile = req.files.transcript;
  const fileName = utils.generateFilename(pdfFile.name, pdfFile.mimetype);
  const pdfPath = `${__dirname}/upload/${fileName}`;
  await pdfFile.mv(pdfPath, async err => {
    if (err) {
      return res.status(500).send(err);
    }
    const pdfJSON = await scraper.scrapePDF(pdfPath);
    fs.unlinkSync(pdfPath);
    return res.json(pdfJSON);
  });
});

app.get('/getDemo', async (req, res) => {
  const pdfJSON = await scraper.scrapePDF(demoPath);
  return res.json(pdfJSON);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`WATranscript started on ${port}!`));
