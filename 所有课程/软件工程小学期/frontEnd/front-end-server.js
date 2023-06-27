const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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

app.use(express.static(__dirname))
app.listen(4000, () => {
    console.log('Server started on port 4000');
});