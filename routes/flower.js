const express = require('express');
const { getFlowers, addFlower, getFlowerById, deleteFlowerById, updateFlowerById, findFlowerByName, findFlowerByNameBody, findFlowerByNameQuery, findFlowerByData, findFlowerByCustomer } = require('../controllers/flower');

const router = express.Router();

router.get("/findbycustomer", findFlowerByCustomer)
router.get("/", getFlowers)
router.get("/findany", findFlowerByData)
router.get("/find", findFlowerByNameBody)
router.get("/findquery", findFlowerByNameQuery)
router.get("/:id", getFlowerById)
router.post("/", addFlower)
router.delete("/:id", deleteFlowerById)
router.put("/:id", updateFlowerById)
router.get("/find/:name", findFlowerByName)

module.exports = router;