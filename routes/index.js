var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '/../CAUtion-Web-Front-End/public/index.html'));

  res.send("CAUtion Web Page");
});

module.exports = router;
