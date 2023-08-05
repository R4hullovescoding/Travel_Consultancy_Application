const express=require('express')
const { loginController, ragisterControler, authController,
    applyAgentController,getAllNotificationController,deleteAllNotificationController, getAllAgentsController, bookingAvailabilityController, bookeAppointmnetController
   ,userAppointmentsController} = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authmiddleware');
const authmiddleware = require('../middlewares/authmiddleware');
//router object

const router=express.Router()
//routes
//LOGIN || POST
router.post("/login",loginController);

//Ragister || POST
router.post("/register",ragisterControler);

//Auth||POST
router.post("/getUserData",authMiddleware,authController);

router.post("/apply-agent",authMiddleware,applyAgentController);
//Notifiaction  agent || POST
//Notifiaction  agent|| POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  agent || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
//Get ALL Agents
//GET ALL agent
router.get("/getAllAgents", authMiddleware, getAllAgentsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);
//AppointmentList:
router.get('user-appointments',authmiddleware,userAppointmentsController)
module.exports=router;