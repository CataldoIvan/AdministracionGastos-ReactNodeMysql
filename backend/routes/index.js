const express = require("express");
const {
  getAll,
  getForId,
  createMov,
  deleteMov,
  editMov,
  getBalance
} = require("../controllers/MovementControllers");

const router = express.Router();

//obtain all datas
router.get("/", getAll);

//obtain balance
router.get("/balance", getBalance);

//obtain one
router.get("/:id", getForId);

//delete movement
router.delete("/:id", deleteMov);

//insert new movement
router.post("/", createMov);

//edit movement
router.put("/edit/:id", editMov);


module.exports = router;
