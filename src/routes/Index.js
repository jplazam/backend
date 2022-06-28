const express = require("express");
const router = express.Router();

const restaurants_routes = require("./api/v1/restaurants_routes");
const user_routes = require("./api/v1/user_routes");
const tag_routes = require("./api/v1/tag_routes");

router.use("/restaurants", restaurants_routes);
router.use("/tags", tag_routes);
router.use("/", user_routes);

module.exports = router;
