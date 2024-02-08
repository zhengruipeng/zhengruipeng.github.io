const express = require('express');
const bodyParser = require('body-parser');
// const { authenticateUser } = require('./database');
import { UserDao } from "./UserDao.js";
const app = express();
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    /*authenticateUser(username, password, (err, success) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
        } else if (success) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Login failed!' });
        }
    });*/
    let user = new UserDao();
    let r = user.findUser(username, password);
    if (r) {
        res.status(200).text("OK");
    }
    else {
        res.status(401).text("NO");
    }
});
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
