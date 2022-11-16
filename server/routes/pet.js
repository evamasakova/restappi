const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet");

router.get("/", petController.getPets);
router.get("/:id", petController.getPet);
router.post("/", petController.postPet);
router.put("/:id", petController.putPet);
router.patch("/:id", petController.patchPet);
router.delete("/:id", petController.deletePet);

module.exports = router;