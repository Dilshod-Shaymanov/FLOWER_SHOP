const express = require('express');

const router = express.Router();

const flowerRoute = require("./flower")
const customerRoute = require("./customer")
const statusRoute = require("./status")
const orderRoute = require("./order")
const order_detailsRoute = require("./order_details")

router.use("/flowers", flowerRoute);
router.use("/customers", customerRoute);
router.use("/status", statusRoute);
router.use("/orders", orderRoute);
router.use("/order_details", order_detailsRoute);


module.exports = router;