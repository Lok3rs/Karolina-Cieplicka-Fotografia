const express = require("express"),
  router = express.Router({
    mergeParams: true
  }),
  Blog = require("../models/blog"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");

module.exports = router;
