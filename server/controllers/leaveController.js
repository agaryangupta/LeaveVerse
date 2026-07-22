const Leave = require("../models/Leave");
const User = require("../models/User");
const mongoose = require("mongoose");

const sendEmail = require("../services/emailService");
const leaveRequestEmail = require("../templates/leaveRequestEmail");
const leaveApprovedEmail = require("../templates/leaveApprovedEmail");
const leaveRejectedEmail = require("../templates/leaveRejectedEmail");


// Calculate working days (excluding Saturdays & Sundays)
const calculateWorkingDays = (startDate, endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    let workingDays = 0;

    for (
        let current = new Date(start);
        current <= end;
        current.setDate(current.getDate() + 1)
    ) {

        const day = current.getDay();

        // 0 = Sunday, 6 = Saturday
        if (day !== 0 && day !== 6) {
            workingDays++;
        }

    }

    return workingDays;

};

// Apply Leave
const applyLeave = async (req, res) => {
    try {

        const {
            leaveType,
            startDate,
            endDate,
            reason,
        } = req.body;

        const totalDays = calculateWorkingDays(
            startDate,
            endDate
        );

        if (totalDays === 0) {
            return res.status(400).json({
                message: "Selected dates contain only weekends. Please choose at least one working day.",
            });
        }

        const leave = await Leave.create({
            employee: req.user.id,
            leaveType,
            startDate,
            endDate,
            totalDays,
            reason,
        });

        // Get applicant details
        const applicant = await User.findById(req.user.id);

        // Employee applies -> Notify Manager
        if (applicant.role === "employee") {

            const manager = await User.findOne({
                role: "manager",
                department: applicant.department,
            });

            if (manager) {

                await sendEmail({
                    to: manager.email,
                    subject: "New Leave Request",
                    html: leaveRequestEmail({
                        recipientName: manager.fullName,
                        applicantName: applicant.fullName,
                        employeeId: applicant.employeeId,
                        department: applicant.department,
                        leaveType,
                        startDate,
                        endDate,
                        reason,
                    }),
                });

            }

        }

        // Manager applies -> Notify Admin
        else if (applicant.role === "manager") {

            const admin = await User.findOne({
                role: "admin",
            });

            if (admin) {

                await sendEmail({
                    to: admin.email,
                    subject: "New Leave Request",
                    html: leaveRequestEmail({
                        recipientName: admin.fullName,
                        applicantName: applicant.fullName,
                        employeeId: applicant.employeeId,
                        department: applicant.department,
                        leaveType,
                        startDate,
                        endDate,
                        reason,
                    }),
                });

            }

        }

        res.status(201).json({
            message: "Leave applied successfully.",
            leave,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

// Get My Leaves
const getMyLeaves = async (req, res) => {
    try {

        const leaves = await Leave.find({
            employee: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            totalLeaves: leaves.length,
            leaves,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

// Get Team Leaves (Manager)
const getTeamLeaves = async (req, res) => {
    try {

        const manager = await User.findById(req.user.id);

        if (!manager) {
            return res.status(404).json({
                message: "Manager not found.",
            });
        }

        const teamEmployees = await User.find({
            role: "employee",
            department: manager.department,
        });

        const employeeIds = teamEmployees.map(employee => employee._id);

        const leaves = await Leave.find({
            employee: { $in: employeeIds },
        }).populate(
            "employee",
            "fullName employeeId department"
        );

        res.status(200).json({
            leaves,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

const getManagerLeaves = async (req, res) => {
    try {

        const managers = await User.find({
            role: "manager",
        });

        const managerIds = managers.map(manager => manager._id);

        const leaves = await Leave.find({
            employee: { $in: managerIds },
        }).populate(
            "employee",
            "fullName employeeId department"
        );

        res.status(200).json({
            leaves,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

const updateLeaveStatus = async (req, res) => {
    try {

        const { leaveId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Approved or Rejected.",
            });
        }

        // Find leave with employee details
        const leave = await Leave.findById(leaveId).populate("employee");

        if (!leave) {
            return res.status(404).json({
                message: "Leave request not found.",
            });
        }

        if (leave.status !== "Pending") {
            return res.status(400).json({
                message: "This leave request has already been processed.",
            });
        }

        // Update status
        leave.status = status;

        // Reduce leave balance if approved
        if (status === "Approved") {

            leave.employee.leaveBalance -= leave.totalDays;
            await leave.employee.save();

        }

        await leave.save();

        // Send Email to Employee
        try {

            await sendEmail({
                to: leave.employee.email,
                subject: `Leave ${status}`,
                html:
                    status === "Approved"
                        ? leaveApprovedEmail({
                            employeeName: leave.employee.fullName,
                            approverName: req.user.fullName,
                            leaveType: leave.leaveType,
                            startDate: leave.startDate,
                            endDate: leave.endDate,
                        })
                        : leaveRejectedEmail({
                            employeeName: leave.employee.fullName,
                            approverName: req.user.fullName,
                            leaveType: leave.leaveType,
                            startDate: leave.startDate,
                            endDate: leave.endDate,
                        }),
            });

        } catch (emailError) {

            console.error("Employee email error:", emailError);

        }

        res.status(200).json({
            message: `Leave ${status.toLowerCase()} successfully.`,
            leave,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

const updateManagerLeaveStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        const leave = await Leave.findById(id).populate("employee");

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        if (leave.status !== "Pending") {
            return res.status(400).json({
                message: "This leave request has already been processed.",
            });
        }

        leave.status = status;

        if (status === "Approved") {

            leave.employee.leaveBalance -= leave.totalDays;
            await leave.employee.save();

        }

        await leave.save();

        // Send Email to Manager
        try {

            await sendEmail({
                to: leave.employee.email,
                subject: `Leave ${status}`,
                html:
                    status === "Approved"
                        ? leaveApprovedEmail({
                            employeeName: leave.employee.fullName,
                            approverName: req.user.fullName,
                            leaveType: leave.leaveType,
                            startDate: leave.startDate,
                            endDate: leave.endDate,
                        })
                        : leaveRejectedEmail({
                            employeeName: leave.employee.fullName,
                            approverName: req.user.fullName,
                            leaveType: leave.leaveType,
                            startDate: leave.startDate,
                            endDate: leave.endDate,
                        }),
            });

        } catch (emailError) {

            console.error("Manager email error:", emailError);

        }

        res.status(200).json({
            message: `Manager leave ${status.toLowerCase()} successfully.`,
            leave,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    applyLeave,
    getMyLeaves,
    getTeamLeaves,
    getManagerLeaves,
    updateLeaveStatus,
    updateManagerLeaveStatus,
};