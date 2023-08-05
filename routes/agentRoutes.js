const express = require("express");
const {
  getAgentInfoController,
  updateProfileController,
  getAgentByIdController,
  agentAppointmentsController,
  updateStatusController,


} = require("../controllers/agentCtrl");
const authMiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

//POST SINGLE Agent INFO
router.post("/getAgentInfo", authMiddleware, getAgentInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);
//POST  GET SINGLE Agent INFO
router.post("/getAgentById", authMiddleware, getAgentByIdController);

//GET Appointments
router.get(
  "/agent-appointments",
  authMiddleware,
  agentAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;