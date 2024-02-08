const express = require("express");
let router = express.Router();
router.get("/", function (req, res) {
    res.status(200).render("test");
});
router.get("/static", function (req, res) {
    let root = __dirname.substring(0, __dirname.lastIndexOf("\\"));
    console.log(root + "\\public\\index.html");
    res.status(200).sendFile(root + "\\public\\index.html");
});
module.exports = router;
