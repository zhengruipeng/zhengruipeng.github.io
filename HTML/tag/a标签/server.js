const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/download/image', (req, res) => {
    const options = {
        headers: {
            'Content-Disposition': "attachment; filename=\"server-push.jpg\"",
        }
    }

    res.status(200);
    res.sendFile(__dirname + "\\image/1.png", options);
});
app.get('/download/1234567890123456789012345678901234567890', (req, res) => {
    const options = {
        headers: {
            'Content-Disposition': "attachment",
        }
    }

    res.status(200);
    res.sendFile(__dirname + "\\image/1.png", options);
});
app.get('/download/image3', (req, res) => {
    const options = {
        headers: {
            'Content-Disposition': "attachment",
        }
    }
    res.status(200);
    res.sendFile(__dirname + "\\image/1.png", options);
});
app.get("/bing/redirect", (req, res) => {
    const question = req.query.q;
    res.redirect('http://www.bing.com/search?q=' + question);
});

app.post("ping/index", (req, res) => {
    console.log("ping/index");
    let body = req.body;
    console.log(body);
});

app.get("ping/index2", (req, res) => {
    let body = req.query;
    console.log(body);
});
app.listen(4000, () => {
    console.log('express server listened in 4000');
});