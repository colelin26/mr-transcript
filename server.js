const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.static(path.join(__dirname, 'build')));



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`wat_transcript started on ${port}!`))