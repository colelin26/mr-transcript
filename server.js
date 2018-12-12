const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const port = process.env.PORT|| 8080;
const scraper = require('./server/scrape/transcriptScraper');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.post('/upload', async (req, res) => {
    let pdfFile = req.files.transcript;
    const pdfPath = `${__dirname}/upload/${pdfFile.name}`;
    await pdfFile.mv(pdfPath, async function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    let pdfJSON = await scraper.scrape_transcript(pdfPath);
    console.log(pdfJSON);
    res.json(pdfJSON);
    });
  });

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`WATranscript started on ${port}!`))