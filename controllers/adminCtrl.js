// adminctrl_travelAgent.js

const agentModel=require("../models/agentModel")
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllAgentsController = async (req, res) => {
  try {
    const Agents = await agentModel.find({});
    res.status(200).send({
      success: true,
      message: "Travel Agents Data list",
      data: Agents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting travel agents data",
      error,
    });
  }
};

// travel agent account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { agentId, status } = req.body;
    const agent = await agentModel.findByIdAndUpdate(agentId, { status });
    const user = await userModel.findOne({ _id: agent.userId });
    const notification = user.notification;
    notification.push({
      type: "Agent-account-request-updated",
      message: `Your Agent Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isAgent = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};
module.exports = {
  getAllAgentsController,
  getAllUsersController,
  changeAccountStatusController,
};
