const express = require("express");

const { getStatus, addStatus, getStatusById,deleteStatusById, updateStatusById } = require("../controllers/status");

const router = express.Router();

router.get("/", getStatus);
router.post("/:id", addStatus);
router.get("/:id", getStatusById)
router.delete("/:id", deleteStatusById);
router.put("/:id", updateStatusById)

module.exports = router;