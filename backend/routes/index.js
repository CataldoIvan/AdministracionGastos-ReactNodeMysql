const express = require("express");
const {
  getAll,
  getForId,
  createMov,
  deleteMov,
} = require("../controllers/MovementControllers");

const router = express.Router();

//obtain all datas
router.get("/", getAll);

//obtain one
router.get("/:id", getForId);

//delete movement
router.delete("/:id", deleteMov);



//insert new movement
router.post("/", createMov);


module.exports = router;
