const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();
/*
const options = {
    key: fs.readFileSync('../certificate/server.key'),
    cert: fs.readFileSync('../certificate/server.crt')
};

http.createServer(options, app)
    .listen(4000, () => console.log(`Server started on port ${4000}!`));
*/

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/index', (req, res) => {
    const options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        }
    }
    const root = __dirname;

    res.status(200);
    res.sendFile(root + "\\p2p-calling.html", options);
});


app.listen(4000, () => {
    console.log('express server listened in 4000');
});