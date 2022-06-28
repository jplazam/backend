const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const authConfig = require("../../../config/auth");

const models = require("../../../models");
const Tag = models.Tag;

router.get("/", (req, res) => {
  const tags = Tag.findAll().then((tags) => {
    res.status(200).send(tags);
  });
});

module.exports = router;
