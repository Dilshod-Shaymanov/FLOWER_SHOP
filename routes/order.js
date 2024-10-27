const express = require("express");
const { getOrders, addOrder, getOrdersById, deleteOrderById, updateOrderById } = require("../controllers/order")

const router = express.Router();

router.get("/", getOrders)
router.get("/:id", getOrdersById)
router.post("/", addOrder)
router.delete("/:id", deleteOrderById)
router.put("/:id", updateOrderById)

module.exports = router;