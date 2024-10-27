const express = require('express');
const { getCustomers, addCustomer, getCustomerById, deleteCustomerById, updateCustomerById, getCustomerByBuyTime, findCustomerByData } = require('../controllers/customer')

const router = express.Router();

router.get("/findbydata", findCustomerByData)
router.get("/", getCustomers)
router.get("/bytime", getCustomerByBuyTime)
router.get("/:id", getCustomerById)
router.post("/", addCustomer)
router.delete("/:id", deleteCustomerById)
router.put("/:id", updateCustomerById)

module.exports = router;