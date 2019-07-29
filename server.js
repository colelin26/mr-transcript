const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const scraper = require('./server/scrape/transcriptScraper');
const utils = require('./server/utils/utils');
const UWAPI = require('./server/utils/UWAPI');

const demoPath = './upload/cole.pdf';
const productionDemo = require('./server/test/cole.json');

const app = express();
const port = process.env.PORT || 8080;
const childProcess = require('child_process');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.post('/upload', async (req, res) => {
  const pdfFile = req.files.transcript;
  const fileName = utils.generateFilename(pdfFile.name, pdfFile.mimetype);
  const pdfPath = `${__dirname}/upload/${fileName}`;
  await pdfFile.mv(pdfPath, async err => {
    let pdfJSON;
    try {
      pdfJSON = await scraper.scrapePDF(pdfPath);
    } catch (err) {
      fs.unlinkSync(pdfPath);
      return res.status(500).send('The submitted PDF cannot be scraped.');
    }
    fs.unlinkSync(pdfPath);
    return res.json(pdfJSON);
  });
});

app.get('/getDemo', async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    const pdfJSON = await scraper.scrapePDF(demoPath);
    fs.writeFile('./server/test/cole.json', JSON.stringify(pdfJSON), function(err) {
      if (err) {
        console.log(err);
      }
    });
    return res.json(pdfJSON);
  } else {
    return res.json(productionDemo);
  }
});

app.get('/getCourseInfo', async (req, res) => {
  const { letter, number } = req.query;
  let info;
  try {
    info = await UWAPI.getCourseInfo(letter, number, process.env.API_KEY);
  } catch (err) {
    return res.status(500).send('There is no information about this course in UW API');
  }
  if (!info.title)
    return res.status(500).send('There is no information about this course in UW API');
  return res.json(info);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Mr. Transcript started on ${port}!`));

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;

  let process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function(err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function(code) {
    if (invoked) return;
    invoked = true;
    let err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}

// Now we can run a script and invoke a callback when complete, e.g.
// runScript('./server/utils/fetchCourses.js', function(err) {
//   if (err) throw err;
//   console.log('finished running some-script.js');
// });
