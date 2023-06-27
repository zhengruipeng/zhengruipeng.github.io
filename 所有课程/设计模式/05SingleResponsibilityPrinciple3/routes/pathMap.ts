import {createRequire} from 'module';
// @ts-ignore
const require = createRequire(import.meta.url);
const multer = require('multer');
// 使用 require 导入模块
// const myModule = require('./myModule');
const express = require('express');
const bodyParser = require('body-parser');
import {UserDao} from "./UserDao.js"

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(upload.array());
app.get('/', function (req, res) {
    res.render('index', {title: 'use-case'});
});
app.post('/UserDao', (req, res) => {
    const {username, password} = req.body;
    let user: UserDao = new UserDao();
    console.log(username, password, JSON.stringify(req.body));
    let r: boolean = user.findUser(username, password);
    if (r) {
        res.status(200).json("OK");
    } else {
        res.status(200).json("NO");
    }

});

app.use(express.static('../public'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});