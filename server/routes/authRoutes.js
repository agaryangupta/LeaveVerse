const express = require("express");
const router = express.Router();

const {
  createUser,
  assignManager,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
  getEmployees,
  getDepartmentEmployees,
  getManagers,
} = require("../controllers/authController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Admin creates Employee/Manager
router.post(
  "/create-user",
  protect,
  authorizeRoles("admin"),
  createUser
);

router.put(
  "/assign-manager",
  protect,
  authorizeRoles("admin"),
  assignManager
);

// Get All Employees
router.get(
  "/employees",
  protect,
  authorizeRoles("admin"),
  getEmployees
);

// Get Employees of Logged-in Manager's Department
router.get(
  "/department-employees",
  protect,
  authorizeRoles("manager"),
  getDepartmentEmployees
);

// Get All Managers
router.get(
  "/managers",
  protect,
  authorizeRoles("admin"),
  getManagers
);

// Login
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.put("/change-password", protect, changePassword);

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

module.exports = router;