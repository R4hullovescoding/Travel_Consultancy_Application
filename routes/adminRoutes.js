const express = require("express");
const {
  getAllUsersController,
  getAllAgentsController,changeAccountStatusController
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || agents
router.get("/getAllAgents", authMiddleware, getAllAgentsController);
//Post Account Status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);


module.exports = router;