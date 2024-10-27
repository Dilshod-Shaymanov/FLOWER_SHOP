const express = require("express");
const { getOrder_details, addOrder_details, getOrder_detailsById, deleteOrder_detailsById, updateOrder_detailsById, addDeatils} = require("../controllers/order_details");

const router = express.Router();

router.post("/", addDeatils);
router.get("/", getOrder_details)
router.get("/:id", getOrder_detailsById)
router.post("/", addOrder_details)
router.delete("/:id", deleteOrder_detailsById)
router.put("/:id", updateOrder_detailsById)


module.exports = router;