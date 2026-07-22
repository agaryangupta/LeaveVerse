const express = require("express");

const router = express.Router();

const {
  getAdminDashboard,
  getManagerDashboard,
  getEmployeeDashboard,
} = require("../controllers/dashboardController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  getAdminDashboard
);

router.get(
  "/manager",
  protect,
  authorizeRoles("manager"),
  getManagerDashboard
);

router.get(
  "/employee",
  protect,
  authorizeRoles("employee"),
  getEmployeeDashboard
);

module.exports = router;