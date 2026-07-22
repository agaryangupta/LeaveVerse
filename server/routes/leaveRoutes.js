const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getTeamLeaves,
  getManagerLeaves,
  updateLeaveStatus,
  updateManagerLeaveStatus,
} = require("../controllers/leaveController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Apply Leave
router.post(
  "/apply",
  protect,
  authorizeRoles("employee", "manager"),
  applyLeave
);

// Get Logged-in Employee's Leaves
router.get(
  "/my-leaves",
  protect,
  authorizeRoles("employee", "manager"),
  getMyLeaves
);

// Manager's Team
router.get(
  "/team-leaves",
  protect,
  authorizeRoles("manager"),
  getTeamLeaves
);

router.get(
  "/manager-leaves",
  protect,
  authorizeRoles("admin"),
  getManagerLeaves
);

router.put(
    "/manager-leaves/:id",
    protect,
    authorizeRoles("admin"),
    updateManagerLeaveStatus
);

router.put(
  "/:leaveId/status",
  protect,
  authorizeRoles("manager"),
  updateLeaveStatus
);

module.exports = router;