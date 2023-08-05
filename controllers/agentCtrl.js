const agentModel = require("../models/agentModel");
const appointmentModel = require("../models/appointmentModel");
const getAgentInfoController = async (req, res) => {
  try {
    const agent = await agentModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "agent data fetch success",
      data: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching agent Details",
    });
  }
};

const agentAppointmentsController = async (req, res) => {
  try {
    const agent = await agentModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      agentId: agent._id,
    });
    res.status(200).send({
      success: true,
      message: "Agent Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in agent Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};


// update agent profile
const updateProfileController = async (req, res) => {
  try {
    const agent = await agentModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Agent Profile Updated",
      data: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Agent Profile Update issue",
      error,
    });
  }
};


//get single agent
const getAgentByIdController = async (req, res) => {
  try {
    const agent = await agentModel.findOne({ _id: req.body.agentId });
    res.status(200).send({
      success: true,
      message: "Sigle agent Info Fetched",
      data: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single agent info",
    });
  }
};
module.exports = { getAgentInfoController, updateProfileController,getAgentByIdController ,updateStatusController,agentAppointmentsController}; 