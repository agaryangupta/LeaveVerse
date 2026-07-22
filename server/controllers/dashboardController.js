const User = require("../models/User");
const Leave = require("../models/Leave");

// Admin Dashboard
const getAdminDashboard = async (req, res) => {
  try {

    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const totalManagers = await User.countDocuments({
      role: "manager",
    });

    const managers = await User.find({
      role: "manager",
    });

    const managerIds = managers.map(manager => manager._id);

    const pendingLeaves = await Leave.countDocuments({
      employee: { $in: managerIds },
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      employee: { $in: managerIds },
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      employee: { $in: managerIds },
      status: "Rejected",
    });

    res.status(200).json({
      totalEmployees,
      totalManagers,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Manager Dashboard
const getManagerDashboard = async (req, res) => {
  try {

    // Find all employees reporting to this manager
    const teamEmployees = await User.find({
      role: "employee",
      reportingManager: req.user.id,
    });

    const employeeIds = teamEmployees.map(emp => emp._id);

    const teamSize = teamEmployees.length;

    const pendingLeaves = await Leave.countDocuments({
      employee: { $in: employeeIds },
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      employee: { $in: employeeIds },
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      employee: { $in: employeeIds },
      status: "Rejected",
    });

    res.status(200).json({
      teamSize,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Employee Dashboard
const getEmployeeDashboard = async (req, res) => {
  try {

    const employee = await User.findById(req.user.id);

    const totalApplied = await Leave.countDocuments({
      employee: req.user.id,
    });

    const approved = await Leave.countDocuments({
      employee: req.user.id,
      status: "Approved",
    });

    const pending = await Leave.countDocuments({
      employee: req.user.id,
      status: "Pending",
    });

    const rejected = await Leave.countDocuments({
      employee: req.user.id,
      status: "Rejected",
    });

    res.status(200).json({
      leaveBalance: employee.leaveBalance,
      totalApplied,
      approved,
      pending,
      rejected,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAdminDashboard,
  getManagerDashboard,
  getEmployeeDashboard,
};