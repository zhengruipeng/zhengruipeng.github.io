import {createRequire} from 'module';
// @ts-ignore
const require = createRequire(import.meta.url);
// const multer = require('multer');
// @ts-ignore
import multer from "multer"
// @ts-ignore
import express from "express"
// @ts-ignore
import bodyParser from "body-parser"
// const bodyParser = require('body-parser');
import {UserDao} from "./UserDao.js"
import { fileURLToPath } from 'url';
// @ts-ignore
import path from 'path';
// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(upload.array());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/use-case.html');
});
app.post('/UserDao', (req, res) => {
    const {username, password} = req.body;
    let user: UserDao = new UserDao();
    console.log(username, password, JSON.stringify(req.body));
    let r: boolean = user.findUser(username, password);
    if (r) {
        res.status(200).send("OK");
    } else {
        res.status(200).send("NO");
    }

});

app.use(express.static('./public'));

console.log(__dirname)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});