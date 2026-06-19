const {Router}  = require("express");
const router = Router();
const aiController = require("../controllers/ai.controller.js");

router.post("/get-review", aiController.getReview);

module.exports = router;
