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

    res.append("Content-Security-Policy", "script-src 'nonce-8IBTHwOdqNKAWeKl7plt8g=='");
    res.status(200);
    res.sendFile(root + "\\nonce.html", options);
});

app.use(express.static('/'))
app.listen(3000, () => {
    console.log('Server started on port 3000');
});